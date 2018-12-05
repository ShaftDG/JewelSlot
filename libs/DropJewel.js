function DropJewel(scene, pointsFreeSpinObject, pushButton, positionDestinationDown) {
    var object = this;

    var durationPosition = 60;
    object.userData.speedMove = Math.random() * (1.5 - 1.0) + 1.0;

    var animation, animationInChest, animationInChestPartMap, animationFreeSpin, animationScaling;

    scene.registerBeforeRender(function () {
       /* if (object.userData.beginGame) {
            if (!object.userData.flagStartTween) {
                animation = AnimationDrop.call(object, positionDestinationDown, object.userData.rotateDestination, durationPosition);
                object.userData.beginGame = false;
            } else {
                animation.onAnimationEnd = function () {
                    animation.animationStarted = false;
                    object.userData.startDrop = false;
                    endDrop = true;
                    if (!object.userData.scalingDown) {
                        object._children.map(v => {
                            if (v.visibility) {
                                if (v.particleSystem.spark) {
                                    v.particleSystem.spark.start();
                                    AnimationRotationPartMap.call(object, 60);
                                }
                            } else {
                                if (v.particleSystem.spark) {
                                    v.particleSystem.spark.reset();
                                    v.particleSystem.spark.stop();
                                }
                            }
                        });
                    }
                }
            }
        } else */if (object.userData.startDrop) {
                if (!object.userData.flagStartTween) {
                    animation = AnimationDrop.call(object, positionDestinationDown, object.userData.rotateDestination, durationPosition);
                    object.userData.flagStartTween = true;
                } else {
                    animation.onAnimationEnd = function () {
                        animation.animationStarted = false;
                        object.userData.startDrop = false;
                        endDrop = true;
                        if (!object.userData.scalingDown) {
                            object._children.map(v => {
                                if (v.visibility) {
                                    if (v.particleSystem.spark) {
                                        v.particleSystem.spark.start();
                                        AnimationRotationPartMap.call(object, 60);
                                    }
                                } else {
                                    if (v.particleSystem.spark) {
                                        v.particleSystem.spark.reset();
                                        v.particleSystem.spark.stop();
                                    }
                                }
                            });
                        }
                    }
                }
        } else if (object.userData.scalingDown) {
                scene.stopAnimation(object);
                animationScaling = AnimationScalingDown.call(object, new BABYLON.Vector3(0,0,0), 60);
                object.userData.scalingDown = false;
                animationScaling.onAnimationEnd = function () {
                animationScaling.animationStarted = false;
                    object.scaling = new BABYLON.Vector3(1,1,1);
                    object.position.y = 20;
                    object._children.map(v => {
                       v.visibility = false;
                    });
                    object.userData.endScalingAnimation = true;
                    endScaling = true;
                }
        } else if (object.userData.inChest && dropInChest) {
                scene.stopAnimation(object);
                animationInChest = AnimationMoveInChest.call(object, new BABYLON.Vector3(object.position.x, -25, -20), 60);
                object.userData.inChest = false;
                animationInChest.onAnimationEnd = function () {
                    animationInChest.animationStarted = false;
                    object.userData.endInChestAnimation = true;
                }
        } else if (object.userData.inFreeSpin && moveFreeSpin) {
            scene.stopAnimation(object);
            object.rotation = BABYLON.Vector3.Zero();
            object._children.map(v => {
                if (v.userData) {
                    v.setPivotMatrix(BABYLON.Matrix.Translation(0,0,0));
                    v.position = BABYLON.Vector3.Zero();
                }
            });

            var animationEmissive = AnimationEmissiveCompass.call(pointsFreeSpinObject.freeSpin.compass.cup, 15);
            animationEmissive.onAnimationEnd = function () {
                animationEmissive.animationStarted = false;
            };

            animationFreeSpin = AnimationFreeSpin.call(object, pointsFreeSpinObject, new BABYLON.Vector3(0, 2, 10), 30);
            object.userData.inFreeSpin = false;
            animationFreeSpin.onAnimationEnd = function () {
                startAnimationCharacter = true;
                animationFreeSpin.animationStarted = false;
                setTimeout(() => {
                    animationInChestPartMap = AnimationMoveInChestPartMap.call(object, new BABYLON.Vector3(20, 20, object.position.z+20), 60);
                    animationInChestPartMap.onAnimationEnd = function () {
                        animationInChestPartMap.animationStarted = false;
                        object.userData.endInChestAnimation = true;
                    }
                }, 700);
                /*animationInChestPartMap = AnimationMoveInChestPartMap.call(object, new BABYLON.Vector3(object.position.x, -25, -20), 60);
                animationInChestPartMap.onAnimationEnd = function () {
                    animationInChestPartMap.animationStarted = false;

                }*/
            }
        }
    });
}

DropJewel.prototype.constructor = DropJewel;

DropJewel.prototype.setIndexSymb = function(index) {

};