function FireParticles(emitter) {
    var particleSystemFire = new BABYLON.ParticleSystem("particles", 50, scene, null, true);

    //Texture of each particle
    particleSystemFire.particleTexture = new BABYLON.Texture("textures/flare2.png", scene, true,
        false, BABYLON.Texture.TRILINEAR_SAMPLINGMODE);

    // particleSystemFire.addSizeGradient(0.4, 0.5, 0.3);
    //  particleSystemFire.addSizeGradient(5.0, 3.0, 4.0);
    // Where the particles come from
    var fireEmitter = new BABYLON.TransformNode("");
    fireEmitter.parent = emitter;
    fireEmitter.position.y -= 0.5;
    fireEmitter.position.z += 1.0;
    //fireEmitter.position.z += 2.0;
    particleSystemFire.emitter = fireEmitter; // the starting object, the emitter
    // var emitterType = new BABYLON.SphereParticleEmitter();
    // emitterType.radius = 2.25;
    // particleSystemFire.particleEmitterType = emitterType;

    particleSystemFire.createCylinderEmitter(2.0,2.0,0,0);

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
    particleSystemFire.addSizeGradient(3.0, 3.0, 3.0);

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
    // particleSystemFire.renderingGroupId = 1;

    //change start position function
    var walkPS = 0;
    var meshModelVertices = emitter.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    particleSystemFire.startPositionFunction = function (worldMatrix, positionToUpdate, particle) {

        var randX = meshModelVertices[walkPS];
        var randY = meshModelVertices[walkPS + 1];
        var randZ = meshModelVertices[walkPS + 2]*1.05;

        BABYLON.Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);

        walkPS += 3;
        if (walkPS > meshModelVertices.length) {
            walkPS = 0;
        }
    };

    return particleSystemFire;
}