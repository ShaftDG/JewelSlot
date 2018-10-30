function OpenChest(targetRotation, duration)
{
    var object = this;

        var animationRotation = new BABYLON.Animation("torusEasingAnimation", "rotation", 1, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        // the object destination position
        var nextPos = targetRotation;

        // Animation keys
        var keysTorus = [];
        keysTorus.push({frame: 0, value: new BABYLON.Vector3(Math.PI/2,0,0)});
        keysTorus.push({frame: 60, value: nextPos});
        animationRotation.setKeys(keysTorus);

        var easingFunction = new BABYLON.CubicEase();

        // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
        easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

        // Adding easing function to my animation
        animationRotation.setEasingFunction(easingFunction);
//////////////////////////////////////////////
        // Adding animation to my object animations collection
        object.animations.push(animationRotation);

        //Finally, launch animations on object, from key 0 to key 120 with loop activated

        var anim = scene.beginAnimation(object, 0, 60, false, duration);
        return anim;
};