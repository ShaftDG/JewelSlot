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

                    float random(vec2 uvCustom) {
                        float x = 12.32453454;
                        float y = 4.98743657943;
                        return fract(sin(dot(uvCustom,vec2(x, y))))*uvCustom.x*uvCustom.y;
                    }

                    float noise (vec2 st) {
                        vec2 i = floor(st);
                        vec2 f = fract(st);

                    // Four corners in 2D of a tile
                        float a = random(i);
                        float b = random(i + vec2(1.0, 0.0));
                        float c = random(i + vec2(0.0, 1.0));
                        float d = random(i + vec2(1.0, 1.0));

                    // Smooth Interpolation

                    // Cubic Hermine Curve.  Same as SmoothStep()
                        vec2 u;// = f*f*(3.0-2.0*f);
                        u = smoothstep(0.,1.,f);

                    // Mix 4 coorners porcentages
                        return mix(a, b, u.x) +
                                (c - a)* u.y * (1.0 - u.x) +
                                (d - b) * u.x * u.y;
                    }
                    
vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec2 fade(vec2 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec2 P)
{
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289(Pi); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;  
  g01 *= norm.y;  
  g10 *= norm.z;  
  g11 *= norm.w;  

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

// Classic Perlin noise, periodic variant
float pnoise(vec2 P, vec2 rep)
{
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, rep.xyxy); // To create noise with explicit period
  Pi = mod289(Pi);        // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;

  vec4 i = permute(permute(ix) + iy);

  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
  vec4 gy = abs(gx) - 0.5 ;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;

  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);

  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
  g00 *= norm.x;  
  g01 *= norm.y;  
  g10 *= norm.z;  
  g11 *= norm.w;  

  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));

  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}
                /*before main  for define your uniform*/ 
     `)
            .replace('gl_FragColor=finalColor;',
                `
     /*before gl_position use positionUpdate */ 
        vec3 totalColor = vec3(1.0);
        #ifdef ALBEDO
            vec2 uvCustom = vAlbedoUV+uvOffset;
            uvCustom.y -= .425;
            uvCustom.x -= .275;
            uvCustom *= 25.;
            float n = noise(uvCustom);
            float f = noise(uvCustom);

            n = length(uvCustom)*8.0+n*0.6-pow(time*6.0, 2.0);
            f = length(uvCustom)*8.0+f*0.6-pow(time*6.0, 2.0);
/*
            if ( n < 0.8) {
                n = 1.55;
            }*/
            // float a = 1.0;
            if ( f < -0.9 || (vec2(vAlbedoUV+uvOffset).x > 0.5 && vec2(vAlbedoUV+uvOffset).y > 0.2 && vec2(vAlbedoUV+uvOffset).y < 0.8) ) {
                discard;
                // a = 0.0;
            }
            
            vec3 edgeColor = min(vec3(1.0, 0.5, 0.25) * (n*0.1), vec3(1.0, 1.0, 1.0));

            if ( f > 0.7) {
                f = 1.4;
            }
           
const float scale = 2.0;
const float contrast = 3.0;

vec2 uv2 = vAlbedoUV+uvOffset;
	vec3 color = 1.0-clamp(vec3( cnoise( vec2(uv2.x + sin(time*0.25),uv2.y + cos(time*0.1)) * scale ) ) * contrast, 0.0, 2.0);
	
            vec3 coalEdgeColor = mix(
                vec3(1.0,0.3,0.1) * color,
                vec3(0.0,0.0,0.0),
                f-0.4
            );	

              totalColor = coalEdgeColor; 
              totalColor*=toLinearSpace(coalEdgeColor);          
        #endif
        gl_FragColor=vec4(clamp((finalColor.rgb*1.5) * edgeColor + totalColor, 0.0, 2.0), 1.0);
     `);

    var combustionMaterial = new BABYLON.CustomPBRMaterial("coal", scene);
    // var combustionMaterial = new BABYLON.ShaderMaterial("coal", scene);
    combustionMaterial.metallic = 0.0;
    combustionMaterial.albedoTexture = this.material.albedoTexture;
    combustionMaterial.albedoTexture.wrapU = BABYLON.Texture.WRAP_ADDRESSMODE;
    combustionMaterial.albedoTexture.wrapV = BABYLON.Texture.WRAP_ADDRESSMODE;

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
    var order = 0.001;
    var start_time = Date.now();

  //  combustionMaterial._activeEffect.setFloat("time", time);
  //  combustionMaterial._prepareEffect().setFloat("time", time);
    // combustionMaterial.setVector3("cameraPosition", scene.cameras[0].position);
    // combustionMaterial.setVector3("lightPosition", scene.lights[0].position);
    // combustionMaterial.setTexture("textureSampler", this.material.albedoTexture);
  //  combustionMaterial.setFloat("time", time);
    combustionMaterial.onBind = function () {
        combustionMaterial._activeEffect.setFloat("time", time);
        time = (Date.now() - start_time) * 0.001;
        // time += order;
    };

    this.material = combustionMaterial;

};