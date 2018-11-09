function ElectricField(emitter) {
    /*   var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, "electric",
           {
               needAlphaBlending: true,
               attributes: ["position", "normal", "uv"],
               uniforms: ["worldViewProjection", "time"]
           });
       shaderMaterial.backFaceCulling = false;
       shaderMaterial.alpha = 0.9999;
       shaderMaterial.alphamode = BABYLON.Engine.ALPHA_MULTIPLY;
        var box = BABYLON.Mesh.CreateBox("Sphere0", 0.1, scene);
         box.material = shaderMaterial;

       var time = Math.random() * 50;
       var order = 0.025;

       shaderMaterial.onBind = function () {
           shaderMaterial.setFloat("time", time);

           time += order;

           if (time > 100 || time < 0) {
               order *= -1;
           }
       };*/

// Effect
    var effect = engine.createEffectForParticles("electric", ["time"]);
    var time = Math.random() * (50-20) + 20;
    var order = 0.04;
    effect.onBind = function () {
        effect.setFloat("time", time);
        time += order;
        if (time > 50 || time < 20) {
            order *= -1;
        }
    };

    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("particles", 250, scene, effect);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene, true,
        false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE);

   // particleSystem.addSizeGradient(0.4, 0.5, 0.3);
  //  particleSystem.addSizeGradient(5.0, 3.0, 4.0);
    // Where the particles come from
    particleSystem.emitter = emitter; // the starting object, the emitter
    var emitterType = new BABYLON.SphereParticleEmitter();
    emitterType.radius = 2.15;
    emitterType.radiusRange = 0;
    particleSystem.particleEmitterType = emitterType;

    particleSystem.createCylinderEmitter(2.15,3,0,0);
    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(2.0, 0.8, 0.2, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 2.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.5;
    particleSystem.maxSize = 3.0;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.1;
    particleSystem.maxLifeTime = 0.65;

    // Color gradient over life
    // particleSystem.addColorGradient(0, new BABYLON.Color4(1, 1, 1, 0));
    // particleSystem.addColorGradient(0.5, new BABYLON.Color4(1, 1, 1, 70/255));
    // particleSystem.addColorGradient(1.0, new BABYLON.Color4(1, 1, 1, 0));

    // Emission rate
    particleSystem.emitRate = 100;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0.75);

    // The initial rotation angle
    particleSystem.minInitialRotation = 0;
    particleSystem.maxInitialRotation = Math.PI;

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI / 5;

    // Speed
    particleSystem.minEmitPower = 0;
    particleSystem.maxEmitPower = 1.0;
    particleSystem.updateSpeed = 1/60;

    // particleSystem.addVelocityGradient(0, 3, 5);
    // particleSystem.addVelocityGradient(1.0, -5, -10);

    // No billboard
    particleSystem.isBillboardBased = false;

    // Start the particle system
  //  particleSystem.start();

    //change start position function
    var walkPS = 0;
    var meshModelVertices = emitter.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    particleSystem.startPositionFunction = function (worldMatrix, positionToUpdate, particle) {

        var randX = meshModelVertices[walkPS]*0.85;
        var randY = meshModelVertices[walkPS + 1]*0.85;
        var randZ = meshModelVertices[walkPS + 2]*0.85;

        BABYLON.Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);

        walkPS += 3;
        if (walkPS > meshModelVertices.length) {
            walkPS = 0;
        }
    };

///////////////////////////////// flame particle
    var particleSystemFire = new BABYLON.ParticleSystem("particles", 100, scene, null, true);

    //Texture of each particle
    particleSystemFire.particleTexture = new BABYLON.Texture("textures/flare2.png", scene, true,
        false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE);

    // particleSystemFire.addSizeGradient(0.4, 0.5, 0.3);
    //  particleSystemFire.addSizeGradient(5.0, 3.0, 4.0);
    // Where the particles come from
    var fireEmitter = new BABYLON.TransformNode("");
    fireEmitter.parent = emitter;
    fireEmitter.position.y -= 0.5;
    fireEmitter.position.z -= 1.0;
    particleSystemFire.emitter = fireEmitter; // the starting object, the emitter
    var emitterType = new BABYLON.SphereParticleEmitter();
    emitterType.radius = 3.0;
    particleSystemFire.particleEmitterType = emitterType;

    particleSystemFire.createCylinderEmitter(2.1,4.0,0,0);

    particleSystemFire.startSpriteCellID = 0;
    particleSystemFire.endSpriteCellID = 31;
    particleSystemFire.spriteCellHeight = 256;
    particleSystemFire.spriteCellWidth = 128;
    particleSystemFire.spriteCellChangeSpeed = 2.5;

    particleSystemFire.minScaleX = 1.0;
    particleSystemFire.minScaleY = 2.0;
    particleSystemFire.maxScaleX = 1.0;
    particleSystemFire.maxScaleY = 2.0;

    particleSystemFire.addSizeGradient(0.1, 0.1, 0.1);
    particleSystemFire.addSizeGradient(3.5, 3.5, 3.5);

    particleSystemFire.translationPivot = new BABYLON.Vector2(0, -0.5);

    // Colors of all particles
    particleSystemFire.addColorGradient(1.0, new BABYLON.Color4.FromHexString("#fdcf58ff"));
    particleSystemFire.addColorGradient(0.75, new BABYLON.Color4.FromHexString("#f27d0cff"));
    particleSystemFire.addColorGradient(0.5, new BABYLON.Color4.FromHexString("#f07f13ff"));
    particleSystemFire.addColorGradient(0.25, new BABYLON.Color4.FromHexString("#757676ff"));
    //
    particleSystemFire.color1 = new BABYLON.Color4.FromHexString("#fdcf58ff");
    particleSystemFire.color2 = new BABYLON.Color4.FromHexString("#f27d0cff");
    particleSystemFire.colorDead = new BABYLON.Color4.FromHexString("#757676ff");

    // Life time of each particle (random between...)
    particleSystemFire.minLifeTime = 0.5;
    particleSystemFire.maxLifeTime = 0.75;

    // // Defines the color ramp to apply
    particleSystemFire.addRampGradient(0.0, new BABYLON.Color3(1, 1, 1));
    particleSystemFire.addRampGradient(0.09, new BABYLON.Color3(209/255, 204/255, 15/255));
    particleSystemFire.addRampGradient(0.18, new BABYLON.Color3(221/255, 120/255, 14/255));
    particleSystemFire.addRampGradient(0.47, new BABYLON.Color3(209/255, 175/255, 15/255));
    particleSystemFire.addRampGradient(0.50, new BABYLON.Color3(200/255, 150/255, 18/255));
    particleSystemFire.addRampGradient(0.47, new BABYLON.Color3(115/255, 22/255, 15/255));
    particleSystemFire.useRampGradients = true;

    // Defines the color remapper over time
    // particleSystemFire.addColorRemapGradient(0, 0, 0.1);
    // particleSystemFire.addColorRemapGradient(0.2, 0.1, 0.8);
    // particleSystemFire.addColorRemapGradient(0.3, 0.2, 0.85);
    // particleSystemFire.addColorRemapGradient(0.35, 0.2, 0.85);
    // particleSystemFire.addColorRemapGradient(0.4, 0.3, 0.9);
    // particleSystemFire.addColorRemapGradient(0.75, 0.65, 1.0);
    // particleSystemFire.addColorRemapGradient(1.0, 0.95, 1.0);

    // Emission rate
    particleSystemFire.emitRate = 50;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystemFire.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    // Set the gravity of all particles
    particleSystemFire.gravity = new BABYLON.Vector3(0, 1.0, 0);

    // Angular speed, in radians
    particleSystemFire.minAngularSpeed = 0;
    particleSystemFire.maxAngularSpeed = Math.PI/10;

    // Speed
    particleSystemFire.minEmitPower = 0;
    particleSystemFire.maxEmitPower = 0;
    particleSystemFire.updateSpeed = 0.01;

   return {electric: particleSystem, fire: particleSystemFire};
}