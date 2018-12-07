function AnimationRotationSymbol(duration)
{
    var object = this;

    var animationRotation = new BABYLON.Animation("animationRotation", "rotation", 1.0, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // the object destination position
    var nextPos = object.rotation.add(new BABYLON.Vector3(
        /*(Math.random() < 0.5 ? -1 : 1) * Math.PI*2*/0,
        (Math.random() < 0.5 ? -1 : 1) * Math.PI*4,
        /*(Math.random() < 0.5 ? -1 : 1) * Math.PI*2*/0
    ));

    // Animation keys
    var keysTorus = [];
    keysTorus.push({ frame: 0, value: object.rotation });
    keysTorus.push({ frame: 120, value: nextPos });
    animationRotation.setKeys(keysTorus);

     var easingFunction = new BABYLON.ElasticEase(3, 10);

     // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
     easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

     // Adding easing function to my animation
     animationRotation.setEasingFunction(easingFunction);
//////////////////////////////////////////////

    object.animations.push(animationRotation);

    //Finally, launch animations on object, from key 0 to key 120 with loop activated
    var anim = scene.beginAnimation(object, 0, 120, true, duration);

    return anim;
};