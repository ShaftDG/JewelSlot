function AnimationMoveForward(targetForward, duration)
{
    var object = this;
  
    //Create a Vector3 animationForward at 30 FPS
    var animationForward = new BABYLON.Animation("animationForward", "position", 1.25, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keysTorus = [];
    keysTorus.push({ frame: 0, value: object.position });
    keysTorus.push({ frame: 60, value: targetForward });
  //  keysTorus.push({ frame: 60, value: targetForward });
    keysTorus.push({ frame: 120, value: object.position });
    animationForward.setKeys(keysTorus);

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
    // And if you want a total control, you can use a Bezier Curve animationForward
    //12.   BezierCurveEase(x1, y1, x2, y2)
    var easingFunction = new BABYLON.ElasticEase(3, 10);

    // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

    // Adding easing function to my animationForward
    animationForward.setEasingFunction(easingFunction);

    object.animations = [];
    object.animations.push(animationForward);

    //Finally, launch animations on object, from key 0 to key 120 with loop activated

    var anim = scene.beginAnimation(object, 0, 120, false, duration);
    return anim;
};