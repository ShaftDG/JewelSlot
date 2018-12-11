function FireBlast(emitter)
{
    // Create default particle systems
    var fireBlast = BABYLON.ParticleHelper.CreateDefault(emitter.position.clone(), 250);

    // Emitter
    fireBlast.emitter = emitter;
    // var fireBlastHemisphere = fireBlast.createHemisphericEmitter(.2, 0);

    // Set emission rate
    fireBlast.emitRate = 5000;

    // Start size
    fireBlast.minSize = 0.1;
    fireBlast.maxSize = 1;

    // Lifetime
    fireBlast.minLifeTime = 10;
    fireBlast.maxLifeTime = 20;

    // Emission power
    fireBlast.minEmitPower = 120;
    fireBlast.maxEmitPower = 240;

    // Limit velocity over time
    fireBlast.addLimitVelocityGradient(0, 40);
    fireBlast.addLimitVelocityGradient(0.120, 12.983);
    fireBlast.addLimitVelocityGradient(0.445, 1.780);
    fireBlast.addLimitVelocityGradient(0.691, 0.502);
    fireBlast.addLimitVelocityGradient(0.930, 0.05);
    fireBlast.addLimitVelocityGradient(1.0, 0);

    fireBlast.limitVelocityDamping = 0.95;

    // Start rotation
    // fireBlast.minInitialRotation = -Math.PI / 2;
    // fireBlast.maxInitialRotation = Math.PI / 2;

    // Texture
    fireBlast.particleTexture = new BABYLON.Texture("textures/spark.png", scene);
    fireBlast.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    fireBlast.color1 = new BABYLON.Color4(1.4, 1.6, 2.0, 1.0);
    fireBlast.color2 = new BABYLON.Color4(0.4, 1.0, 2.0, 1.0);
    fireBlast.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Particle system start
    // fireBlast.start(30);
    fireBlast.targetStopDuration = 1.4;

    // Animation update speed
    fireBlast.updateSpeed = 1/60;

    // Rendering order
   // fireBlast.renderingGroupId = 1;
    return fireBlast
}