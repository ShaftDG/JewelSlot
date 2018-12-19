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
    // var partMap = BABYLON.MeshBuilder.CreateBox("partMap", {height: 2, width: 2, depth: 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE});
    // partMap.parent = this;

    this._children.map((v,i) => {
        v.material.emissiveIntensity = 5.0;
        if (
            v.name === this.name + "." + "map_1" ||
            v.name === this.name + "." + "map_2" ||
            v.name === this.name + "." + "map_3"
        ) {
            v.material.albedoColor = new BABYLON.Color3(1.5, 1.5, 1.5);
            v.material.emissiveColor = new BABYLON.Color3(0, 0, 0);
            var center = v.getBoundingInfo().boundingBox.center;
            v.setPivotMatrix(BABYLON.Matrix.Translation(-center.x, -center.y, -center.z));
            v.position = new BABYLON.Vector3(0,0,0).subtract(center);
            v.rotation.z = (Math.random() < 0.5 ? -1 : 1) * Math.PI / 15;
            v.particleSystem = {
                electric: ElectricField(v),
                spark: StarBackground(v),
                fire: FireParticlesCombustion(v, {sizeParticle: 8, countParticles: 4}),
            };
            v.userData = {
                center: center,
                defaultMaterial: v.material,
                noiseTexture: textures[1],
                gradientTexture: textures[2]
            };
          /*  var box = BABYLON.MeshBuilder.CreateBox("box", {width: 3, height: 3, depth: 3}, scene);
            box.visibility = this.visibility;
            var mat = new BABYLON.StandardMaterial("mat", scene);
            mat.emissiveColor = new BABYLON.Color3(0.75,0.5,0.25);
            box.convertToFlatShadedMesh();
            box.enableEdgesRendering();
            box.edgesColor.copyFromFloats(0, 0, 0, 1);
            box.edgesWidth = 0.2;
            box.material = mat;
            box.parent = v;*/

        } /*else if (
            v.name !== this.name + "." + "coin" &&
            v.name !== this.name + "." + "bottle" &&
            v.name !== this.name + "." + "cube" &&
            v.name !== this.name + "." + "diamond" &&
            v.name !== this.name + "." + "ring"
        ) {
            v.particleSystem = FireParticles(v);
            v.material = glassMaterial.clone();
            v.material.albedoColor = new BABYLON.Color3(0, 0, 0);
            if (i === 2) {
                v.material.albedoColor.r = 2.0;
            } else if (i === 3) {
                v.material.albedoColor.g = 2.0;
            } else if (i === 4) {
                v.material.albedoColor.b = 2.0;
            }  else if (i === 5) {
                v.material.albedoColor.b = 2.0;
                v.material.albedoColor.g = 1.0;
            }
        }*//* else if (v.name === this.name + "." + "ring") {
            v.particleSystem = FireParticles(v);
            v._children[0].material = glassMaterial.clone();
            v.material.albedoColor = new BABYLON.Color3(0, 1.0, 2.0);
        }*/ else {
          //  v.renderingGroupId = 0;
            v.particleSystem = FireParticles(v);
          //  v.material.backFaceCulling = false;
         //   v.material.separateCullingPass = true;
         //    v.material.alphaMode = BABYLON.Engine.ALPHA_COMBINE;
            // v.material.reflectionTexture = textures[0];
            // v.material.refractionTexture = textures[0];
            // v.material.linkRefractionWithTransparency = true;
            //v.material.environmentIntensity = 2.0;
          //  v.material.indexOfRefraction = 0.1;
          //  v.material.alpha = 0.9;
          /*  v.material.reflectivityColor = new BABYLON.Color3(0.25, 0.25, 0.25);
            v.material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
            v.material.reflectionFresnelParameters.bias = 0.16;
            v.material.reflectionFresnelParameters.power = 8;

            v.material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
            v.material.emissiveFresnelParameters.bias = 0.16;
            v.material.emissiveFresnelParameters.power = 8;
            v.material.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
            v.material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

            v.material.opacityFresnelParameters = new BABYLON.FresnelParameters();
            v.material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
            v.material.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();*/

            if (v.name === this.name + "." + "cube" ) {
                v.particleSystem = FireBlast(v);
                v.material = glassMaterial.clone();
                //v.material.emissiveColor = new BABYLON.Color3(2.0,2.0,2.0);
            }
            if (
                v.name === this.name + "." + "octa" &&
                v.name === this.name + "." + "square" &&
                v.name === this.name + "." + "pad" &&
                v.name === this.name + "." + "diamond"
            ) {
                v.material.emissiveColor = new BABYLON.Color3(0.5,0.5,0.5);
            }
        }
    });
    this.userData = {
        beginGame: false,
        speedMove: null,
        rotateDestination: null,
        // flagDestination: false,
        flagStartTween: false,
        inChest: false,
        inFreeSpin: false,
        endInChestAnimation: false,
        endScalingAnimation: false,
        startDrop: false,
        scalingDown: false,
        visibleSymbol: null
    };
  //  this.material = glassMaterial;
    this.position = position;

    return this;
}