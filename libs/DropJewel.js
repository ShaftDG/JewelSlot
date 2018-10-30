function DropJewel(scene, pushButton, positionDestinationDown, speedMove) {
    var object = this;

    var durationPosition = 60;
    object.userData.speedMove = Math.random() * (1.5 - 1.0) + 1.0;

    var animation, animationInChest;
    function startRoundGame() {
        scene.stopAnimation(object);
        object.position.y = 20;
        object.position.z = 0;
        object.rotate(BABYLON.Axis.Z, (Math.random() < 0.5 ? -1 : 1) * Math.PI, BABYLON.Space.WORLD);
        object.userData.rotateDestination = new BABYLON.Vector3(0, 0, (Math.random() < 0.5 ? -1 : 1) * 2 * Math.PI);
        object.userData.flagDestination = false;
        object.userData.flagStartTween = false;
        object.userData.startDrop = true;
        object.userData.inChest = false;
        // object.userData.scalingDown = false;
    }
    scene.registerBeforeRender(function () {
        if (object.userData.startDrop) {
                if (!object.userData.flagStartTween) {
                    animation = AnimationDrop.call(object, positionDestinationDown, object.userData.rotateDestination, durationPosition);
                    object.userData.flagStartTween = true;
                } else {
                    animation.onAnimationEnd = function () {
                        animation.animationStarted = false;
                        object.userData.startDrop = false;
                    }
                }
        } else if (object.userData.scalingDown) {
                object._children.map(v => v.scaling = new BABYLON.Vector3(
                    v.scaling.x >= 0.1 ? v.scaling.x - 0.05 : v.visibility = false,
                    v.scaling.y >= 0.1 ? v.scaling.y - 0.05 : v.visibility = false,
                    v.scaling.z >= 0.1 ? v.scaling.z - 0.05 : v.visibility = false
                    )
                );
                if (!object._children.filter(v => v.visibility).length) {
                    object.position.y = 20;
                    object.userData.scalingDown = false;
                    endScaling = true;
                }
        } else if (object.userData.inChest && dropInChest) {
            // if (!animationInChest) {
                animationInChest = AnimationMoveInChest.call(object, new BABYLON.Vector3(object.position.x, -25, -15), 60);
                object.userData.inChest = false;
            // } else {
            //     animationInChest.onAnimationEnd = function () {
            //         animationInChest.animationStarted = false;
            //     }
            // }
        } else {
           /* if (animationInChest) {
                animationInChest.onAnimationEnd = function () {
                    animationInChest.animationStarted = false;
                    if (autoPlay) {
                        startRoundGame();
                    }
                }
            }*/
        }
    });
    pushButton.onPointerClickObservable.add(() => {
        startRoundGame();
    });
   /* pushButton.onPointerDownObservable.add(() => {
        object.userData.speedMove = Math.random() * (2.0 - 1.0) + 1.0;
        object.userData.flagDestination = false;
        object.userData.flagStartTween = false;
        object.userData.inChest = false;
        object.userData.startDrop = true;
        object.userData.scalingDown = false;
        endScaling = false;

        object._children.map(v => {v.visibility = false; v.scaling = new BABYLON.Vector3(1,1,1)});

        var arr = genCombination.arrayCombination;
        var n = object.name./!*split(".")[0].*!/split("-");
        var indexSymb = arr[+n[0]][+n[1]];

        for (var i = 0; i < genCombination.numWinSymbline.length; i++) {
            if (genCombination.numWinSymbline[i] === 1) {
                    var arrMoveArray = genCombination.moveArray[i];
                    if (arrMoveArray[+n[0]][+n[1]] === 1) {
                        object.userData.scalingDown = false;
                        object.userData.inChest = true;
                        break;
                    } else {
                        object.userData.scalingDown = true;
                        object.userData.inChest = false;
                    }
            }
        }
        var indexColorChanel = indexSymb + 1;
        var colorJewel = new BABYLON.Color3(0, 0, 0);
        if (indexColorChanel === 1) {
            colorJewel.r = 2.0;
        } else if (indexColorChanel === 2) {
            colorJewel.g = 2.0;
        } else if (indexColorChanel === 3) {
            colorJewel.b = 2.0;
        }

        object._children[indexSymb].visibility = true;
        object._children[indexSymb].material.albedoColor = colorJewel;

        object.rotationQuaternion = BABYLON.Quaternion.Identity();
        object.rotation = BABYLON.Vector3.Zero();

        object.rotate(BABYLON.Axis.Z, (Math.random() - Math.random()) * 2 * Math.PI, BABYLON.Space.WORLD);
    });*/

}

DropJewel.prototype.constructor = DropJewel;

DropJewel.prototype.setIndexSymb = function(index) {

};