function AnimationScalingDown(targetForward, duration)
{
    var object = this;

    //Create a Vector3 animationScaling at 30 FPS
    var animationScaling = new BABYLON.Animation("animationScaling", "scaling", 1.25, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keysTorus = [];
    keysTorus.push({ frame: 0, value: object.scaling });
    keysTorus.push({ frame: 30, value: targetForward });
    // keysTorus.push({ frame: 120, value: targetForward });
    // keysTorus.push({ frame: 180, value: object.position });
    animationScaling.setKeys(keysTorus);

    // Adding an easing function
    // You can use :
    //1.	CircleEase()
    //2.	BackEase(amplitude)
    //3.	BounceEase(bounces, bounciness)
    //4.	CubicEase()
    //5.	ElasticEase(oscillations, springiness)
    //6.	ExponentialEase(exponent)
    //7.	PowerEase(power)
    //8.	QuadraticEase()
    //9.	QuarticEase()
    //10.	QuinticEase()
    //11.	SineEase()
    // And if you want a total control, you can use a Bezier Curve animationScaling
    //12.   BezierCurveEase(x1, y1, x2, y2)
    var easingFunction = new BABYLON.CubicEase();

    // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

    // Adding easing function to my animationScaling
    animationScaling.setEasingFunction(easingFunction);

    object.animations = [];
    object.animations.push(animationScaling);

    //Finally, launch animations on object, from key 0 to key 120 with loop activated
    var anim = scene.beginAnimation(object, 0, 30, false, duration);

    return anim;
};