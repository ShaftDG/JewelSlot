function Combustion() {

 /*   var positions = this.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    var indices = this.getIndices();
    var normals = [];
    var vertexData = new BABYLON.VertexData();
    BABYLON.VertexData.ComputeNormals(positions, indices, normals);
    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.normals = normals;
    vertexData.applyToMesh(this);*/
    BABYLON.Effect.ShadersStore["customPbrPixelShader"] =
        BABYLON.Effect.ShadersStore.pbrPixelShader
            .replace('#include<fogFragmentDeclaration>',
                `#include<fogFragmentDeclaration>

                    uniform float time;
                    uniform sampler2D customNoiseSampler;
                    uniform sampler2D gradientFireSampler;

                /*before main  for define your uniform*/ 
     `)
            .replace('gl_FragColor=finalColor;',
                `
     /*before gl_position use positionUpdate */ 
        vec3 totalColor = vec3(1.0);
        vec3 combustionColor = vec3(0.0);
        vec3 coalColor = vec3(0.0);
        #ifdef ALBEDO
        vec2 uv2 = vAlbedoUV+uvOffset;
            float upFactor = 0.659;
            float scaleFactorX = 2.0;
            float scaleFactorY = 3.0;
            float rateFactor = time*0.164;
            float speedFactor = cos(sin(rateFactor*2.0)*2.0);
            float hotFactor = 0.1;
            vec4 noiseTex = texture2D(customNoiseSampler,uv2); 
            vec3 combustionTexture = noiseTex.rgb + rateFactor;
        
            combustionColor = texture2D(gradientFireSampler,vec2( clamp( combustionTexture.r, 0.0, 1.0 ) )).rgb; 
           
       float cutEdge = texture2D(customNoiseSampler,vec2(uv2.x*scaleFactorX, uv2.y*scaleFactorY+speedFactor)).r;
       if (cutEdge < 0.45) {
            combustionColor*=texture2D(customNoiseSampler,vec2(uv2.x*scaleFactorX, uv2.y*scaleFactorY+speedFactor)).r*hotFactor*clamp(sin(rateFactor*50.0)*10.0, 1.0, 5.0);           
       }
       
       if (cutEdge >= 0.75) {
            combustionColor*=(vec3(1.1, 1.75, 1.1)+texture2D(customNoiseSampler,vec2(uv2.x*scaleFactorX, uv2.y*scaleFactorY+speedFactor)).r)*clamp(sin(rateFactor*50.0), 0.0, 2.0);           
       }
   
            combustionColor*=toLinearSpace(combustionColor);
            combustionColor*=vLightingIntensity.y;
   
            coalColor = vec3(1.0-texture2D(gradientFireSampler,vec2(clamp( (combustionTexture.r)*1.02, 0.0, 1.0) )).r)+0.05;           
     
        vec4 blended = finalColor * vec4(coalColor, 1.0)+vec4(combustionColor, 1.0);
        if ( combustionTexture.r > upFactor || (uv2.x > 0.5 && uv2.y > 0.2 && uv2.y < 0.8) ) {
            discard;            
        }
        #endif             
      
        gl_FragColor=blended;
     `);

    var combustionMaterial = new BABYLON.CustomPBRMaterial("coal", scene);
    // var combustionMaterial = new BABYLON.ShaderMaterial("coal", scene);
    combustionMaterial.metallic = 0.0;
    combustionMaterial.albedoTexture = this.material.albedoTexture;
    combustionMaterial.customNoiseTexture = this.userData.noiseTexture;
    combustionMaterial.gradientFireTexture = this.userData.gradientTexture;
    combustionMaterial.albedoTexture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
    combustionMaterial.albedoTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
    combustionMaterial.customNoiseTexture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
    combustionMaterial.customNoiseTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
    // combustionMaterial._activeEffect.setTexture("customNoiseSampler", this.material.albedoTexture);
   // combustionMaterial._activeEffect.setTexture("customNoise", this.material.albedoTexture);
    // combustionMaterial.albedoTexture.hasAlpha = true;
    // combustionMaterial.useAlphaFromAlbedoTexture;
    // combustionMaterial.hasAlpha = true;
   // combustionMaterial.emissiveTexture = this.material.emissiveTexture;
   // combustionMaterial.emissiveTexture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
   // combustionMaterial.emissiveTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;
    // combustionMaterial.emissiveColor = new BABYLON.Color3(2.0,2.0,2.0);
  //  combustionMaterial.albedoTexture.uOffset = -1.0;
  //  combustionMaterial.emissTexture = texture[1];
  //  combustionMaterial.emissTexture.uOffset = -1.0;
    /*var combustionMaterial = new BABYLON.ShaderMaterial("shader", scene, "combustion",
        {
            // needAlphaBlending: true,
            attributes: ["position", "normal", "uv"],
            uniforms: ["world", "worldView", "worldViewProjection", "time", "cameraPosition", "lightPosition"],
            samplers: ["textureSampler"]
        });*/
   combustionMaterial.backFaceCulling = false;
  // combustionMaterial._activeEffect.;

    var time = 0;
    var order = 0.0;
    var start_time = Date.now();

  //  combustionMaterial._activeEffect.setFloat("time", time);
  //  combustionMaterial._prepareEffect().setFloat("time", time);
    // combustionMaterial.setVector3("cameraPosition", scene.cameras[0].position);
    // combustionMaterial.setVector3("lightPosition", scene.lights[0].position);
    // combustionMaterial.setTexture("textureSampler", this.material.albedoTexture);
  //  combustionMaterial.setFloat("time", time);
    combustionMaterial.onBind = function () {
        combustionMaterial._activeEffect.setFloat("time", time);

        order = (Date.now() - start_time) * 0.001;
        start_time = Date.now();
        time += order;
    };

    this.material = combustionMaterial;

};