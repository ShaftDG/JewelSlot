function DropJewel(scene, pushButton, positionDestinationDown, speedMove) {
    var object = this;

    var durationPosition = 60;
    object.userData.speedMove = Math.random() * (1.5 - 1.0) + 1.0;

    var animation, animationInChest, animationFreeSpin, animationScaling;

    scene.registerBeforeRender(function () {
        if (object.userData.startDrop) {
                if (!object.userData.flagStartTween) {
                    animation = AnimationDrop.call(object, positionDestinationDown, object.userData.rotateDestination, durationPosition);
                    object.userData.flagStartTween = true;
                } else {
                    animation.onAnimationEnd = function () {
                        animation.animationStarted = false;
                        object.userData.startDrop = false;
                        endDrop = true;
                    }
                }
        } else if (object.userData.scalingDown) {
                animationScaling = AnimationScalingDown.call(object, new BABYLON.Vector3(0,0,0), 60);
                object.userData.scalingDown = false;
                animationScaling.onAnimationEnd = function () {
                animationScaling.animationStarted = false;
                    object.scaling = new BABYLON.Vector3(1,1,1);
                    object.position.y = 20;
                    object.userData.endScalingAnimation = true;
                    endScaling = true;
                }
        } else if (object.userData.inChest && dropInChest) {
                animationInChest = AnimationMoveInChest.call(object, new BABYLON.Vector3(object.position.x, -25, -20), 60);
                object.userData.inChest = false;
                animationInChest.onAnimationEnd = function () {
                    animationInChest.animationStarted = false;
                    object.userData.endInChestAnimation = true;
                }
        } else if (object.userData.inFreeSpin && moveFreeSpin) {
            animationFreeSpin = AnimationFreeSpin.call(object, new BABYLON.Vector3(0, 2, 10), 30);
            object.userData.inFreeSpin = false;
            animationFreeSpin.onAnimationEnd = function () {
                animationFreeSpin.animationStarted = false;
                object.userData.endInChestAnimation = true;
            }
        }
    });
}

DropJewel.prototype.constructor = DropJewel;

DropJewel.prototype.setIndexSymb = function(index) {

};