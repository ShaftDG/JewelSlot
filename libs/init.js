if (BABYLON.Engine.isSupported()) {
    var canvas = document.querySelector("#renderCanvas");
    var engine = new BABYLON.Engine(canvas, true, { stencil: true }, false);
    engine.disableManifestCheck = true;

    var genCombination = new GenerateWinCombination(5,3,12);

    var endScaling = false;
    var endDrop = false;
    var dropInChest = false;
    var moveFreeSpin = false;
    var startAnimationCharacter = false;
    var numberPartMap = 0;
    var mapLineWin = new Map();
    var mapAllSymbol = new Map();
    var countSymbolWin = 0;
    var countSymbolScaling = 0;
    var arrayObjectsFreeSpin = [];
    var autoPlay = false;
    var showRoundScore = true;

    var createScene = function () {

        // detect available formats
        // var available = ['-astc.ktx', '-dxt.ktx', '-pvrtc.ktx', '-etc1.ktx', '-etc2.ktx'];
        // var formatUsed = engine.setTextureFormatToUse(available);

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

      /*  var skybox = BABYLON.MeshBuilder.CreateSphere("sphere2", {
            diameterX: 2000,
            diameterY: 2000,
            diameterZ: 2000,
            sideOrientation: BABYLON.Mesh.BACKSIDE
        }, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.Texture("textures/111.jpg", scene, true);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.FIXED_EQUIRECTANGULAR_MODE;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;*/

        var texturesJewel = [];
        var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
        var hdrTexture1 = new BABYLON.HDRCubeTexture("textures/mutianyu_1k.hdr", scene, 512, false, false) ;
        scene.environmentTexture = hdrTexture;
        // var skyBox = scene.createDefaultSkybox(hdrTexture1, true, 1000, 0.005);
        hdrTexture1.rotationY = /*skyBox.rotation.y =*/ -Math.PI*0.8;
        texturesJewel = [...texturesJewel, hdrTexture];
        var textureMapNoise = new BABYLON.Texture("textures/noiseCombustion.png", scene);
        texturesJewel = [...texturesJewel, textureMapNoise];
        var textureMapGradient = new BABYLON.Texture("textures/Fractal_fire.jpg", scene);
        texturesJewel = [...texturesJewel, textureMapGradient];
    /*    var emissiveTextureMap = new BABYLON.Texture("models/PirateTreasureMapScroll_emissive.jpg", scene);
        texturesJewel = [...texturesJewel, emissiveTextureMap];*/

        var credit = new TextLabel( new BABYLON.Vector3(0, 0, 0), scene, 60, {height:0.45, width: 0.5});
        var roundScore = new TextLabel( new BABYLON.Vector3(0, 0, 0), scene, 60, {height:0.46, width: 0.5});
        var nameSlot = BABYLON.MeshBuilder.CreatePlane("nameSlot", {height:0.8, width: 5, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        nameSlot.rotation.y = Math.PI;
        nameSlot.parent = roundScore.anchor;
        var materialNameSlot = new BABYLON.StandardMaterial("materialNameSlot", scene);
        materialNameSlot.diffuseTexture = new BABYLON.Texture("textures/roundplane/nameSlot.png", scene);
        materialNameSlot.diffuseTexture.hasAlpha = true;
        nameSlot.material = materialNameSlot;

        var bet = new TextLabel( new BABYLON.Vector3(-0.7, 0, 0), scene, 300, {height:0.45, width: 0.5});
        var lines = new TextLabel( new BABYLON.Vector3(1.2, 0, 0), scene, 300, {height:0.45, width: 0.5});

        var freeSpin = new TextLabel( new BABYLON.Vector3(-23, 0, 0), scene, 300, {height:0.45*8, width: 0.5*8});
        freeSpin.setOnOff(false);
// spider web
        var brightness = new BABYLON.Vector3(0.75,0.75,0.75);
        var planeSpiderWeb = BABYLON.MeshBuilder.CreatePlane("planeSpiderWeb", {height:0.75, width: 1.0/*, sideOrientation: BABYLON.Mesh.DOUBLESIDE*/}, scene);
        planeSpiderWeb.rotation.y = Math.PI / 2;
        planeSpiderWeb.rotation.x = 0.05;
        planeSpiderWeb.position.z = -0.3;
        planeSpiderWeb.position.y = 0.34;
        var materialSpiderWeb = new BABYLON.StandardMaterial("materialSpiderWeb", scene);
        materialSpiderWeb.diffuseTexture = new BABYLON.Texture("textures/spiderweb/web.png", scene);
        materialSpiderWeb.diffuseColor = brightness;
        materialSpiderWeb.opacityTexture = materialSpiderWeb.diffuseTexture;
        planeSpiderWeb.material = materialSpiderWeb;

        var planeSpiderWeb1 = BABYLON.MeshBuilder.CreatePlane("planeSpiderWeb1", {height:1.0, width: 4}, scene);
        planeSpiderWeb1.position.z = -0.12;
        planeSpiderWeb1.position.y = -0.8;
        var textureWeb1 = new BABYLON.Texture("textures/spiderweb/web1.png", scene);
        var materialSpiderWeb1 = new BABYLON.StandardMaterial("materialSpiderWeb1", scene);
        materialSpiderWeb1.diffuseTexture = textureWeb1.clone();
        materialSpiderWeb1.diffuseColor = brightness;
        materialSpiderWeb1.opacityTexture = materialSpiderWeb1.diffuseTexture;
        planeSpiderWeb1.material = materialSpiderWeb1;

        var planeSpiderWeb2 = BABYLON.MeshBuilder.CreatePlane("planeSpiderWeb2", {height:3, width: 5, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
        planeSpiderWeb2.scaling = new BABYLON.Vector3(-4.5, 4.5, 4.5);
        planeSpiderWeb2.position.x = 24;
        planeSpiderWeb2.position.y = -18.0;
        planeSpiderWeb2.position.z = -0.1;
        planeSpiderWeb2.rotation.y = -0.2;
        planeSpiderWeb2.rotation.z = -0.0872664626;
        var materialSpiderWeb2 = new BABYLON.StandardMaterial("materialSpiderWeb2", scene);
        materialSpiderWeb2.diffuseTexture =  new BABYLON.Texture("textures/spiderweb/web2.png", scene);
        materialSpiderWeb2.diffuseColor = brightness;
        materialSpiderWeb2.opacityTexture = materialSpiderWeb2.diffuseTexture;
        planeSpiderWeb2.material = materialSpiderWeb2;

        var planeSpiderWeb3 = BABYLON.MeshBuilder.CreatePlane("planeSpiderWeb3", {height:1.0, width: 4}, scene);
        planeSpiderWeb3.position.z = -0.12;
        planeSpiderWeb3.position.y = -0.8;
        planeSpiderWeb3.scaling = new BABYLON.Vector3(-1,1,1);
        var materialSpiderWeb3 = new BABYLON.StandardMaterial("materialSpiderWeb3", scene);
        materialSpiderWeb3.diffuseTexture = textureWeb1.clone();
        materialSpiderWeb3.diffuseColor = brightness;
        materialSpiderWeb3.opacityTexture = materialSpiderWeb3.diffuseTexture;
        planeSpiderWeb3.material = materialSpiderWeb3;

        var camera = new BABYLON.ArcRotateCamera("camera", 0, 0, 0, new BABYLON.Vector3(0, 7, 43), scene);
        scene.showFps();
        camera.setTarget(new BABYLON.Vector3(0, -2.5, 0));
        // camera.attachControl(canvas, false);

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

       /* var lightSphere0 = BABYLON.Mesh.CreateSphere("Sphere0", 16, 0.5, scene);
        lightSphere0.position = light.position;*/

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
        // defaultPipeline.brightThreshold = 0.8;
        // var curve = new BABYLON.ColorCurves();
        // curve.globalHue = 200;
        // curve.globalDensity = 80;
        // curve.globalSaturation = 80;
        // curve.highlightsHue = 100;
        // curve.highlightsDensity = 80;
        // curve.highlightsSaturation = -80;
        // curve.shadowsHue = 2;
        // curve.shadowsDensity = 80;
        // curve.shadowsSaturation = 40;
        // defaultPipeline.imageProcessing.colorCurves = curve;
        // defaultPipeline.depthOfField.focalLength = 150;

        defaultPipeline.samples = 2;
        defaultPipeline.fxaaEnabled = true;
        // defaultPipeline.imageProcessing.contrast = 0.8;
        // defaultPipeline.imageProcessing.exposure = 0.5;

        // defaultPipeline.bloomEnabled = true;
        // defaultPipeline.bloomKernel = 10;
        // defaultPipeline.bloomWeight = 0.02;
        // defaultPipeline.bloomThreshold = 0.01;
        // defaultPipeline.bloomScale = 0.01;
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
////////////////// SOUNDS
        var introSound = new BABYLON.Sound("introSound", "sounds/intro.mp3", scene);
        introSound.setVolume(0.75);
        var openChestSound = new BABYLON.Sound("openChestSound", "sounds/open_chest.mp3", scene);
        openChestSound.setVolume(0.5);
        var clickButtonSound = new BABYLON.Sound("clickButtonSound", "sounds/button_click.mp3", scene);
        clickButtonSound.setVolume(0.25);
        var dropSymbolsSound = new BABYLON.Sound("dropSymbolsSound", "sounds/drop.mp3", scene);
        dropSymbolsSound.setVolume(0.025);
        var freeSpinSound = new BABYLON.Sound("freeSpinSound", "sounds/freespin.mp3", scene);
        // freeSpinSound.setVolume(0.75);
        var winSound = new BABYLON.Sound("winSound", "sounds/win.mp3", scene);
        winSound.setVolume(0.15);
        var inChestSound = new BABYLON.Sound("inChestSound", "sounds/inChest.mp3", scene);
        inChestSound.setVolume(0.2);
        var mapSound = new BABYLON.Sound("mapSound", "sounds/map.mp3", scene);
        // mapSound.setVolume(0.75);
        var glassSound = new BABYLON.Sound("glassSound", "sounds/glass.mp3", scene);
        glassSound.setVolume(0.3);
        var fireballSound = new BABYLON.Sound("fireballSound", "sounds/fireball.mp3", scene);
        fireballSound.setVolume(0.5);
////////////////////////////////////////////////////
        var manager = new BABYLON.GUI.GUI3DManager(scene);
        var countRow = 3;
        var countColl = 5;
        function startRoundGame() {
            mapLineWin.clear();
            arrayObjectsFreeSpin = [];
            genCombination.generate();
            if (genCombination.numFreeSpin <= 0) {
                freeSpin.setOnOff(false);
                OpenChest.call(freeSpin.compass.cup, new BABYLON.Vector3(0,0,0), 30);
            }
            countSymbolWin = 0;
            countSymbolScaling = 0;
            for (var i = 0; i < countRow; i++) {
                for (var j = 0; j < countColl; j++) {
                    var obj = scene.getMeshByName(j + "-" + i);
                    scene.stopAnimation(obj);
                    obj._children.map(v => {
                        if (
                            v.name === obj.name + "." + "map_1" ||
                            v.name === obj.name + "." + "map_2" ||
                            v.name === obj.name + "." + "map_3"
                        ) {
                            var center = v.userData.center;
                            v.setPivotMatrix(BABYLON.Matrix.Translation(-center.x, -center.y, -center.z));
                            v.position = new BABYLON.Vector3(0,0,0).subtract(center);
                            v.rotation.z = (Math.random() < 0.5 ? -1 : 1) * Math.PI / 15;
                            v.material = v.userData.defaultMaterial;
                            v.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
                        }

                        if (v.particleSystem.electric) {
                            v.particleSystem.electric.reset();
                            v.particleSystem.electric.stop();
                            v.particleSystem.spark.reset();
                            v.particleSystem.spark.stop();
                        } else if (v.name !== obj.name + "." + "cube") {
                            v.particleSystem.flame.reset();
                            v.particleSystem.flame.stop();
                            v.particleSystem.origin.reset();
                            v.particleSystem.origin.stop();
                        } else {
                            v.particleSystem.reset();
                            v.particleSystem.stop();
                        }

                        v.scaling = new BABYLON.Vector3(1,1,1);
                        v.rotation = BABYLON.Vector3.Zero();
                    });
                    obj.position.y = 20;
                    obj.position.z = 0;
                    obj.scaling = new BABYLON.Vector3(1, 1, 1);
                    obj.rotation = BABYLON.Vector3.Zero();
                    obj.rotate(BABYLON.Axis.Z, (Math.random() < 0.5 ? -1 : 1) * Math.PI, BABYLON.Space.WORLD);
                    obj.userData.rotateDestination = new BABYLON.Vector3(0, 0, (Math.random() < 0.5 ? -1 : 1) * 2 * Math.PI);
                    obj.userData.flagDestination = false;
                    obj.userData.flagStartTween = false;
                    obj.userData.startDrop = true;
                    obj.userData.inChest = false;
                    obj.userData.endInChestAnimation = false;
                    obj.userData.endScalingAnimation = false;
                    obj.userData.inFreeSpin = false;
                    if (genCombination.isFreeSpin && genCombination.moveArrayFreeSpinSymb[j][i] === 1) {
                        arrayObjectsFreeSpin = [...arrayObjectsFreeSpin, obj];
                        countSymbolWin++;
                        obj.userData.inFreeSpin = true;
                    }
                }
            }


            var arr = genCombination.arrayCombination;
        /*    if (
                genCombination.moveArray[0][4][1] === 1 &&
                genCombination.moveArray[1][4][0] === 1 &&
                genCombination.moveArray[2][4][2] === 1
            ) {
                endScaling = true;
                countSymbolWin = 15;
            } else {*/
                for (var i = 0; i < genCombination.numWinSymbline.length; i++) {
                        for (var j = 0; j < genCombination.moveArray[i].length; j++) {
                            for (var h = 0; h < genCombination.moveArray[i][j].length; h++) {
                                var obj = scene.getMeshByName(j + "-" + h);

                                if (!obj.userData.inChest) {
                                    obj.userData.scalingDown = false;
                                    endScaling = false;
                                    dropInChest = false;
                                    moveFreeSpin = false;
                                    endDrop = false;
                                    if (genCombination.moveArray[i][j][h] === 1) {
                                        if (arrayObjectsFreeSpin.indexOf(obj) === -1) {
                                            countSymbolWin++;
                                            obj.userData.inChest = true;
                                        }
                                        if (!mapLineWin.has(i)) {
                                            mapLineWin.set(i, {array: [obj], moveForward: true, moveBack: false});
                                        } else {
                                            var mapObjs = mapLineWin.get(i);
                                            mapObjs.array = [...mapObjs.array, obj];
                                            mapLineWin.set(i, mapObjs);
                                        }
                                    } else {
                                        if (arrayObjectsFreeSpin.indexOf(obj) === -1) {
                                            obj.userData.scalingDown = true;
                                            countSymbolScaling++;
                                        }
                                    }

                                    obj.userData.visibleSymbol = arr[j][h];
                                    obj._children.map(v => {
                                        v.visibility = false;
                                    });
                                    if (arr[j][h] !== genCombination.freeSpinSymb) {
                                        obj._children[arr[j][h]].visibility = true;
                                    } else {
                                        obj._children[arr[j][h]+numberPartMap].visibility = true;
                                        numberPartMap < 2 ? numberPartMap++ : numberPartMap = 0;
                                        obj._children[10].visibility = true;
                                    }
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
                if (countSymbolWin >= countRow * countColl) {
                    endScaling = true;
                }
                if (countSymbolWin === 0) {
                    countSymbolWin = -1;
                }
            // }
        }
////////////////////////////////////////////////////
        var distanceBetweenSymbolRow = 6;
        var distanceBetweenSymbolColl = 6;
        var halfLengthRow = (distanceBetweenSymbolRow * (countColl-1)) / 2;
        var halfLengthColl = (distanceBetweenSymbolColl * (countRow-1)) / 2;
        var plusLineButton, minusLineButton;
        var plusLineObservable = function () {
            if (!genCombination.numFreeSpin) {
                if (plusLineButton.enabled) {
                    clickButtonSound.play();
                }
                genCombination.toIncreaseLines();
                lines.setTextForAnimation(genCombination.winLineNum.toString());
                bet.setTextForAnimation(genCombination.getTotalBet().toString());
                enableButton(minusLineButton);
                if (genCombination.isMaxLines) {
                    unEnableButton(plusLineButton);
                }
            }
        };
        var minusLineObservable = function () {
            if (!genCombination.numFreeSpin) {
                if (minusLineButton.enabled) {
                    clickButtonSound.play();
                }
                genCombination.reduceLines();
                lines.setTextForAnimation(genCombination.winLineNum.toString());
                bet.setTextForAnimation(genCombination.getTotalBet().toString());
                enableButton(plusLineButton);
                if (genCombination.isMinLines) {
                    unEnableButton(minusLineButton);
                }
            }
        };
        var maxBetButton, plusBetButton, minusBetButton;

        var maxBetButtonObservable = function () {
            if (!genCombination.numFreeSpin) {
                clickButtonSound.play();
                genCombination.setMaxBet();
                bet.setTextForAnimation(genCombination.getTotalBet().toString());
                unEnableButton(plusBetButton);
                enableButton(minusBetButton);
            }
        };
        var plusBetButtonObservable = function () {
            if (!genCombination.numFreeSpin) {
                if (plusBetButton.enabled) {
                    clickButtonSound.play();
                }
                genCombination.toIncreaseBet();
                bet.setTextForAnimation(genCombination.getTotalBet().toString());
                /* genCombination.toIncreaseLines();
                 lines.setTextForAnimation(genCombination.winLineNum.toString());*/
                enableButton(minusBetButton);
                if (genCombination.isMaxBet) {
                    unEnableButton(plusBetButton);
                }
            }
        };
        var minusBetButtonObservable = function () {
            if (!genCombination.numFreeSpin) {
                if (minusBetButton.enabled) {
                    clickButtonSound.play();
                }
                genCombination.reduceBet();
                bet.setTextForAnimation(genCombination.getTotalBet().toString());
                /*  genCombination.reduceLines();
                  lines.setTextForAnimation(genCombination.winLineNum.toString());*/
                enableButton(plusBetButton);
                if (genCombination.isMinBet) {
                    unEnableButton(minusBetButton);
                }
            }
        };
        var optionsWinLines = {
            maskWinLine: genCombination.maskWinLine,
            distanceBetweenSymbolRow: distanceBetweenSymbolRow,
            distanceBetweenSymbolColl: distanceBetweenSymbolColl,
            halfLengthRow: halfLengthRow,
            halfLengthColl: halfLengthColl,
            deltaBeginEnd: 4,
            z: -1.0
        };
        var winLines = WinLines(optionsWinLines, scene);
        var rightCheckWinLines, leftCheckWinLines;

        var animationGroupPirate = {};
        var currentGroup;
        // scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
        // scene.animationPropertiesOverride.enableBlending = true;
        // scene.animationPropertiesOverride.blendingSpeed = 0.05;

        var gl = new BABYLON.GlowLayer("glow", scene, {
            mainTextureRatio: 0.5,
            //   mainTextureSamples: 1,
            //   mainTextureFixedSize: 512,
            blurKernelSize: 8
        });
        gl.intensity = 0.65;

        BABYLON.SceneLoader.OnPluginActivatedObservable.add(function (plugin) {
            if (plugin.name === "gltf" && plugin instanceof BABYLON.GLTFFileLoader) {
                plugin.animationStartMode = BABYLON.GLTFLoaderAnimationStartMode.NONE;
                plugin.compileMaterials = true;
                plugin.compileShadowGenerators = true;
            }
        });

        Promise.all([
            BABYLON.SceneLoader.ImportMesh("", "models/anim/", "anim.gltf", scene, function (newMeshes, particleSystems, skeletons) {
                animationGroupPirate.object = newMeshes[0];
                newMeshes[0].position.x = 31.0;
                newMeshes[0].position.y = -18.5;
                newMeshes[0].position.z = -12.0;
                newMeshes[0]._children.map(v => {
                    if(v.material) {
                        v.material.reflectionTexture = hdrTexture;
                        v.receiveShadows = true;
                        shadowGenerator.addShadowCaster(v);
                    }
                });
                newMeshes[0].scaling = new BABYLON.Vector3(1.4, 1.4, -1.4);
 // console.log(scene.animationGroups);
                newMeshes[0].rotation.y = -Math.PI / 3.75;

                var overrides = new BABYLON.AnimationPropertiesOverride();
                overrides.enableBlending = true;
                overrides.blendingSpeed = 0.05;
                overrides.loopMode = 0;

                skeletons[0].animationPropertiesOverride = overrides;

                scene.animationGroups[3].start(true);
                currentGroup = scene.animationGroups[3];
            }),
            BABYLON.SceneLoader.ImportMesh("", "models/compass/", "compass.gltf", scene, function (newMeshes) {
                newMeshes[0].name = "compass";
                newMeshes[0].position = freeSpin.anchor.position.clone();
                newMeshes[0].position.x -= 0.3;
                newMeshes[0].position.z -= 1.0;
                newMeshes[0].rotation.y = 0.3;
                freeSpin.anchor.rotation = newMeshes[0].rotation.clone();
                newMeshes[0]._children.map(v => {
                    v.material.reflectionTexture = hdrTexture;
                    v.material.environmentIntensity = 0.3;
                    v.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
                });
                freeSpin.compass = {arrow: newMeshes[1], cup: newMeshes[3]};
            }),
        BABYLON.SceneLoader.ImportMesh("", "models/lines/", "lines.gltf", scene, function (newMeshes) {
            rightCheckWinLines = newMeshes[1];
            rightCheckWinLines._children.map(v => {
                    var mat = v.material.clone();
                    mat.reflectionTexture = hdrTexture;
                    mat.environmentIntensity = 0.3;
                    mat.emissiveColor = new BABYLON.Color3(0, 0, 0);
                    mat.emissiveIntensity = 0.0;
                    v.material = mat;
                 // console.log(v.name, v.material.emissiveTexture);
            });

            newMeshes[0].scaling = new BABYLON.Vector3(-4.5, 3.4, 5);
            newMeshes[0].name = "rightlines";
            newMeshes[0].position.x = -17;
            newMeshes[0].position.y = 7.68;
            newMeshes[0].position.z = -0.75;

            leftCheckWinLines = newMeshes[0].clone("leftLines");
            leftCheckWinLines.position.x = -newMeshes[0].position.x;
            leftCheckWinLines.position.y = newMeshes[0].position.y;
            leftCheckWinLines.position.z = newMeshes[0].position.z;

            planeSpiderWeb.parent = rightCheckWinLines;
        }),

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
            planeSpiderWeb3.parent = rightBet;
            bet.anchor.parent = rightBet;
            bet.anchor.scaling = new BABYLON.Vector3(-1, 1, 1);
            lines.anchor.parent = rightBet;
            lines.anchor.scaling = new BABYLON.Vector3(-1, 1, 1);

            var materialLinesButton = new BABYLON.PBRMaterial("materialLinesButton", scene);
            materialLinesButton.albedoTexture = new BABYLON.Texture("textures/arrow/DefaultMaterial_baseColor.png", scene);
            materialLinesButton.albedoTexture.hasAlpha = true;
            materialLinesButton.metallic = 0.0;

            var minusMesh = BABYLON.MeshBuilder.CreateBox("", {height: 0.3, width: 0.3, depth: 0.1, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
            minusMesh.material = materialLinesButton.clone();
            var optionMinusLineButton = {
                deltaPush: new BABYLON.Vector3(0,0,0.05),
                positionButton: new BABYLON.Vector3(0.8,0.02,0)
            };
            minusLineButton = MakeButton("plusLineButton", minusMesh, rightBet, optionMinusLineButton, manager);
            minusLineButton.onPointerUpObservable.add(minusLineObservable);

            var plusMesh = minusMesh.clone();
            plusMesh.material = materialLinesButton.clone();
            plusMesh.scaling = new BABYLON.Vector3(-1, 1, 1);
            var optionPlusLineButton = {
                deltaPush: new BABYLON.Vector3(0,0,0.05),
                positionButton: new BABYLON.Vector3(1.6,0.02,0)
            };
            plusLineButton = MakeButton("plusLineButton", plusMesh, rightBet, optionPlusLineButton, manager);
            plusLineButton.onPointerUpObservable.add(plusLineObservable);

            unEnableButton(plusLineButton);
            enableButton(minusLineButton);

            var round = newMeshes[0].clone("round");
            round.scaling = new BABYLON.Vector3(7, 5, 5);
            round.position.x = 0;
            round.position.y = 15;
            round.position.z = -20;
            round.rotation.y = 0.2;
            round.rotation.z = 0.0872664626*1.25;
            roundScore.anchor.parent = round;
            roundScore.anchor.scaling = new BABYLON.Vector3(-5/7, 1, 1);
            planeSpiderWeb1.parent = round;
        }),

        BABYLON.SceneLoader.ImportMesh("", "models/1/", "chest.gltf", scene, function (newMeshes, ps1s, skeletons) {
            newMeshes[0].name = "chest";
            newMeshes[0].position.y = -10.648;
            newMeshes[0].position.z = -29;
            newMeshes[0].scaling = new BABYLON.Vector3(-5, 5, 5);
            newMeshes.map(v => {
                if (v.material) {
                    v.material.reflectionTexture = hdrTexture1;
                    v.material.environmentIntensity = 0.3;
                    if (v.name === "door" || v.name === "gradeLeft" ||
                        v.name === "gradeRight" || v.name === "walls") {
                        v.receiveShadows = true;
                        v.material.albedoColor = new BABYLON.Color3(0.5, 0.5, 0.5);
                        // v.material.specularColor  = new BABYLON.Color3(0, 0, 0);
                    } else {
                        v.receiveShadows = true;
                        shadowGenerator.addShadowCaster(v);
                    }
                }
            });
          /*  console.log(newMeshes);
            newMeshes[0]._children.map(v => {
                v.material.reflectionTexture = hdrTexture;
                v.receiveShadows = true;
                shadowGenerator.addShadowCaster(v);
               /!* v._children.map(vv => {
                    vv.material.reflectionTexture = hdrTexture;
                    vv.receiveShadows = true;
                    shadowGenerator.addShadowCaster(vv);
                    console.log(vv.name);
                });*!/
                // console.log(v.name);
            });*/

            // newMeshes[11].receiveShadows = true;
            // shadowGenerator.addShadowCaster(newMeshes[11]);
/////////////////////////////////////
//             ElectricField(newMeshes[8]);
/////////////////////////////////////
            var optionStartButton = {
                deltaPush: new BABYLON.Vector3(0,0.1,0)
            };

           var startButton = MakeButton("startButton", newMeshes[1], newMeshes[12], optionStartButton, manager);

            startButton.onPointerUpObservable.add(function () {
                clickButtonSound.play();
                endScaling = false;
                genCombination.gettingWinnings();
                roundScore.zeroing();
                genCombination.placeBet();
                credit.setTextForAnimation(genCombination.totalScore);
                freeSpin.setTextForAnimation(genCombination.numFreeSpin.toString());
                startRoundGame();
                showRoundScore = true;
                winLines.map(v => {v.setEnabled(false)/*; v.renderingGroupId = 0;*/});
                rightCheckWinLines._children.map(v => {
                    v.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
                });
                leftCheckWinLines._children.map(v => {
                    v.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
                });

                if (genCombination.numFreeSpin) {
                    unEnableButton(plusLineButton);
                    unEnableButton(minusLineButton);
                    unEnableButton(maxBetButton);
                    unEnableButton(plusBetButton);
                    unEnableButton(minusBetButton);
                } else {
                    if (!autoPlay) {
                        if (genCombination.isMaxLines) {
                            enableButton(minusLineButton);
                        } else if (genCombination.isMinLines) {
                            enableButton(plusLineButton);
                        } else {
                            enableButton(minusLineButton);
                            enableButton(plusLineButton);
                        }

                        enableButton(maxBetButton);
                        if (genCombination.isMaxBet) {
                            enableButton(minusBetButton);
                        } else if (genCombination.isMinBet) {
                            enableButton(plusBetButton);
                        } else {
                            enableButton(minusBetButton);
                            enableButton(plusBetButton);
                        }
                    }
                }
              /*  if (animationGroupPirate.idleBegin) {
                    if (currentGroup) {
                        currentGroup.stop();
                    }
                    animationGroupPirate.idleBegin.start(true, animationGroupPirate.idleBegin.speedRatio, animationGroupPirate.idleBegin.from, animationGroupPirate.idleBegin.to);
                    currentGroup = animationGroupPirate.idleBegin;
                }*/
            });

            var optionSecondButton = {
                deltaPush: new BABYLON.Vector3(0,-0.05,0)
            };

            maxBetButton = MakeButton("maxBetButton", newMeshes[4], newMeshes[13], optionSecondButton, manager);
            maxBetButton.onPointerUpObservable.add(maxBetButtonObservable);
            plusBetButton = MakeButton("plusBetButton ", newMeshes[3], newMeshes[14], optionSecondButton, manager);
            plusBetButton.onPointerUpObservable.add(plusBetButtonObservable);
            minusBetButton = MakeButton("minusBetButton", newMeshes[2], newMeshes[13], optionSecondButton, manager);
            unEnableButton(minusBetButton);
            minusBetButton.onPointerUpObservable.add(minusBetButtonObservable);

            var autoPlayButton = MakeButton("autoPlayButton", newMeshes[5], newMeshes[14], optionSecondButton, manager);
            autoPlayButton.onPointerUpObservable.add(function () {
                clickButtonSound.play();
                autoPlay = !autoPlay;
                if (autoPlay) {
                    autoPlayButton.mesh.material.emissiveColor = new BABYLON.Color3(0.5,0.25,0.125);
                    autoPlayButton.mesh.material.emissiveIntensity = 0.05;
                    minusLineButton.onPointerUpObservable.clear();
                    plusLineButton.onPointerUpObservable.clear();
                    maxBetButton.onPointerUpObservable.clear();
                    plusBetButton.onPointerUpObservable.clear();
                    minusBetButton.onPointerUpObservable.clear();
                    unEnableButton(plusLineButton);
                    unEnableButton(minusLineButton);
                    unEnableButton(maxBetButton);
                    unEnableButton(plusBetButton);
                    unEnableButton(minusBetButton);
                } else {
                    autoPlayButton.mesh.material.emissiveColor = new BABYLON.Color3(0.0,0.0,0.0);
                    autoPlayButton.mesh.material.emissiveIntensity = 0.0;
                    minusLineButton.onPointerUpObservable.add(minusLineObservable);
                    plusLineButton.onPointerUpObservable.add(plusLineObservable);
                    maxBetButton.onPointerUpObservable.add(maxBetButtonObservable);
                    plusBetButton.onPointerUpObservable.add(plusBetButtonObservable);
                    minusBetButton.onPointerUpObservable.add(minusBetButtonObservable);
                    if (genCombination.isMaxLines) {
                        enableButton(minusLineButton);
                    } else if (genCombination.isMinLines) {
                        enableButton(plusLineButton);
                    } else {
                        enableButton(minusLineButton);
                        enableButton(plusLineButton);
                    }

                    enableButton(maxBetButton);
                    if (genCombination.isMaxBet) {
                        enableButton(minusBetButton);
                    } else if (genCombination.isMinBet) {
                        enableButton(plusBetButton);
                    } else {
                        enableButton(minusBetButton);
                        enableButton(plusBetButton);
                    }
                }
            });

            BABYLON.SceneLoader.ImportMesh("", "models/", "diamond.gltf", scene, function (newMeshes) {
               /* newMeshes[0]._children.map(v => {
                    console.log(v.name);
                });*/
                var box = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 0.1}, scene);
                box.visibility = false;
                box.position = new BABYLON.Vector3(-0.75, 4.2, 9.0);
                var fireBall = FireBall(box);
                var explodeFireBall = FireBlast(freeSpin.anchor);
                box.userData = {
                    beginPosition: box.position.clone(),
                    particles: fireBall,
                    explodeFireBall: explodeFireBall
                };

                for (var i = 0; i < countRow; i++) {
                    var y = distanceBetweenSymbolColl * i - halfLengthColl;
                    for (var j = 0; j < countColl; j++) {
                        var x = distanceBetweenSymbolRow * j - halfLengthRow;
                        var mesh = newMeshes[0].clone(j + "-" + i);
                        mesh.scaling = new BABYLON.Vector3(0.001, 0.001, 0.001);
                        var obj = CreateJewel.call(mesh, [], texturesJewel, new BABYLON.Vector3(-x, 70, 0), gl, false);
                        DropJewel.call(obj, scene, {box: box, freeSpin: freeSpin}, startButton, new BABYLON.Vector3(-x, -y, 0),
                            {
                                soundDrop: dropSymbolsSound,
                                freeSpinSound: freeSpinSound,
                                inChestSound: inChestSound,
                                mapSound: mapSound,
                                glassSound: glassSound,
                                fireballSound: fireballSound
                            }
                        );
                        mapAllSymbol.set(j + "-" + i, obj);
                        obj.userData.beginGame = true;
                    }
                }

                newMeshes[0].dispose();
            });

            // Options (target 70fps (which is not possible) with a check every 500ms)
            var options = new BABYLON.SceneOptimizerOptions(30, 500);
            options.addOptimization(new BABYLON.HardwareScalingOptimization(0, 1));
            options.addCustomOptimization(function () {
                // defaultPipeline.bloomEnabled = false;
                defaultPipeline.fxaaEnabled = false;
                // defaultPipeline.sharpenEnabled = false;
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
                engine.hideLoadingUI();
                optimizer.start();
                OpenChest.call(newMeshes[16], new BABYLON.Vector3(0,-Math.PI*0.4,0), 15);
                credit.setTextForAnimation(genCombination.totalScore.toString());
                bet.setTextForAnimation(genCombination.getTotalBet().toString());
                lines.setTextForAnimation(genCombination.winLineNum.toString());
                freeSpin.setTextForAnimation(genCombination.numFreeSpin.toString());
                introSound.play();
                openChestSound.play();
                scene.animationGroups.map(v => {
                    animationGroupPirate[v.name] = v;
                    animationGroupPirate[v.name].freeAnimation = true;
                });

                animationGroupPirate.idleLookInChest.onAnimationGroupEndObservable.add(function() {
                    if (animationGroupPirate.idleLookInChestPlayBack) {
                        if (currentGroup) {
                            currentGroup.stop();
                        }
                        animationGroupPirate.idleLookInChestPlayBack.start(false);
                        animationGroupPirate.idleLookInChestPlayBack.onAnimationGroupEndObservable.add(function () {
                            if (animationGroupPirate.idleAfterLookInChest) {
                                animationGroupPirate.idleAfterLookInChest.start(false);
                                currentGroup = animationGroupPirate.idleAfterLookInChest;
                                animationGroupPirate.idleAfterLookInChest.onAnimationGroupEndObservable.add(function () {
                                    animationGroupPirate.idleAfterLookInChest.freeAnimation = true;
                                    if (animationGroupPirate.idleBegin) {
                                        if (currentGroup) {
                                            currentGroup.stop();
                                        }
                                        animationGroupPirate.idleBegin.start(true);
                                        currentGroup = animationGroupPirate.idleBegin;
                                    }
                                });
                            }
                        });
                    }
                });

                animationGroupPirate.idleFreeSpin.onAnimationGroupEndObservable.add(function () {
                    animationGroupPirate.idleFreeSpin.freeAnimation = true;
                    if (animationGroupPirate.idleBegin) {
                        if (currentGroup) {
                            currentGroup.stop();
                        }
                        animationGroupPirate.idleBegin.start(true);
                        currentGroup = animationGroupPirate.idleBegin;
                    }

                   /* if (animationGroupPirate.idleBegin && currentGroup) {
                        currentGroup.setWeightForAllAnimatables(1);
                        animationGroupPirate.idleBegin.setWeightForAllAnimatables(0);
                        animationGroupPirate.idleBegin.start(true);
                        var weightAnim = 0;
                        let obs = scene.onBeforeAnimationsObservable.add(function () {
                            weightAnim += 0.01;
                            if (weightAnim >= 1) {
                                scene.onBeforeAnimationsObservable.remove(obs);
                                animationGroupPirate.idleBegin.setWeightForAllAnimatables(1);
                                currentGroup.setWeightForAllAnimatables(0);
                                currentGroup.stop();
                                currentGroup = animationGroupPirate.idleBegin;
                            } else {
                                animationGroupPirate.idleBegin.setWeightForAllAnimatables(1 + weightAnim);
                                currentGroup.setWeightForAllAnimatables(1 - weightAnim);
                            }
                        })
                    }*/
                });
                        // console.log(scene.animationGroups);

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


        })
    ]).then(() => {
            scene.registerBeforeRender(function () {
                if (mapLineWin.size && endScaling && endDrop) {
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
                                nameSlot.visibility = false;
                            }
                            objWineline.setEnabled(true);
                            enableColorCheckLine(objCheckLine);
                            mapObjs.array.map(v =>{
                                if (!winSound.isPlaying) {
                                    winSound.play();
                                }
                                var animation = AnimationMoveForward.call(v, new BABYLON.Vector3(v.position.x, v.position.y, 5), 60);
                                animation.onAnimationEnd = function () {
                                    animation.animationStarted = false;
                                    v.userData.startDrop = false;
                                    mapObjs.moveBack = true;
                                }
                            });
                            mapObjs.moveForward = false;

                            if (
                                animationGroupPirate.idleWin &&
                                animationGroupPirate.idleAfterLookInChest.freeAnimation &&
                                animationGroupPirate.idleFreeSpin.freeAnimation
                            ) {
                                if (currentGroup) {
                                    currentGroup.stop();
                                }
                                animationGroupPirate.idleWin.start(true);
                                currentGroup = animationGroupPirate.idleWin;
                            }
                        } else if (mapObjs.moveBack) {
                            mapLineWin.delete(indexLine);
                            unEnableColorCheckLine(objCheckLine);
                            objWineline.setEnabled(false);
                            if (mapLineWin.size) {
                                indexLine = mapLineWin.entries().next().value[0];
                            } else {
                                endScaling = false;
                                dropInChest = true;
                                if (genCombination.isFreeSpin) {
                                    moveFreeSpin = true;
                                } else {
                                    moveFreeSpin = false;
                                }
                                var totalRound = genCombination.getTotalRound();
                                roundScore.zeroing();
                                nameSlot.visibility = true;
                                genCombination.gettingWinnings();
                                credit.setTextForAnimation(genCombination.totalScore);

                                if (
                                    animationGroupPirate.idleLookInChest && totalRound >= 250 &&
                                    animationGroupPirate.idleFreeSpin.freeAnimation
                                ) {
                                    totalRound = 0;
                                    console.log(totalRound);
                                    if (currentGroup) {
                                        currentGroup.stop();
                                    }
                                    animationGroupPirate.idleLookInChest.start(false);
                                    animationGroupPirate.idleAfterLookInChest.freeAnimation = false;
                                    currentGroup = animationGroupPirate.idleLookInChest;
                                }
                            }
                        }
                    }
                } else  if (!mapLineWin.size && endScaling && endDrop) {
                        endScaling = false;
                    if (genCombination.isFreeSpin) {
                        moveFreeSpin = true;
                    } else {
                        moveFreeSpin = false;
                    }
                        countSymbolScaling = 15;
                     //   freeSpin.setTextForAnimation(genCombination.numFreeSpin.toString());
                }
                if (
                    startAnimationCharacter &&
                    animationGroupPirate.idleAfterLookInChest.freeAnimation
                ) {
                    startAnimationCharacter = false;
                    if (animationGroupPirate.idleFreeSpin) {
                        if (currentGroup && currentGroup !== animationGroupPirate.idleFreeSpin) {
                            currentGroup.stop();
                        }
                        animationGroupPirate.idleFreeSpin.start(false);
                        animationGroupPirate.idleFreeSpin.freeAnimation = false;
                        currentGroup = animationGroupPirate.idleFreeSpin;
                    }
                }
            });
            scene.registerAfterRender(function () {
                if (autoPlay) {
                    var iter = 0;
                    var iter2 = 0;
                    for (var [key, value] of mapAllSymbol) {
                        value.userData.endInChestAnimation ? iter++ : null;
                        value.userData.endScalingAnimation ? iter2++ : null;
                    }
                    // console.log(iter, countSymbolWin);
                    // console.log(iter2, countSymbolScaling);
                    if (iter === countSymbolWin || iter2 === countSymbolScaling) {
                        endScaling = false;
                        genCombination.gettingWinnings();
                        roundScore.zeroing();
                        genCombination.placeBet();
                        credit.setTextForAnimation(genCombination.totalScore);
                        freeSpin.setTextForAnimation(genCombination.numFreeSpin.toString());
                        startRoundGame();
                        showRoundScore = true;

                       /* if (animationGroupPirate.idleBegin) {
                            if (currentGroup) {
                                currentGroup.stop();
                            }
                            animationGroupPirate.idleBegin.start(true, animationGroupPirate.idleBegin.speedRatio, animationGroupPirate.idleBegin.from, animationGroupPirate.idleBegin.to);
                            currentGroup = animationGroupPirate.idleBegin;
                        }*/
                    }
                }
            });
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

        return scene;
    };

    var scene = createScene();

    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
    /*window.onbeforeunload = function (event) {
        var message = 'Important: Please click on \'Save\' button to leave this page.';
        if (typeof event == 'undefined') {
            event = window.event;
        }
        if (event) {
            event.returnValue = message;
        }
        return message;
    };*/
}