function FireBlast(emitter)
{
    // Create default particle systems
  //  var fireBlast = BABYLON.ParticleHelper.CreateDefault(emitter.position.clone(), 500);
    var fireBlast = new BABYLON.ParticleSystem("fireBlast", 2000, scene);
    // Texture
    fireBlast.particleTexture = new BABYLON.Texture("textures/spark.png", scene);
    fireBlast.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
    // Emitter
    fireBlast.emitter = emitter;
    var fireBlastSphere = fireBlast.createSphereEmitter(0.5, 0);
    fireBlastSphere.radiusRange = 0.25;
    fireBlast.particleEmitterType = fireBlastSphere;
    // Set emission rate
    fireBlast.emitRate = 2000;

    // Start size
    fireBlast.minSize = 0.1;
    fireBlast.maxSize = 1.0;

    // Lifetime
    fireBlast.minLifeTime = 1.25;
    fireBlast.maxLifeTime = 2.5;

    // Emission power
    fireBlast.minEmitPower = 50;
    fireBlast.maxEmitPower = 50;

    fireBlast.direction1 = new BABYLON.Vector3(-1, 4, 1);
    fireBlast.direction2 = new BABYLON.Vector3(1, 4, -1);

    // Limit velocity over time
    fireBlast.addLimitVelocityGradient(10, 15, 10);
    fireBlast.addLimitVelocityGradient(0.120, 12.983, 0.25);
    fireBlast.addLimitVelocityGradient(0.445, 1.780, 0.5);
    fireBlast.addLimitVelocityGradient(0.691, 0.502, 0.75);
    fireBlast.addLimitVelocityGradient(0.930, 0.05, 1.0);
    fireBlast.addLimitVelocityGradient(1.0, 0, 1.25);

    fireBlast.limitVelocityDamping = 0.8;

    fireBlast.color1 = new BABYLON.Color4(2.0, 1.6, 1.4, 1.0);
    fireBlast.color2 = new BABYLON.Color4(2.0, 1.0, 0.4, 1.0);
    fireBlast.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    fireBlast.minAngularSpeed = Math.PI;
    fireBlast.maxAngularSpeed = Math.PI*2.0;

    var noiseTexture = new BABYLON.NoiseProceduralTexture("perlin", 256, scene);
    noiseTexture.animationSpeedFactor = 0;
    noiseTexture.persistence = 2;
    noiseTexture.brightness = 0.5;
    noiseTexture.octaves = 2;

    fireBlast.noiseTexture = noiseTexture;
    fireBlast.noiseStrength = new BABYLON.Vector3(100, 100, 100);

    fireBlast.targetStopDuration = 0.15;

    // Animation update speed
    fireBlast.updateSpeed = 1/60;

    // Rendering order
   // fireBlast.renderingGroupId = 1;
    return fireBlast
}