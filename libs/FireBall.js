function FireBall(emitter) {

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
    var particleSystem = new BABYLON.ParticleSystem("particles", 5000, scene);
    particleSystem.particleTexture = new BABYLON.Texture("textures/fire.jpg", scene);
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    particleSystem.minAngularSpeed = -2;
    particleSystem.maxAngularSpeed = 2;
    particleSystem.minSize = 0.48;
    particleSystem.maxSize = 5.30;
    particleSystem.minLifeTime = 0.01;
    particleSystem.maxLifeTime = 0.3;
    particleSystem.minEmitPower = 0.5;
    particleSystem.maxEmitPower = 2.0;
    particleSystem.emitter = emitter;
    var emitterType = new BABYLON.SphereParticleEmitter();
    emitterType.radius = 1.25;
    particleSystem.particleEmitterType = emitterType;
    particleSystem.emitRate = 5000;
    particleSystem.direction1 = new BABYLON.Vector3(-0.8, -0.8, -0.8);
    particleSystem.direction2 = new BABYLON.Vector3(0.8, 0.8, 0.8);
    // particleSystem.color1 = new BABYLON.Color3(2, 0, 0);
    // particleSystem.color2 = new BABYLON.Color3(1.90, 1.68, 0.1);

    particleSystem.addSizeGradient(0, 3.0, 3.0);
    particleSystem.addSizeGradient(0.2, 2.5, 2.5);
    particleSystem.addSizeGradient(0.4, 2.0, 2.0);
    particleSystem.addSizeGradient(0.6, 1.5, 1.5);
    particleSystem.addSizeGradient(0.8, 1.0, 1.0);
    particleSystem.addSizeGradient(1.0, 0.5, 0.5);
    particleSystem.addSizeGradient(1.2, 0.0, 0.0);

    particleSystem.addColorGradient(0.9, new BABYLON.Color4.FromHexString("#0882ffff"));
    particleSystem.addColorGradient(0.9, new BABYLON.Color4.FromHexString("#fdcf58ff"));
    particleSystem.addColorGradient(0.8, new BABYLON.Color4.FromHexString("#f07f13ff"));
    particleSystem.addColorGradient(0.6, new BABYLON.Color4.FromHexString("#757676ff"));
    particleSystem.addColorGradient(0.5, new BABYLON.Color4.FromHexString("#f20a00ff"));
    particleSystem.addColorGradient(0.4, new BABYLON.Color4.FromHexString("#040404ff"));

    particleSystem.addRampGradient(0.0, new BABYLON.Color3(1, 1, 1));
    particleSystem.addRampGradient(0.09, new BABYLON.Color3(209/255, 204/255, 15/255));
    particleSystem.addRampGradient(0.18, new BABYLON.Color3(221/255, 120/255, 14/255));
    particleSystem.addRampGradient(0.47, new BABYLON.Color3(209/255, 175/255, 15/255));
    particleSystem.addRampGradient(0.50, new BABYLON.Color3(200/255, 150/255, 18/255));
    particleSystem.addRampGradient(0.47, new BABYLON.Color3(115/255, 22/255, 15/255));
    particleSystem.useRampGradients = true;
    particleSystem.gravity = new BABYLON.Vector3(0, -0.38, 0);
    particleSystem.updateSpeed = 0.01;
    particleSystem.moveSource = true;
    return particleSystem;
}