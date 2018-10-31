if (BABYLON.Engine.isSupported()) {
    var canvas = document.querySelector("#renderCanvas");
    var engine = new BABYLON.Engine(canvas, false, {}, false);
   // engine._fps = 120;
    engine.disableManifestCheck = true;

    var genCombination = new GenerateWinCombination(5,3,12);
    var endScaling = false;
    var dropInChest = false;
    var mapLineWin = new Map();
    var autoPlay = false;
    var showRoundScore = true;

    var createScene = function () {

        var loadingScreen = new CustomLoadingScreen("textures/babylonjs.mp4");
        engine.loadingScreen = loadingScreen;

        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0.3,0.3,0.4, 0.75);
        scene.shadowsEnabled = true;
     /*   scene.debugLayer.show({
            popup:true,
            initialTab : 2,
            parentElement:document.getElementById('#mydiv'),
            newColors: {
                backgroundColor: '#eee',
                backgroundColorLighter: '#fff',
                backgroundColorLighter2: '#fff',
                backgroundColorLighter3: '#fff',
                color: '#333',
                colorTop:'red',
                colorBottom:'blue'
            }
        });*/

        var texturesJewel = [];
        var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
        var hdrTexture1 = new BABYLON.HDRCubeTexture("textures/mutianyu_4k.hdr", scene, 512, false, false) ;
        var skyBox = scene.createDefaultSkybox(hdrTexture1, true, 1000);
        hdrTexture1.rotationY = skyBox.rotation.y = -0.1;

        texturesJewel.push(hdrTexture.clone());
        var microSurfaceTexture = new BABYLON.Texture("textures/noise.png", scene);
        texturesJewel.push(microSurfaceTexture.clone());

        var baseColorTextureStart = new BABYLON.Texture("models/button/start/button_baseColor.png", scene);
        baseColorTextureStart.uScale = 1;
        baseColorTextureStart.vScale = -1;
        var normalTextureStart = new BABYLON.Texture("models/button/start/button_normal.png", scene);
        normalTextureStart.uScale = 1;
        normalTextureStart.vScale = -1;
        var baseColorTextureStop = new BABYLON.Texture("models/button/stop/button_baseColor.png", scene);
        baseColorTextureStop.uScale = 1;
        baseColorTextureStop.vScale = -1;
        var normalTextureStop = new BABYLON.Texture("models/button/stop/button_normal.png", scene);
        normalTextureStop.uScale = 1;
        normalTextureStop.vScale = -1;
        // var textureNumber = new BABYLON.Texture("textures/numbers/numbers.png", scene);
        var credit = new TextLabel( new BABYLON.Vector3(15, -15, 3), scene);
        var roundScore = new TextLabel( new BABYLON.Vector3(-15, -15, 3), scene);

        var plastic = new BABYLON.PBRMaterial("plastic", scene);
        plastic.reflectionTexture = hdrTexture;
        plastic.microSurface = 1.2;
        plastic.albedoColor = new BABYLON.Color3(0.9, 1.0, 0.9);
        plastic.microSurface = 0.8;
        plastic.reflectivityColor = new BABYLON.Color3(0.03, 0.03, 0.03);

        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 5, 40), scene);
        camera.setTarget(new BABYLON.Vector3(0, -3.5, 0));
        // camera.attachControl(canvas, false);

        camera.lowerRadiusLimit = 35;
        camera.upperRadiusLimit = 50;

        //  camera.lowerAlphalimit = 1;
        //  camera.upperAlphaLimit = 1;

        camera.lowerBetaLimit = 0;
        camera.upperBetaLimit = 1.5;
        engine.displayLoadingUI();

        var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
        light.position = new BABYLON.Vector3(20, 60, -20);
        light.intensity = 2.0;

        var shadowGenerator = new BABYLON.ShadowGenerator(512, light);
    /*    shadowGenerator.bias = 0.001;
        shadowGenerator.normalBias = 0.02;
        light.shadowMaxZ = 100;
        light.shadowMinZ = 10;
        shadowGenerator.useContactHardeningShadow = true;
        shadowGenerator.contactHardeningLightSizeUVRatio = 0.05;
        shadowGenerator.setDarkness(0.5);*/
        shadowGenerator.useExponentialShadowMap = true;
        shadowGenerator.useBlurExponentialShadowMap = true;
        // shadowGenerator.useKernelBlur = true;
        // shadowGenerator.blurKernel = 16;
/////////////////////// postprocessing
        // Create default pipeline
        var defaultPipeline = new BABYLON.DefaultRenderingPipeline("default", true, scene, [camera]);
        defaultPipeline.brightThreshold = 0.8;
        // var curve = new BABYLON.ColorCurves();
        // curve.globalHue = 200;
        // curve.globalDensity = 80;
        // curve.globalSaturation = 80;
        // curve.highlightsHue = 20;
        // curve.highlightsDensity = 80;
        // curve.highlightsSaturation = -80;
        // curve.shadowsHue = 2;
        // curve.shadowsDensity = 80;
        // curve.shadowsSaturation = 40;
        // defaultPipeline.imageProcessing.colorCurves = curve;
        // defaultPipeline.depthOfField.focalLength = 150;
        //
        defaultPipeline.samples = 4;
        defaultPipeline.fxaaEnabled = true;
        defaultPipeline.imageProcessing.contrast = 0.8;
        defaultPipeline.imageProcessing.exposure = 0.5;
        //
        defaultPipeline.bloomEnabled = true;
        defaultPipeline.bloomKernel = 200;
        defaultPipeline.bloomWeight = 0.2;
        defaultPipeline.bloomThreshold = 0.1;
        defaultPipeline.bloomScale = 0.1;
        //
        // defaultPipeline.depthOfFieldEnabled = true;
        // defaultPipeline.depthOfFieldDistance = 100;
        //
        // defaultPipeline.sharpenEnabled = true;
        // defaultPipeline.sharpen.edgeAmount = 0.1;
        // defaultPipeline.sharpen.colorAmount = 1.0;

        // defaultPipeline.grainEnabled = true;
        // defaultPipeline.grain.intensity = 5;
        // defaultPipeline.grain.animated = true;
////////////////////////////////////////////////////
        var manager = new BABYLON.GUI.GUI3DManager(scene);
        function startRoundGame() {
            mapLineWin.clear();
            genCombination.generate();

            var arr = genCombination.arrayCombination;

            if (
                genCombination.moveArray[0][4][1] === 1 &&
                genCombination.moveArray[1][4][0] === 1 &&
                genCombination.moveArray[2][4][2] === 1
            ) {
                endScaling = true;
            } else {
                for (var i = 0; i < genCombination.numWinSymbline.length; i++) {
                    if (genCombination.numWinSymbline[i] === 1) {
                        for (var j = 0; j < genCombination.moveArray[i].length; j++) {
                            for (var h = 0; h < genCombination.moveArray[i][j].length; h++) {
                                var obj = scene.getMeshByName(j + "-" + h);

                                if (!obj.userData.inChest) {
                                    obj.userData.scalingDown = false;
                                    endScaling = false;
                                    dropInChest = false;
                                    if (genCombination.moveArray[i][j][h] === 1) {
                                        obj.userData.inChest = true;
                                        if (!mapLineWin.has(i)) {
                                            mapLineWin.set(i, {array: [obj], moveForward: true, moveBack: false});
                                        } else {
                                            var mapObjs = mapLineWin.get(i);
                                            mapObjs.array = [...mapObjs.array, obj];
                                            mapLineWin.set(i, mapObjs);
                                        }
                                    } else {
                                        obj.userData.scalingDown = true;
                                    }
                                    var indexColorChanel = arr[j][h] + 1;
                                    var colorJewel = new BABYLON.Color3(0, 0, 0);
                                    if (indexColorChanel === 1) {
                                        colorJewel.r = 2.0;
                                    } else if (indexColorChanel === 2) {
                                        colorJewel.g = 2.0;
                                    } else if (indexColorChanel === 3) {
                                        colorJewel.b = 2.0;
                                    }

                                    obj.userData.visibleSymbol = arr[j][h];
                                    obj._children[arr[j][h]].material.albedoColor = colorJewel;
                                    obj._children.map(v => {
                                        v.visibility = false;
                                        v.scaling = new BABYLON.Vector3(1, 1, 1)
                                    });
                                    obj._children[arr[j][h]].visibility = true;
                                } else {
                                    if (genCombination.moveArray[i][j][h] === 1) {
                                        if (!mapLineWin.has(i)) {
                                            mapLineWin.set(i, {array: [obj], moveForward: true, moveBack: false});
                                        } else {
                                            var mapObjs = mapLineWin.get(i);
                                            mapObjs.array = [...mapObjs.array, obj];
                                            mapLineWin.set(i, mapObjs);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
////////////////////////////////////////////////////
        var countRow = 3;
        var countColl = 5;
        var distanceBetweenSymbolRow = 6;
        var distanceBetweenSymbolColl = 6;
        var halfLengthRow = (distanceBetweenSymbolRow * (countColl-1)) / 2;
        var halfLengthColl = (distanceBetweenSymbolColl * (countRow-1)) / 2;

        BABYLON.SceneLoader.ImportMesh("", "models/1/", "chest.gltf", scene, function (newMeshes, ps1s, skeletons) {

            newMeshes[0].name = "chest";
            newMeshes[0].position.y = -10.648;
            newMeshes[0].position.z = -20.144;
            newMeshes[0].scaling = new BABYLON.Vector3(8, 8, 8);

            newMeshes.map(v => {
              //  shadowGenerator.addShadowCaster(v);
                v.receiveShadows = true;
                // console.log(v.name);
            });

            var optionStartButton = {
                position: new BABYLON.Vector3(0, 8 * (-0.815) - 10.648, 8 * (2.652) - 20.144),
                rotation: new BABYLON.Vector3(-0.45378560552, 0, 0),
                deltaPush: 0.1,
                nameObject: "button"
            };
            newMeshes[8].scaling = new BABYLON.Vector3(8, 8, 8);
           var startButton = MakeButton("startButton", newMeshes[8], new BABYLON.Vector3(0, 0, -0.1), optionStartButton, manager);

            startButton.onPointerUpObservable.add(function () {
                endScaling = false;
                genCombination.gettingWinnings();
                roundScore.zeroing();
                genCombination.placeBet();
                credit.setTextForAnimation(genCombination.totalScore);
                startRoundGame();
                showRoundScore = true;
            });

            var optionAutoPlayButton = {
                position: new BABYLON.Vector3(8 * (-0.754), 8 * (-0.709) - 10.648, 8 * (2.546) - 20.144),
                rotation: new BABYLON.Vector3(-0.401425728, 0.41887902, -0.174532925),
                deltaPush: 0.05,
                nameObject: "buttonUp"
            };
            newMeshes[10].scaling = new BABYLON.Vector3(8, 8, 8);
            var buttonUp = newMeshes[10].clone();
            var autoPlayButton = MakeButton("autoPlayButton", newMeshes[10], new BABYLON.Vector3(0, 0.08, -0.05), optionAutoPlayButton, manager);

            var optionPlusBetButton = {
                position: new BABYLON.Vector3(8 * (-0.754), 8 * (-0.709) - 10.648, 8 * (2.546) - 20.144),
                rotation: new BABYLON.Vector3(-0.401425728, 0.41887902, -0.174532925),
                deltaPush: -0.05,
                nameObject: "buttonDown"
            };

            newMeshes[9].scaling = new BABYLON.Vector3(8, 8, 8);
            var buttonDown = newMeshes[9].clone();
            var plusBetButton = MakeButton("plusBetButton", newMeshes[9], new BABYLON.Vector3(0, -0.08, 0.05), optionPlusBetButton, manager);

            newMeshes[7].name = "rightLock";
            var leftLock = newMeshes[7].clone("leftLock");
          /*  var localOrigin = localAxes(2);
            localOrigin.parent = leftLock;*/
            leftLock.scaling = new BABYLON.Vector3(8, 8, 8);
            leftLock.parent = null;
            leftLock.setPivotMatrix(BABYLON.Matrix.Translation(-0.754, 2.546, -0.709 ));
            leftLock.rotate(BABYLON.Axis.X, -0.401425728, BABYLON.Space.WORLD);
            leftLock.rotate(BABYLON.Axis.Y, -0.41887902+Math.PI, BABYLON.Space.WORLD);
            leftLock.rotate(BABYLON.Axis.Z, 0, BABYLON.Space.WORLD);
            leftLock.position = new BABYLON.Vector3(5.5, -13.5, -0.2);
            leftLock.rotation = new BABYLON.Vector3(0.5, -0.4, 0.2);

            var optionMinusBetButton = {
                position: leftLock.position,
                rotation: new BABYLON.Vector3(-0.5, -0.55, 0.215),
                deltaPush: -0.05,
                nameObject: "buttonDown"
            };

            var minusBetButton = MakeButton("minusBetButton", buttonDown, new BABYLON.Vector3(0.059, -0.39, -0.08), optionMinusBetButton, manager);

            var optionMaxBetButton = {
                position: leftLock.position,
                rotation: new BABYLON.Vector3(-0.5, -0.55, 0.215),
                deltaPush: 0.05,
                nameObject: "buttonUp"
            };

            var maxBetButton = MakeButton("maxBetButton", buttonUp, new BABYLON.Vector3(-0.059, -0.22, 0.085), optionMaxBetButton, manager);

            BABYLON.SceneLoader.ImportMesh("", "models/", "diamond.gltf", scene, function (newMeshes) {
                for (var i = 0; i < countRow; i++) {
                    var y = distanceBetweenSymbolColl * i - halfLengthColl;

                    for (var j = 0; j < countColl; j++) {
                        var x = distanceBetweenSymbolRow * j - halfLengthRow;
                        var mesh = newMeshes[0].clone(j + "-" + i);
                        shadowGenerator.addShadowCaster(mesh);
                        var obj = CreateJewel.call(mesh, [], texturesJewel, new BABYLON.Vector3(-x, 50, 0), false);
                        DropJewel.call(obj, scene, startButton, new BABYLON.Vector3(-x, -y, 0));
                    }
                }
                newMeshes[0].dispose();
            });

            // Options (target 70fps (which is not possible) with a check every 500ms)
            var options = new BABYLON.SceneOptimizerOptions(30, 500);
            options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1));
            options.addCustomOptimization(function () {
                defaultPipeline.bloomEnabled = false;
                defaultPipeline.fxaaEnabled = false;
                defaultPipeline.sharpenEnabled = false;
                scene.shadowsEnabled = false;
                return true;
            }, function () {
                return "Pipeline off";
            });
            options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1.5));
            options.addCustomOptimization(function () {
                return true;
            }, function () {
                return "Turning ground off";
            });

            // Optimizer
            var optimizer = new BABYLON.SceneOptimizer(scene, options);

            // UI
            var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
            var panel = new BABYLON.GUI.StackPanel();
            panel.isVertical = false;
            panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            advancedTexture.addControl(panel);

           /* var addButton = function (text, callback) {
                var button = BABYLON.GUI.Button.CreateSimpleButton("button", text);
                button.width = "140px";
                button.height = "40px";
                button.color = "white";
                button.background = "green";
                button.paddingLeft = "10px";
                button.paddingRight = "10px";
                button.onPointerUpObservable.add(function () {
                    callback();
                });
                panel.addControl(button);
            }*/

            // Log
            var logPanel = new BABYLON.GUI.StackPanel();
            logPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            logPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            advancedTexture.addControl(logPanel);

            var logText = new BABYLON.GUI.TextBlock();
            logText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            logText.left = "5px";
            logText.top = "5px";
            logText.height = "15px";
            logText.color = "green";
            logText.fontSize = 12;
            logPanel.addControl(logText);

            // Buttons
          /*  addButton("Start", function () {
                optimizer.start();
                logText.text = "State: Running";
            });

            addButton("Reset", function () {
                optimizer.reset();
            });

            addButton("Stop", function () {
                optimizer.stop();
                logText.text = "State: Stopped";
            });*/

            scene.executeWhenReady(function () {
                optimizer.start();
                engine.hideLoadingUI();
                OpenChest.call(newMeshes[11], new BABYLON.Vector3(Math.PI*0.9,0,0), 20);
                credit.setTextForAnimation(genCombination.totalScore.toString());
            });
            // Wiring
            optimizer.onSuccessObservable.add(function () {
                logText.text = "State: Done";
            });
            optimizer.onNewOptimizationAppliedObservable.add(function (optim) {
                var currentPriorityText = new BABYLON.GUI.TextBlock();
                currentPriorityText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                currentPriorityText.height = "10px";
                currentPriorityText.left = "5px";
                currentPriorityText.color = "green";
                currentPriorityText.fontSize = 8;
                currentPriorityText.text = optim.getDescription();
                logPanel.addControl(currentPriorityText);
            });
            optimizer.onFailureObservable.add(function () {
                logText.text = "State: Failed. Frame rate was " + optimizer.currentFrameRate;
            });
///////////////////////////////////


        });
///////////////////////////////////
       // Lightning(scene);
///////////////////////////////////
        scene.registerBeforeRender(function () {
            if (mapLineWin.size && endScaling) {
                var indexLine = mapLineWin.entries().next().value[0];
                if (mapLineWin.has(indexLine)) {
                    var mapObjs = mapLineWin.get(indexLine);
                    if (mapObjs.moveForward) {
                        if (showRoundScore) {
                            showRoundScore = false;
                            var totalRound = genCombination.getTotalRound();
                            console.log(totalRound);
                            roundScore.setTextForAnimation(totalRound.toString());
                        }
                        mapObjs.array.map(v =>{
                            var animation = AnimationMoveForward.call(v, new BABYLON.Vector3(v.position.x, v.position.y, 5), 60);
                            animation.onAnimationEnd = function () {
                                animation.animationStarted = false;
                                v.userData.startDrop = false;
                                mapObjs.moveBack = true;
                            }
                        });
                        mapObjs.moveForward = false;
                    } else if (mapObjs.moveBack) {
                        mapLineWin.delete(indexLine);
                        if (mapLineWin.size) {
                            indexLine = mapLineWin.entries().next().value[0];
                        } else {
                            endScaling = false;
                            dropInChest = true;
                            roundScore.zeroing();
                            genCombination.gettingWinnings();
                            credit.setTextForAnimation(genCombination.totalScore);
                        }
                    }
                }
            }
            if (autoPlay) {
                startRoundGame();
            }
        });

        return scene;
    };

    var scene = createScene();

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
}