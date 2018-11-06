function CreateJewel(renderList, textures, position, isMobile)
{
   /* var glassMaterial = new BABYLON.PBRMaterial("glassMaterial", scene);
    glassMaterial.backFaceCulling = false;
    glassMaterial.reflectionTexture = textures[0];
    glassMaterial.refractionTexture = textures[0];
    glassMaterial.linkRefractionWithTransparency = false;
    glassMaterial.indexOfRefraction = 1.4;
    glassMaterial.environmentIntensity = 1.5;
    glassMaterial.alpha = 0.8;
    glassMaterial.microSurface = 10;
    // glassMaterial.microSurfaceTexture = textures[1];
    glassMaterial.reflectivityColor = new BABYLON.Color3(0.3, 0.3, 0.3);

//////////////////////
    glassMaterial.directIntensity = 2.0;

    glassMaterial.cameraExposure = 0.4;
    glassMaterial.cameraContrast = 2.0;

    glassMaterial.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    glassMaterial.emissiveIntensity = 0.0;

    glassMaterial.specularPower = 32;

    glassMaterial.forceIrradianceInFragment = true;
    glassMaterial.enableSpecularAntiAliasing = true;

    // Fresnel
    glassMaterial.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    glassMaterial.reflectionFresnelParameters.bias = 1.6;
    glassMaterial.reflectionFresnelParameters.power = 4;

    glassMaterial.emissiveFresnelParameters = new BABYLON.FresnelParameters();
    glassMaterial.emissiveFresnelParameters.bias = 1.6;
    glassMaterial.emissiveFresnelParameters.power = 4;
    glassMaterial.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
    glassMaterial.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

    glassMaterial.opacityFresnelParameters = new BABYLON.FresnelParameters();
    glassMaterial.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
    glassMaterial.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();*/

    var exposure = 0.6;
    var contrast = 1.6;
    var glassMaterial = new BABYLON.PBRMaterial("glass", scene);
    glassMaterial.backFaceCulling = false;
    glassMaterial.reflectionTexture = textures[0];
    glassMaterial.refractionTexture = textures[0];
    glassMaterial.linkRefractionWithTransparency = true;
    glassMaterial.indexOfRefraction = 0.1;
    glassMaterial.alpha = 0;
    glassMaterial.cameraExposure = exposure;
    glassMaterial.cameraContrast = contrast;
    glassMaterial.microSurface = 1;
    glassMaterial.reflectivityColor = new BABYLON.Color3(0.25, 0.25, 0.25);

    glassMaterial.environmentIntensity = 2.0;
    // Fresnel
    glassMaterial.reflectionFresnelParameters = new BABYLON.FresnelParameters();
    glassMaterial.reflectionFresnelParameters.bias = 0.16;
    glassMaterial.reflectionFresnelParameters.power = 8;

    glassMaterial.emissiveFresnelParameters = new BABYLON.FresnelParameters();
    glassMaterial.emissiveFresnelParameters.bias = 0.16;
    glassMaterial.emissiveFresnelParameters.power = 8;
    glassMaterial.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
    glassMaterial.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

    glassMaterial.opacityFresnelParameters = new BABYLON.FresnelParameters();
    glassMaterial.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
    glassMaterial.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();
   // glassMaterial.albedoColor = new BABYLON.Color3(0.85, 0.85, 0.85);

    // var refractionTexture = new BABYLON.RefractionTexture("th", 1024, scene);
    // refractionTexture.renderList = renderList;
    // refractionTexture.refractionPlane = new BABYLON.Plane(0, 0, 0, 0);
    // refractionTexture.depth = 2.0;

    // glassMaterial.refractionTexture = refractionTexture;
    // meshes.map(v => { v.material = glassMaterial; v.position = position });
    this._children.map(v => {
        v.material = glassMaterial.clone();
        v.particleSystem = ElectricField(v);
    });
    this.userData = {
        speedMove: null,
        rotateDestination: null,
        // flagDestination: false,
        flagStartTween: false,
        inChest: false,
        startDrop: false,
        scalingDown: false,
        visibleSymbol: null
    };
  //  this.material = glassMaterial;
    this.position = position;

    return this;
}