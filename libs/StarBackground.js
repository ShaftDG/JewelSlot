function StarBackground(emitter) {

    // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("particles", 20, scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("textures/spark.png", scene);

    var sparkEmitter = new BABYLON.TransformNode("");
    sparkEmitter.parent = emitter;
    sparkEmitter.position = new BABYLON.Vector3(0,0,0).subtract(emitter.position);
    sparkEmitter.position.z -= 1.0;
    // Where the particles come from
    particleSystem.emitter = sparkEmitter; // the starting object, the emitter

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 4.0;
    particleSystem.maxSize = 10.0;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 1000;
    particleSystem.maxLifeTime = 1000;

    // Emission rate
    particleSystem.emitRate = 15;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

    // Direction of each particle after it has been emitted
    //particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
   // particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);

    // Angular speed, in radians
    particleSystem.minInitialRotation = 0;
    particleSystem.maxInitialRotation = Math.PI;
    particleSystem.minAngularSpeed = -0.1;
    particleSystem.maxAngularSpeed = 0.1;

    // Speed
    particleSystem.minEmitPower = 0;
    particleSystem.maxEmitPower = 0;
    particleSystem.updateSpeed = 0.1;

    // No billboard
    // particleSystemSpark.isBillboardBased = false;

    
    return particleSystem;
}