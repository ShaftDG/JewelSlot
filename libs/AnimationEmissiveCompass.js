function AnimationEmissiveCompass(duration)
{
    var object = this;

    var animationEmissive = new BABYLON.Animation("animationEmissive", "material.emissiveColor", 1.0, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // the object destination position
    var nextPos = new BABYLON.Color3(2, 2, 2);

    // Animation keys
    var keysTorus = [];
    keysTorus.push({ frame: 0, value: new BABYLON.Color3(0, 0, 0) });
    keysTorus.push({ frame: 15, value: nextPos });
    keysTorus.push({ frame: 30, value: new BABYLON.Color3(0, 0, 0) });
    animationEmissive.setKeys(keysTorus);

    var easingFunction = new BABYLON.CubicEase();

    // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    // Adding easing function to my animation
    animationEmissive.setEasingFunction(easingFunction);

    object.animations = [];
    object.animations.push(animationEmissive);

    var anim = scene.beginAnimation(object, 0, 30, false, duration);

    return anim;
};