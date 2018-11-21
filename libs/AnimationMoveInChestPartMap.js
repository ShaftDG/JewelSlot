function AnimationMoveInChestPartMap(targetBackward, duration)
{
    var object = this;

    var signX = 1;
    var signY = 1;

    var partMap;
    if (scene.getMeshByName( object.name + "." + "map_1" ).visibility) {
        partMap = scene.getMeshByName( object.name + "." + "map_1" );
        signX = -1;
    } else  if (scene.getMeshByName( object.name + "." + "map_2" ).visibility) {
        partMap = scene.getMeshByName( object.name + "." + "map_2" );
    } else  if (scene.getMeshByName( object.name + "." + "map_3" ).visibility) {
        partMap = scene.getMeshByName( object.name + "." + "map_3" );
        signX = 0;
        signY = -1;
    }

    //Create a Vector3 animationBackward at 30 FPS
    var animationBackward = new BABYLON.Animation("animationBackward", "position", 1.5, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keysTorus = [];

    var cubicBezierVectors = BABYLON.Curve3.CreateQuadraticBezier(
        object.position,
        new BABYLON.Vector3(object.position.x + 10*signX, object.position.y + 10*signY, object.position.z),
        new BABYLON.Vector3(object.position.x + targetBackward.x * signX,
            object.position.y + targetBackward.y * signY,
            targetBackward.z),
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
    object.animations = [];
    object.animations.push(animationBackward);

    //Finally, launch animations on object, from key 0 to key 120 with loop activated

    var anim = scene.beginAnimation(object, 0, 60, false, duration);
//////////////////////////////////////////////

    var animationScalingPartMap = new BABYLON.Animation("animationScalingPartMap", "scaling", 1.0, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // the object destination position
    var nextPos = new BABYLON.Vector3(1,1,1);

    // Animation keys
    var keysTorus = [];
    keysTorus.push({ frame: 0, value: partMap.scaling });
    keysTorus.push({ frame: 60, value: nextPos });
    animationScalingPartMap.setKeys(keysTorus);

    var easingFunction = new BABYLON.CubicEase();

    // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

    // Adding easing function to my animation
    animationScalingPartMap.setEasingFunction(easingFunction);

    partMap.animations = [];
    partMap.animations.push(animationScalingPartMap);

    scene.beginAnimation(partMap, 0, 60, false, duration);

    return anim;
};