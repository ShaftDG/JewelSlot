if (BABYLON.Engine.isSupported()) {
    var canvas = document.querySelector("#renderCanvas");
    var engine = new BABYLON.Engine(canvas, false, {}, false);
   // engine._fps = 120;
    engine.disableManifestCheck = true;

    var genCombination = new GenerateWinCombination(5,3,12);

    var endScaling = false;
    var dropInChest = false;
    var allJewelsInChest = true;
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
        var hdrTexture1 = new BABYLON.HDRCubeTexture("textures/mutianyu_2k.hdr", scene, 512, false, false) ;
        scene.environmentTexture = hdrTexture1;
        var skyBox = scene.createDefaultSkybox(hdrTexture1, true, 1000, 0.005);
        hdrTexture1.rotationY = skyBox.rotation.y = -Math.PI*0.8;
        texturesJewel.push(hdrTexture.clone());
        var microSurfaceTexture = new BABYLON.Texture("textures/noise.png", scene);
        texturesJewel.push(microSurfaceTexture.clone());

        var credit = new TextLabel( new BABYLON.Vector3(0, 0, 0), scene, 60, {height:0.35, width: 0.4});
        var roundScore = new TextLabel( new BABYLON.Vector3(0, 0, 0), scene, 60, {height:0.36, width: 0.4});
        var bet = new TextLabel( new BABYLON.Vector3(0.7, 0, 0), scene, 300, {height:0.35, width: 0.4});
        var lines = new TextLabel( new BABYLON.Vector3(-1.25, 0, 0), scene, 300, {height:0.35, width: 0.4});

        var plastic = new BABYLON.PBRMaterial("plastic", scene);
        plastic.reflectionTexture = hdrTexture;
        plastic.microSurface = 1.2;
        plastic.albedoColor = new BABYLON.Color3(0.9, 1.0, 0.9);
        plastic.microSurface = 0.8;
        plastic.reflectivityColor = new BABYLON.Color3(0.03, 0.03, 0.03);

        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 0, new BABYLON.Vector3(0, 5, 41), scene);
        camera.setTarget(new BABYLON.Vector3(0, -2.5, 0));
        camera.attachControl(canvas, false);

        camera.lowerRadiusLimit = 35;
        camera.upperRadiusLimit = 50;

        //  camera.lowerAlphalimit = 1;
        //  camera.upperAlphaLimit = 1;

        camera.lowerBetaLimit = 0;
        camera.upperBetaLimit = 1.5;
        engine.displayLoadingUI();

        var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(1, -3, -5), scene);
        light.position = new BABYLON.Vector3(10, 30, 50);
        light.setDirectionToTarget(new BABYLON.Vector3(0, 2, 0));
        light.shadowMinZ = 1;
        light.shadowMaxZ = 160;
        light.intensity = 1.25;
        light.shadowEnabled = true;

        var lightSphere0 = BABYLON.Mesh.CreateSphere("Sphere0", 16, 0.5, scene);
        lightSphere0.position = light.position;

       // var HemisphericLight = new BABYLON.HemisphericLight("sun", new BABYLON.Vector3(-1, -2, -1), scene);

        var shadowGenerator = new BABYLON.ShadowGenerator(512, light);
        shadowGenerator.bias = 0.01;
        shadowGenerator.normalBias = 0.05;
        shadowGenerator.useBlurCloseExponentialShadowMap = true;
        shadowGenerator.useKernelBlur = true;
        shadowGenerator.blurScale = 1.0;
        shadowGenerator.blurKernel = 20.0;
/////////////////////// postprocessing
        // Create default pipeline
        var defaultPipeline = new BABYLON.DefaultRenderingPipeline("default", true, scene, [camera]);
        defaultPipeline.brightThreshold = 0.8;
        var curve = new BABYLON.ColorCurves();
        curve.globalHue = 200;
        curve.globalDensity = 80;
        curve.globalSaturation = 80;
        curve.highlightsHue = 100;
        curve.highlightsDensity = 80;
        curve.highlightsSaturation = -80;
        curve.shadowsHue = 2;
        curve.shadowsDensity = 80;
        curve.shadowsSaturation = 40;
        defaultPipeline.imageProcessing.colorCurves = curve;
        defaultPipeline.depthOfField.focalLength = 150;
        //
        defaultPipeline.samples = 4;
        defaultPipeline.fxaaEnabled = true;
        defaultPipeline.imageProcessing.contrast = 0.8;
        defaultPipeline.imageProcessing.exposure = 0.5;
        //
        defaultPipeline.bloomEnabled = true;
        defaultPipeline.bloomKernel = 100;
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
        var countRow = 3;
        var countColl = 5;
        function startRoundGame() {

            for (var i = 0; i < countRow; i++) {
                for (var j = 0; j < countColl; j++) {
                    var obj = scene.getMeshByName(j + "-" + i);
                    scene.stopAnimation(obj);
                    obj.position.y = 20;
                    obj.position.z = 0;
                    obj.rotate(BABYLON.Axis.Z, (Math.random() < 0.5 ? -1 : 1) * Math.PI, BABYLON.Space.WORLD);
                    obj.userData.rotateDestination = new BABYLON.Vector3(0, 0, (Math.random() < 0.5 ? -1 : 1) * 2 * Math.PI);
                    obj.userData.flagDestination = false;
                    obj.userData.flagStartTween = false;
                    obj.userData.startDrop = true;
                    obj.userData.inChest = false;
                }
            }

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
////////////////////////////////////////////////////
        var distanceBetweenSymbolRow = 6;
        var distanceBetweenSymbolColl = 6;
        var halfLengthRow = (distanceBetweenSymbolRow * (countColl-1)) / 2;
        var halfLengthColl = (distanceBetweenSymbolColl * (countRow-1)) / 2;

        var optionsWinLines = {
            maskWinLine: genCombination.maskWinLine,
            distanceBetweenSymbolRow: distanceBetweenSymbolRow,
            distanceBetweenSymbolColl: distanceBetweenSymbolColl,
            halfLengthRow: halfLengthRow,
            halfLengthColl: halfLengthColl,
            deltaBeginEnd: 7,
            z: -0.75
        };
        var winLines = WinLines(optionsWinLines, scene);

        BABYLON.SceneLoader.ImportMesh("", "models/lines/", "lines.gltf", scene, function (newMeshes) {

            newMeshes[1]._children.map(v => {
                    var mat = v.material.clone();
                    mat.reflectionTexture = hdrTexture;
                    mat.emissiveColor = new BABYLON.Color3(-1, -1, -1);
                    mat.emissiveIntensity = 0.0;
                    v.material = mat;
                 // console.log(v.name, v.material.emissiveTexture);
            });

            newMeshes[0].scaling = new BABYLON.Vector3(-4.5, 3.4, 5);
            newMeshes[0].name = "rightlines";
            newMeshes[0].position.x = -20;
            newMeshes[0].position.y = 7.68;
            newMeshes[0].position.z = -0.75;

            var leftLines = newMeshes[0].clone("leftLines");
            leftLines.position.x = -newMeshes[0].position.x;
            leftLines.position.y = newMeshes[0].position.y;
            leftLines.position.z = newMeshes[0].position.z;
        });

        BABYLON.SceneLoader.ImportMesh("", "models/credit/", "credit.gltf", scene, function (newMeshes) {
            newMeshes[0].name = "credit";
            newMeshes[0].scaling = new BABYLON.Vector3(-4.5, 4.5, 4.5);
            newMeshes[0].position.x = 22;
            newMeshes[0].position.y = -17.3;
            newMeshes[0].position.z = -1.1;
            newMeshes[0].rotation.y = -0.2;
            newMeshes[0].rotation.z = -0.0872664626;
            credit.anchor.parent = newMeshes[0];

            var rightBet = newMeshes[0].clone("rightBet");
            rightBet.scaling = new BABYLON.Vector3(4.5, 4.5, 4.5);
            rightBet.position.x = -22;
            rightBet.position.y = -17.5;
            rightBet.position.z = -0.8;
            rightBet.rotation.y = 0.2;
            rightBet.rotation.z = 0.0872664626;
            bet.anchor.parent = rightBet;
            bet.anchor.scaling = new BABYLON.Vector3(-1, 1, 1);
            lines.anchor.parent = rightBet;
            lines.anchor.scaling = new BABYLON.Vector3(-1, 1, 1);

            var partition = BABYLON.MeshBuilder.CreateBox("", {height: 0.8, width: 0.1, depth: 0.1, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
            partition.material = rightBet._children[0]._children[0].material;
            partition.position.x = 0.6;
            partition.parent = rightBet;

            var round = newMeshes[0].clone("round");
            round.scaling = new BABYLON.Vector3(7, 5, 5);
            round.position.x = 0;
            round.position.y = 15;
            round.position.z = -20;
            round.rotation.y = 0.2;
            round.rotation.z = 0.0872664626*1.25;
            roundScore.anchor.parent = round;
            roundScore.anchor.scaling = new BABYLON.Vector3(-5/7, 1, 1);
        });

        BABYLON.SceneLoader.ImportMesh("", "models/1/", "chest.gltf", scene, function (newMeshes, ps1s, skeletons) {

            newMeshes[0].name = "chest";
            newMeshes[0].position.y = -10.648;
            newMeshes[0].position.z = -29;
            newMeshes[0].scaling = new BABYLON.Vector3(-5, 5, 5);

            newMeshes[0]._children.map(v => {
                v.material.reflectionTexture = hdrTexture;
               /* shadowGenerator.addShadowCaster(v.getChildMeshes(false, (node) => { return node.name.indexOf("lock") !== -1 })[0]);
                shadowGenerator.addShadowCaster(v.getChildMeshes(false, (node) => { return node.name.indexOf("lockSecondLeft") !== -1 })[0]);
                shadowGenerator.addShadowCaster(v.getChildMeshes(false, (node) => { return node.name.indexOf("lockSecondRight") !== -1 })[0]);*/
                v.receiveShadows = true;
                shadowGenerator.addShadowCaster(v);
                // console.log(v.name);
            });

            newMeshes[11].receiveShadows = true;
            shadowGenerator.addShadowCaster(newMeshes[11]);

            var optionStartButton = {
                deltaPush: 0.1
            };

           var startButton = MakeButton("startButton", newMeshes[1], newMeshes[8], optionStartButton, manager);

            startButton.onPointerUpObservable.add(function () {
                endScaling = false;
                genCombination.gettingWinnings();
                roundScore.zeroing();
                genCombination.placeBet();
                credit.setTextForAnimation(genCombination.totalScore);
                startRoundGame();
                showRoundScore = true;
                winLines.map(v => {v.setEnabled(false)/*; v.renderingGroupId = 0;*/});
            });

            var optionSecondButton = {
                deltaPush: -0.05
            };

            var autoPlayButton = MakeButton("autoPlayButton", newMeshes[5], newMeshes[10], optionSecondButton, manager);
            autoPlayButton.onPointerUpObservable.add(function () {
                autoPlay = !autoPlay;
                if (autoPlay) {
                    autoPlayButton.mesh.material.emissiveColor = new BABYLON.Color3(0.5,0.25,0.125);
                    autoPlayButton.mesh.material.emissiveIntensity = 0.05;
                } else {
                    autoPlayButton.mesh.material.emissiveColor = new BABYLON.Color3(0.0,0.0,0.0);
                    autoPlayButton.mesh.material.emissiveIntensity = 0.0;
                }
            });

            var maxBetButton = MakeButton("maxBetButton", newMeshes[4], newMeshes[9], optionSecondButton, manager);
            maxBetButton.onPointerUpObservable.add(function () {
                genCombination.setMaxBet();
                bet.setTextForAnimation(genCombination.getTotalBet().toString());
                unEnableButton(plusBetButton);
                enableButton(minusBetButton);
            });
            var plusBetButton = MakeButton("plusBetButton ", newMeshes[3], newMeshes[10], optionSecondButton, manager);
            plusBetButton.onPointerUpObservable.add(function () {
                genCombination.toIncreaseBet();
                bet.setTextForAnimation(genCombination.getTotalBet().toString());
               /* genCombination.toIncreaseLines();
                lines.setTextForAnimation(genCombination.winLineNum.toString());*/
                enableButton(minusBetButton);
                if (genCombination.isMaxBet) {
                    unEnableButton(plusBetButton);
                }
            });
            var minusBetButton = MakeButton("minusBetButton", newMeshes[2], newMeshes[9], optionSecondButton, manager);
            unEnableButton(minusBetButton);
            minusBetButton.onPointerUpObservable.add(function () {
                genCombination.reduceBet();
                bet.setTextForAnimation(genCombination.getTotalBet().toString());
              /*  genCombination.reduceLines();
                lines.setTextForAnimation(genCombination.winLineNum.toString());*/
                enableButton(plusBetButton);
                if (genCombination.isMinBet) {
                    unEnableButton(minusBetButton);
                }
            });


            BABYLON.SceneLoader.ImportMesh("", "models/", "diamond.gltf", scene, function (newMeshes) {
                for (var i = 0; i < countRow; i++) {
                    var y = distanceBetweenSymbolColl * i - halfLengthColl;
                    for (var j = 0; j < countColl; j++) {
                        var x = distanceBetweenSymbolRow * j - halfLengthRow;
                        var mesh = newMeshes[0].clone(j + "-" + i);
                        shadowGenerator.addShadowCaster(mesh);
                        var obj = CreateJewel.call(mesh, [], texturesJewel, new BABYLON.Vector3(-x, 70, 0), false);
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
                OpenChest.call(newMeshes[11], new BABYLON.Vector3(0,-Math.PI*0.4,0), 15);
                credit.setTextForAnimation(genCombination.totalScore.toString());
                bet.setTextForAnimation(genCombination.getTotalBet().toString());
                lines.setTextForAnimation(genCombination.winLineNum.toString());
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
        function enableColorCheckLine(objCheckLine) {
            objCheckLine.material.emissiveColor = new BABYLON.Color3(1.0, 1.0, 1.0);
            objCheckLine.material.emissiveIntensity = 2.0;
        }
        function unEnableColorCheckLine(objCheckLine) {
            objCheckLine.material.emissiveColor = new BABYLON.Color3(-1, -1, -1);
            objCheckLine.material.emissiveIntensity = 0.0;
        }

        scene.registerBeforeRender(function () {
            if (mapLineWin.size && endScaling) {
                var indexLine = mapLineWin.entries().next().value[0];
                var objWineline =  winLines.filter((v, i) => i === indexLine)[0];
                var objCheckLine = scene.getMeshByName("lines_" + (indexLine+1));
                if (mapLineWin.has(indexLine)) {
                    var mapObjs = mapLineWin.get(indexLine);
                    if (mapObjs.moveForward) {
                        if (showRoundScore) {
                            showRoundScore = false;
                            var totalRound = genCombination.getTotalRound();
                            roundScore.setTextForAnimation(totalRound.toString());
                        }
                        objWineline.setEnabled(true);
                        enableColorCheckLine(objCheckLine);
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
                        unEnableColorCheckLine(objCheckLine);
                        objWineline.setEnabled(false);
                        if (mapLineWin.size) {
                            indexLine = mapLineWin.entries().next().value[0];
                        } else {
                            /*winLines.map((v, i) => {
                                genCombination.numWinSymbline[i] ? v.setEnabled(true) : v.setEnabled(false);
                                v.renderingGroupId = 1;
                            });*/
                            // winLines.map(v => {v.setEnabled(false)/*; v.renderingGroupId = 0;*/});
                            // setTimeout(() => {
                                endScaling = false;
                                dropInChest = true;
                                roundScore.zeroing();
                                genCombination.gettingWinnings();
                                credit.setTextForAnimation(genCombination.totalScore);
                            // }, 750);

                        }
                    }
                }
            }
        });
        scene.registerAfterRender(function () {
            if (autoPlay && allJewelsInChest) {
                allJewelsInChest = false;
                endScaling = false;
                genCombination.gettingWinnings();
                roundScore.zeroing();
                genCombination.placeBet();
                credit.setTextForAnimation(genCombination.totalScore);
                startRoundGame();
                showRoundScore = true;
            }
        });
        var gl = new BABYLON.GlowLayer("glow", scene, {
            mainTextureRatio: 0.5,
         //   mainTextureSamples: 1,
         //   mainTextureFixedSize: 512,
            blurKernelSize: 8
        });
        gl.intensity = 0.65;
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