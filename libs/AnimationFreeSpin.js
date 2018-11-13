function AnimationFreeSpin(targetForward, duration)
{
    var object = this;

    //Create a Vector3 animationForward at 30 FPS
    var animationForward = new BABYLON.Animation("animationForward", "position", 1.25, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // Animation keys
    var keysTorus = [];
    keysTorus.push({ frame: 0, value: object.position });
    keysTorus.push({ frame: 180, value: targetForward });
    // keysTorus.push({ frame: 120, value: targetForward });
    // keysTorus.push({ frame: 180, value: object.position });
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
    var easingFunction = new BABYLON.ElasticEase(4, 15);

    // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

    // Adding easing function to my animationForward
    animationForward.setEasingFunction(easingFunction);


    object.animations = [];
    object.animations.push(animationForward);

    //Finally, launch animations on object, from key 0 to key 120 with loop activated
    var anim = scene.beginAnimation(object, 0, 180, false, duration);


    var partMap;
    if (scene.getMeshByName( object.name + "." + "map_1" ).visibility) {
        partMap = scene.getMeshByName( object.name + "." + "map_1" );
    } else  if (scene.getMeshByName( object.name + "." + "map_2" ).visibility) {
        partMap = scene.getMeshByName( object.name + "." + "map_2" );
    } else  if (scene.getMeshByName( object.name + "." + "map_3" ).visibility) {
        partMap = scene.getMeshByName( object.name + "." + "map_3" );
    }

    var animationRotationPartMap = new BABYLON.Animation("animationRotationPartMap", "rotation", 1.0, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

   // the object destination position
   var nextPos = new BABYLON.Vector3(Math.PI*2,0,Math.PI*2);

   // Animation keys
   var keysTorus = [];
   keysTorus.push({ frame: 0, value: partMap.rotation });
   keysTorus.push({ frame: 60, value: nextPos });
   animationRotationPartMap.setKeys(keysTorus);

   var easingFunction = new BABYLON.CubicEase();

   // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
   easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

   // Adding easing function to my animation
   animationRotationPartMap.setEasingFunction(easingFunction);

    var animationPositionPartMap = new BABYLON.Animation("animationPositionPartMap", "position", 1.0, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // the object destination position
    var nextPos = new BABYLON.Vector3(0,0,0);

    // Animation keys
    var keysTorus = [];
    keysTorus.push({ frame: 0, value: partMap.position });
    keysTorus.push({ frame: 60, value: nextPos });
    animationPositionPartMap.setKeys(keysTorus);

    var easingFunction = new BABYLON.CubicEase();

    // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);

    // Adding easing function to my animation
    animationPositionPartMap.setEasingFunction(easingFunction);


    var animationScalingPartMap = new BABYLON.Animation("animationScalingPartMap", "scaling", 1.0, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // the object destination position
    var nextPos = new BABYLON.Vector3(2.5,2.5,2.5);

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

    var animationEmissive = new BABYLON.Animation("animationEmissive", "material.emissiveColor", 1.0, BABYLON.Animation.ANIMATIONTYPE_COLOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

    // the object destination position
    var nextPos = new BABYLON.Color3(2, 2, 2);

    // Animation keys
    var keysTorus = [];
    keysTorus.push({ frame: 50, value: new BABYLON.Color3(0, 0, 0) });
    keysTorus.push({ frame: 70, value: nextPos });
    keysTorus.push({ frame: 80, value: new BABYLON.Color3(0, 0, 0) });
    animationEmissive.setKeys(keysTorus);

    var easingFunction = new BABYLON.CubicEase();

    // For each easing function, you can choose beetween EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

    // Adding easing function to my animation
    animationEmissive.setEasingFunction(easingFunction);

    partMap.animations = [];
    partMap.animations.push(animationRotationPartMap);
    partMap.animations.push(animationPositionPartMap);
    partMap.animations.push(animationScalingPartMap);
    partMap.animations.push(animationEmissive);

 /*   var hl = new BABYLON.HighlightLayer("hl", scene);
    hl.blurHorizontalSize = 0;
    hl.blurVerticalSize = 0;
    var eventStopPositionPartMap = new BABYLON.AnimationEvent(45, function() {
        hl.addMesh(partMap, new BABYLON.Color3.FromHexString("#fde300"));
    }, true);

    animationPositionPartMap.addEvent(eventStopPositionPartMap);

    for (var i = 1; i <= 10; i++) {
        var event = new BABYLON.AnimationEvent(45+i, function() {
            hl.blurHorizontalSize += 0.3;
            hl.blurVerticalSize += 0.3;
        }, true);

        animationPositionPartMap.addEvent(event);
    }

    for (var i = 1; i <= 5; i++) {
        var event = new BABYLON.AnimationEvent(55+i, function() {
            hl.blurHorizontalSize -= 0.6;
            hl.blurVerticalSize -= 0.6;
        }, true);

        animationPositionPartMap.addEvent(event);

    }

    var eventStopPositionPartMapEnd = new BABYLON.AnimationEvent(60, function() {
        hl.removeMesh(partMap);
    }, true);

    animationPositionPartMap.addEvent(eventStopPositionPartMapEnd);*/

    scene.beginAnimation(partMap, 0, 80, false, duration);

    return anim;
};