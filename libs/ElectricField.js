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
    var effect = engine.createEffectForParticles("electric", ["worldViewProjection", "time"]);
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
    var particleSystem = new BABYLON.ParticleSystem("particles", 200, scene, effect);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene, true,
        false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE);

  /*  particleSystem.startSpriteCellID = 0;
    particleSystem.endSpriteCellID = 31;
    particleSystem.spriteCellHeight = 256;
    particleSystem.spriteCellWidth = 128;
    particleSystem.spriteCellChangeSpeed = 4;

    particleSystem.minScaleX = 0.5;
    particleSystem.minScaleY = 1.0;
    particleSystem.maxScaleX = 0.5;
    particleSystem.maxScaleY = 1.0;*/

   // particleSystem.addSizeGradient(0.4, 0.5, 0.3);
  //  particleSystem.addSizeGradient(5.0, 3.0, 4.0);
    // Where the particles come from
    particleSystem.emitter = emitter; // the starting object, the emitter
    var emitterType = new BABYLON.SphereParticleEmitter();
    emitterType.radius = 1.5;
    emitterType.radiusRange = 0;
    particleSystem.particleEmitterType = emitterType;

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(2.0, 0.8, 0.2, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 2.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.5;
    particleSystem.maxSize = 4.0;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.1;
    particleSystem.maxLifeTime = 0.75;

    // Color gradient over life
    // particleSystem.addColorGradient(0, new BABYLON.Color4(1, 1, 1, 0));
    // particleSystem.addColorGradient(0.5, new BABYLON.Color4(1, 1, 1, 70/255));
    // particleSystem.addColorGradient(1.0, new BABYLON.Color4(1, 1, 1, 0));

    // Emission rate
    particleSystem.emitRate = 150;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0.5);

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

    particleSystem.addVelocityGradient(0, 3, 5);
    particleSystem.addVelocityGradient(1.0, -5, -10);

    // No billboard
    particleSystem.isBillboardBased = false;

    // Start the particle system
  //  particleSystem.start();

    //change start position function
    var walkPS = 0;
    var meshModelVertices = emitter.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    particleSystem.startPositionFunction = function (worldMatrix, positionToUpdate, particle) {

        var randX = meshModelVertices[walkPS];
        var randY = meshModelVertices[walkPS + 1];
        var randZ = meshModelVertices[walkPS + 2];

        BABYLON.Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);

        walkPS += 3;
        if (walkPS > meshModelVertices.length) {
            walkPS = 0;
        }
    };
   return particleSystem;
}