function AnimationPointsFreeSpin(pointsFreeSpinObject, duration)
{
    var object = this;

    var targetBackward = pointsFreeSpinObject.freeSpin.anchor.position.clone();
    //Create a Vector3 animationBackward at 30 FPS
    var animationBackward = new BABYLON.Animation("animationBackward", "position", 1.5, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keysTorus = [];

    var x = Math.random() * 3 + targetBackward.x;

    var cubicBezierVectors = BABYLON.Curve3.CreateQuadraticBezier(
        object.position,
        new BABYLON.Vector3((object.position.x + x)/2, object.position.y-5, object.position.z+30),
        targetBackward,
        60);
    var path = cubicBezierVectors.getPoints();
    path.map((value, index) => {
        keysTorus.push({frame: index, value: value});
    });

    animationBackward.setKeys(keysTorus);

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
    // And if you want a total control, you can use a Bezier Curve animationBackward
    //12.   BezierCurveEase(x1, y1, x2, y2)
    var easingFunction = new BABYLON.QuinticEase();

    // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

    // Adding easing function to my animationBackward
    animationBackward.setEasingFunction(easingFunction);
//////////////////////////////////////////////
    var animationRotation = new BABYLON.Animation("animationRotation", "rotation", Math.random() * (0.75 - 0.5) + 0.5, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // the object destination position
    var nextPos = object.rotation.add(new BABYLON.Vector3(-Math.PI*10, (Math.random() < 0.5 ? -1 : 1) * Math.PI, (Math.random() < 0.5 ? -1 : 1) * Math.PI));

    // Animation keys
    var keysTorus = [];
    keysTorus.push({ frame: 0, value: object.rotation });
    keysTorus.push({ frame: 30, value: nextPos });
    animationRotation.setKeys(keysTorus);

    var easingFunction = new BABYLON.PowerEase(0.1);

    // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEIN);

    // Adding easing function to my animation
    animationRotation.setEasingFunction(easingFunction);
//////////////////////////////////////////////

    object.animations = [];
    object.animations.push(animationBackward);
    object.animations.push(animationRotation);

    var eventSetVisible = new BABYLON.AnimationEvent(60, function() {
        object.visibility = false;
        pointsFreeSpinObject.freeSpin.setTextForAnimation(genCombination.numFreeSpin.toString());

        pointsFreeSpinObject.freeSpin.compass.rotation = BABYLON.Vector3.Zero();
        OpenChest.call(pointsFreeSpinObject.freeSpin.compass, new BABYLON.Vector3(0,0,Math.PI*10), 15);

        pointsFreeSpinObject.box.userData.particles.stop();
    }, true);
    // Attach your event to your animation
    animationBackward.addEvent(eventSetVisible);

    //Finally, launch animations on object, from key 0 to key 120 with loop activated
    var anim = scene.beginAnimation(object, 0, 60, false, duration);
    return anim;
};