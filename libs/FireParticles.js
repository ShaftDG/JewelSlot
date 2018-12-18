function FireParticles(emitter, inOptions) {
    var options = inOptions || {
      sizeParticle: 4.5,
      countParticles: 14
    };
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
    fireEmitter.position.z += 0.5;
    //fireEmitter.position.z += 2.0;
    particleSystemFire.emitter = fireEmitter; // the starting object, the emitter
    // var emitterType = new BABYLON.SphereParticleEmitter();
    // emitterType.radius = 2.25;
    // particleSystemFire.particleEmitterType = emitterType;

    particleSystemFire.createCylinderEmitter(1.8,2.5,0,0);

    particleSystemFire.startSpriteCellID = 0;
    particleSystemFire.endSpriteCellID = 31;
    particleSystemFire.spriteCellHeight = 256;
    particleSystemFire.spriteCellWidth = 128;
    particleSystemFire.spriteCellChangeSpeed = 5;

    particleSystemFire.minScaleX = 1.0;
    particleSystemFire.minScaleY = 1.75;
    particleSystemFire.maxScaleX = 1.0;
    particleSystemFire.maxScaleY = 1.75;

  /*  particleSystemFire.addSizeGradient(0, 3.0, 3.0);
    particleSystemFire.addSizeGradient(0.2, 2.5, 2.5);
    particleSystemFire.addSizeGradient(0.4, 2.0, 2.0);
    particleSystemFire.addSizeGradient(0.6, 1.5, 1.5);
    particleSystemFire.addSizeGradient(0.8, 1.0, 1.0);
    particleSystemFire.addSizeGradient(1.0, 0.5, 0.5);
    particleSystemFire.addSizeGradient(1.2, 0.0, 0.0);*/
    particleSystemFire.addSizeGradient(0, 0.0, 0.0);
    particleSystemFire.addSizeGradient(0.1, options.sizeParticle, options.sizeParticle / 2);
    particleSystemFire.addSizeGradient(0.08, options.sizeParticle * 0.72, (options.sizeParticle * 0.72)/2);
    particleSystemFire.addSizeGradient(0.8, 0, 0);
    // particleSystemFire.addSizeGradient(1.0, 2.4, 1.2);
    // particleSystemFire.addSizeGradient(1.0, 2.0, 1.0);

    particleSystemFire.translationPivot = new BABYLON.Vector2(0, -0.5);

    // Colors of all particles
    particleSystemFire.addColorGradient(0.25, new BABYLON.Color4.FromHexString("#fdf3d2ff"));
    particleSystemFire.addColorGradient(1.0, new BABYLON.Color4.FromHexString("#fdcf58ff"));
    particleSystemFire.addColorGradient(0.75, new BABYLON.Color4.FromHexString("#f27d0cff"));
    particleSystemFire.addColorGradient(0.6, new BABYLON.Color4.FromHexString("#f2210044"));
    particleSystemFire.addColorGradient(0.5, new BABYLON.Color4.FromHexString("#f07f1311"));
    particleSystemFire.addColorGradient(0.25, new BABYLON.Color4.FromHexString("#75767600"));
    //
    particleSystemFire.color1 = new BABYLON.Color4.FromHexString("#fdcf58ff");
    particleSystemFire.color2 = new BABYLON.Color4.FromHexString("#f27d0cff");
    particleSystemFire.colorDead = new BABYLON.Color4.FromHexString("#757676ff");

    // Life time of each particle (random between...)
    particleSystemFire.minLifeTime = 4.0;
    particleSystemFire.maxLifeTime = 4.0;

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
    particleSystemFire.emitRate = options.countParticles/2;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystemFire.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    // Set the gravity of all particles
    particleSystemFire.gravity = new BABYLON.Vector3(0, 1.5, 0);

    // Angular speed, in radians
    particleSystemFire.minAngularSpeed = 0;
    particleSystemFire.maxAngularSpeed = Math.PI/10;

    // Speed
    particleSystemFire.minEmitPower = 0;
    particleSystemFire.maxEmitPower = 0;
    particleSystemFire.updateSpeed = 0.04;
    particleSystemFire.targetStopDuration = 3.0;
    // particleSystemFire.renderingGroupId = 1;
    // particleSystemFire.isBillboardBased = false;
    //change start position function
  /*  var walkPS = 0;
    var meshModelVertices = emitter.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    particleSystemFire.startPositionFunction = function (worldMatrix, positionToUpdate, particle) {

        var randX = meshModelVertices[walkPS]*0.8;
        var randY = meshModelVertices[walkPS + 1]*0.9;
        var randZ = meshModelVertices[walkPS + 2]*1.05;

        BABYLON.Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);

        walkPS += 3;
        if (walkPS > meshModelVertices.length) {
            walkPS = 0;
        }
    };*/

////////////////////////
    var particleSystemFireOrigin = new BABYLON.ParticleSystem("particles", 100, scene, null, true);

    //Texture of each particle
    particleSystemFireOrigin.particleTexture = new BABYLON.Texture("textures/flare4.png", scene, true,
        false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE);

    // particleSystemFireOrigin.addSizeGradient(0.4, 0.5, 0.3);
    //  particleSystemFireOrigin.addSizeGradient(5.0, 3.0, 4.0);
    // Where the particles come from
    var fireEmitter = new BABYLON.TransformNode("");
    fireEmitter.parent = emitter;
    fireEmitter.position.y -= 2.3;
    fireEmitter.position.z += 0.5;
    //fireEmitter.position.z += 2.0;
    particleSystemFireOrigin.emitter = fireEmitter; // the starting object, the emitter
    // var emitterType = new BABYLON.SphereParticleEmitter();
    // emitterType.radius = 2.25;
    // particleSystemFireOrigin.particleEmitterType = emitterType;

    particleSystemFireOrigin.createCylinderEmitter(1.0,0.1,0,0);

    particleSystemFireOrigin.startSpriteCellID = 0;
    particleSystemFireOrigin.endSpriteCellID = 31;
    particleSystemFireOrigin.spriteCellHeight = 128;
    particleSystemFireOrigin.spriteCellWidth = 64;
    particleSystemFireOrigin.spriteCellChangeSpeed = 5;

    particleSystemFireOrigin.minScaleX = 1.0;
    particleSystemFireOrigin.minScaleY = 1.75;
    particleSystemFireOrigin.maxScaleX = 1.0;
    particleSystemFireOrigin.maxScaleY = 1.75;

    /*  particleSystemFireOrigin.addSizeGradient(0, 3.0, 3.0);
      particleSystemFireOrigin.addSizeGradient(0.2, 2.5, 2.5);
      particleSystemFireOrigin.addSizeGradient(0.4, 2.0, 2.0);
      particleSystemFireOrigin.addSizeGradient(0.6, 1.5, 1.5);
      particleSystemFireOrigin.addSizeGradient(0.8, 1.0, 1.0);
      particleSystemFireOrigin.addSizeGradient(1.0, 0.5, 0.5);
      particleSystemFireOrigin.addSizeGradient(1.2, 0.0, 0.0);*/
    particleSystemFireOrigin.addSizeGradient(0, options.sizeParticle, options.sizeParticle / 2);
    particleSystemFireOrigin.addSizeGradient(0.3, options.sizeParticle, options.sizeParticle / 2);
    particleSystemFireOrigin.addSizeGradient(0.4, options.sizeParticle * 0.72, (options.sizeParticle * 0.72)/2);
    particleSystemFireOrigin.addSizeGradient(0.8, options.sizeParticle, options.sizeParticle/2);
    // particleSystemFireOrigin.addSizeGradient(1.0, 2.4, 1.2);
    // particleSystemFireOrigin.addSizeGradient(1.0, 2.0, 1.0);

    particleSystemFireOrigin.translationPivot = new BABYLON.Vector2(0, -0.5);

    // Colors of all particles
    particleSystemFireOrigin.addColorGradient(0.25, new BABYLON.Color4.FromHexString("#fdf3d2ff"));
    particleSystemFireOrigin.addColorGradient(1.0, new BABYLON.Color4.FromHexString("#fdcf58ff"));
    particleSystemFireOrigin.addColorGradient(0.75, new BABYLON.Color4.FromHexString("#f27d0c22"));
    particleSystemFireOrigin.addColorGradient(0.6, new BABYLON.Color4.FromHexString("#f2210044"));
    particleSystemFireOrigin.addColorGradient(0.5, new BABYLON.Color4.FromHexString("#f07f1333"));
    particleSystemFireOrigin.addColorGradient(0.25, new BABYLON.Color4.FromHexString("#75767622"));
    //
    particleSystemFireOrigin.color1 = new BABYLON.Color4.FromHexString("#fdcf58ff");
    particleSystemFireOrigin.color2 = new BABYLON.Color4.FromHexString("#f27d0cff");
    particleSystemFireOrigin.colorDead = new BABYLON.Color4.FromHexString("#757676ff");

    // Life time of each particle (random between...)
    particleSystemFireOrigin.minLifeTime = 4.0;
    particleSystemFireOrigin.maxLifeTime = 4.0;

    // // Defines the color ramp to apply
    particleSystemFireOrigin.addRampGradient(0.0, new BABYLON.Color3(1, 1, 1));
    particleSystemFireOrigin.addRampGradient(0.09, new BABYLON.Color3(209/255, 204/255, 15/255));
    particleSystemFireOrigin.addRampGradient(0.18, new BABYLON.Color3(221/255, 120/255, 14/255));
    particleSystemFireOrigin.addRampGradient(0.47, new BABYLON.Color3(209/255, 175/255, 15/255));
    particleSystemFireOrigin.addRampGradient(0.50, new BABYLON.Color3(200/255, 150/255, 18/255));
    particleSystemFireOrigin.addRampGradient(0.47, new BABYLON.Color3(115/255, 22/255, 15/255));
    particleSystemFireOrigin.useRampGradients = true;

    // Defines the color remapper over time
    // particleSystemFireOrigin.addColorRemapGradient(0, 0, 0.1);
    // particleSystemFireOrigin.addColorRemapGradient(0.2, 0.1, 0.8);
    // particleSystemFireOrigin.addColorRemapGradient(0.3, 0.2, 0.85);
    // particleSystemFireOrigin.addColorRemapGradient(0.35, 0.2, 0.85);
    // particleSystemFireOrigin.addColorRemapGradient(0.4, 0.3, 0.9);
    // particleSystemFireOrigin.addColorRemapGradient(0.75, 0.65, 1.0);
    // particleSystemFireOrigin.addColorRemapGradient(1.0, 0.95, 1.0);

    // Emission rate
    particleSystemFireOrigin.emitRate = options.countParticles/2;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystemFireOrigin.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    // Set the gravity of all particles
    particleSystemFireOrigin.gravity = new BABYLON.Vector3(0, 0.25, 0);

    // Angular speed, in radians
    particleSystemFireOrigin.minAngularSpeed = 0;
    particleSystemFireOrigin.maxAngularSpeed = 0;

    // Speed
    particleSystemFireOrigin.minEmitPower = 0;
    particleSystemFireOrigin.maxEmitPower = 0;
    particleSystemFireOrigin.updateSpeed = 0.04;
    particleSystemFireOrigin.targetStopDuration = 2.5;

    return {flame: particleSystemFire, origin: particleSystemFireOrigin};
}