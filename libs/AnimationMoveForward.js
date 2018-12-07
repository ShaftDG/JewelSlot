function AnimationMoveForward(targetForward, duration)
{
    var object = this;
  
    //Create a Vector3 animationForward at 30 FPS
    var animationForward = new BABYLON.Animation("animationForward", "position", 1.25, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keysTorus = [];
    keysTorus.push({ frame: 0, value: object.position });
    keysTorus.push({ frame: 60, value: targetForward });
    keysTorus.push({ frame: 120, value: targetForward });
    keysTorus.push({ frame: 180, value: new BABYLON.Vector3(object.position.x, object.position.y, object.position.z+1) });
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
//////////////////////////////////////////////
    var animationRotation = new BABYLON.Animation("animationRotation", "rotation", Math.random() * (0.75 - 0.5) + 0.5, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // the object destination position
    var nextPos = object.rotation.add(new BABYLON.Vector3(
        /*(Math.random() < 0.5 ? -1 : 1) * Math.PI*2*/0,
        (Math.random() < 0.5 ? -1 : 1) * Math.PI*2,
        /*(Math.random() < 0.5 ? -1 : 1) * Math.PI*2*/0
    ));

    // Animation keys
    var keysTorus = [];
    keysTorus.push({ frame: 0, value: object.rotation });
    keysTorus.push({ frame: 60, value: nextPos });
    animationRotation.setKeys(keysTorus);

    var easingFunction = new BABYLON.ElasticEase(3, 10);

    // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

    // Adding easing function to my animation
    animationRotation.setEasingFunction(easingFunction);
//////////////////////////////////////////////

    object.animations = [];
    object.animations.push(animationForward);
   // object.animations.push(animationRotation);

    var eventStartElectric = new BABYLON.AnimationEvent(0, function() {
        object._children.map(v => {
            if (v.visibility) {
                if (v.particleSystem.electric) {
                    v.particleSystem.electric.start();
                } else {
                    v.particleSystem.flame.start();
                    v.particleSystem.origin.start();
                }
            }
        });
    }, true);
// Attach your event to your animation
    animationForward.addEvent(eventStartElectric);

    var eventStopElectric = new BABYLON.AnimationEvent(120, function() {
        object._children.map(v => {
            if (v.particleSystem.electric) {
                v.particleSystem.electric.reset();
                v.particleSystem.electric.stop();
            } else {
                v.particleSystem.flame.reset();
                v.particleSystem.flame.stop();
                v.particleSystem.origin.reset();
                v.particleSystem.origin.stop();
            }
        });
    }, true);
// Attach your event to your animation
    animationForward.addEvent(eventStopElectric);

    //Finally, launch animations on object, from key 0 to key 120 with loop activated
    AnimationRotationSymbol.call(object, 120);
    var anim = scene.beginAnimation(object, 0, 180, false, duration);

    return anim;
};