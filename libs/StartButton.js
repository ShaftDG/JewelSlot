function StartButton(loadSymbol, startRoundGame) {
    var pushButtonCore;
    var pushButton;
    var index = 0;
    var manager = new BABYLON.GUI.GUI3DManager(scene);
    var panel = new BABYLON.GUI.StackPanel3D();
    panel.margin = 0.75;

    manager.addControl(panel);
    //   panel.linkToTransformNode(anchor);
    panel.position.y = -16.8;
    panel.position.z = 1.8;
    BABYLON.SceneLoader.ImportMesh("", "models/", "pushButton1.glb", scene, function (newMeshes) {
        pushButtonCore = newMeshes[0];
        makePushButtons();
        pushButtonCore.setEnabled(false);
        newMeshes[0].dispose();

        loadSymbol();
    });
    function makePushButtons() {
        panel.blockLayout = true;
        var newPushButton = pushButtonCore.clone("pushButton" + index);
        newPushButton.scaling = new BABYLON.Vector3(8, 8, 8);
        newPushButton.rotation.x = 0.45;
        var color = new BABYLON.Color3(0.5, 2.0, 0.5);
        makePushButton(newPushButton, color);
        panel.blockLayout = false;
    }
    function makePushButton(mesh, hoverColor) {
        var cylinder = mesh.getChildMeshes(false, (node) => { return node.name.indexOf("Cylinder") !== -1 })[0];
        var cylinderMat = cylinder.material.clone();
        cylinderMat.albedoColor = new BABYLON.Color3(0.5, 0.5, 2.0);
        cylinder.material = cylinderMat;
        var pos = cylinder.position.clone();
        pushButton = new BABYLON.GUI.MeshButton3D(mesh, "pushButton" + index);
        pushButton.pointerEnterAnimation = () => {
            cylinder.material.albedoColor = hoverColor;
        };
        pushButton.pointerOutAnimation = () => {
            cylinder.material.albedoColor = new BABYLON.Color3(0.5, 0.5, 2.0);
        };
        pushButton.pointerDownAnimation = () => {
            cylinder.position.z = pos.z + 0.10;
            cylinder.material.albedoColor = new BABYLON.Color3(2.0, 0.5, 0.5);
        };
        pushButton.pointerUpAnimation = () => {
            cylinder.position.z = pos.z;
            cylinder.material.albedoColor = new BABYLON.Color3(0.5, 2.0, 0.5);
        };
        pushButton.onPointerUpObservable.add(() => {
            startRoundGame();
        });
        panel.addControl(pushButton);
        // index++;
        scene.registerBeforeRender(function () {
            if (mapLineWin.size && endScaling) {
                var indexLine = mapLineWin.entries().next().value[0];
                if (mapLineWin.has(indexLine)) {
                    var mapObjs = mapLineWin.get(indexLine);
                    if (mapObjs.moveForward) {
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
                        }
                    }
                }
            }
        });

    }
    return pushButton;
}