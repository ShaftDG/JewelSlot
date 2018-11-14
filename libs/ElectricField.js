function ElectricField(emitter) {

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
    var particleSystem = new BABYLON.ParticleSystem("particles", 350, scene, effect);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene, true,
        false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE);

    // Where the particles come from
    particleSystem.emitter = emitter; // the starting object, the emitter

    // Size of each particle (random between...
    particleSystem.minSize = 0.5;
    particleSystem.maxSize = 3.0;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.1;
    particleSystem.maxLifeTime = 0.4;

    // Emission rate
    particleSystem.emitRate = 350;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

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
    // particleSystem.renderingGroupId = 1;
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