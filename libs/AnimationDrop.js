function AnimationDrop(target, targetRotation, duration)
{
    var object = this;
     /*  var tween = new TWEEN.Tween (positionObject)
        .to ( { x: target.x,
                y: target.y,
                z: target.z
            },
            duration )
        //.easing (TWEEN.Easing.Back.Out)
        .easing (TWEEN.Easing.Elastic.Out)
        .onUpdate (
            function() {
                object.position.y = positionObject.y;
                object.position.y = positionObject.y;
                object.position.z = positionObject.z;
            })
        .onComplete(
            function() {
                object.position.y = positionObject.y;
                object.position.y = positionObject.y;
                object.position.z = positionObject.z;
            });
    return tween;*/
    //Create a Vector3 animation at 30 FPS
    var animation = new BABYLON.Animation("easingAnimation", "position", 1, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // the object destination position
    var nextPos = target;

    // Animation keys
    var keysTorus = [];
    keysTorus.push({ frame: 0, value: object.position });
    keysTorus.push({ frame: 60, value: nextPos });
    animation.setKeys(keysTorus);

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
    // And if you want a total control, you can use a Bezier Curve animation
    //12.   BezierCurveEase(x1, y1, x2, y2)
    var easingFunction = new BABYLON.BounceEase(50, 5);

    // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

    // Adding easing function to my animation
    animation.setEasingFunction(easingFunction);
//////////////////////////////////////////////
    var animationRotation = new BABYLON.Animation("torusEasingAnimation", "rotation", 1, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // the object destination position
    var nextPos = object.rotation.add(targetRotation);

    // Animation keys
    var keysTorus = [];
    keysTorus.push({ frame: 20, value: object.rotation });
    keysTorus.push({ frame: 60, value: nextPos });
    animationRotation.setKeys(keysTorus);

    var easingFunction = new BABYLON.ElasticEase(2, 5);

    // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

    // Adding easing function to my animation
    animationRotation.setEasingFunction(easingFunction);
//////////////////////////////////////////////
    // Adding animation to my object animations collection
    object.animations = [];
    object.animations.push(animation);
    object.animations.push(animationRotation);

    //Finally, launch animations on object, from key 0 to key 120 with loop activated

    var anim = scene.beginAnimation(object, 20, 60, false, duration);
    return anim;
};