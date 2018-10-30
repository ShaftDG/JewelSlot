function SetupTweenRotation(rotationObject, target, duration)
{
    var object = this;
   /* var angleStop = 0;
    var tween = new TWEEN.Tween (rotationObject)
        .to ( { x: target.x,
                y: target.y,
                z: target.z
            },
            duration )
        //.easing (TWEEN.Easing.Back.Out)
        .easing (TWEEN.Easing.Elastic.Out)
        .onUpdate (
            function() {
                object.rotationQuaternion = BABYLON.Quaternion.Identity();
                object.rotation.x = rotationObject.x;
                object.rotation.y = rotationObject.y;
                object.rotation.z = rotationObject.z;
                // console.log(object.rotation);
            })
        .onComplete(
            function() {
             //   object.rotationQuaternion = BABYLON.Quaternion.Identity();
             //   object.rotation = BABYLON.Vector3.Zero();
                // console.log("!!!", object.rotation);
            });
    return tween;*/
    //Create a Vector3 animation at 30 FPS
    var animationTorus = new BABYLON.Animation("torusEasingAnimation", "rotation", 70, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // the object destination position
    var nextPos = target;

    // Animation keys
    var keysTorus = [];
    keysTorus.push({ frame: 10, value: object.rotation });
    keysTorus.push({ frame: 60, value: nextPos });
    animationTorus.setKeys(keysTorus);

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
    var easingFunction = new BABYLON.ElasticEase(5, 0.1);

    // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

    // Adding easing function to my animation
    animationTorus.setEasingFunction(easingFunction);

    // Adding animation to my object animations collection
    object.animations.push(animationTorus);

    //Finally, launch animations on object, from key 0 to key 120 with loop activated

    var anim = scene.beginAnimation(object, 30, 60, false, 70, );
    return anim;
};