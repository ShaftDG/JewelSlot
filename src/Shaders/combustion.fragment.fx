#ifdef GL_ES
        precision highp float;
#endif

#include<imageProcessingDeclaration>
#include<helperFunctions>
#include<imageProcessingFunctions>

#include<shadowsFragmentFunctions>
#include<pbrFunctions>
#include<harmonicsFunctions>
#include<pbrLightFunctions>
#include<bumpFragmentFunctions>
#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>

#include<fogFragmentDeclaration>
// Varying
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

uniform float time;
uniform vec3 lightPosition;
uniform vec3 cameraPosition;
uniform sampler2D textureSampler;

uniform mat4 world;

float random(vec2 uv)
{
    float x = 12.32453454;
    float y = 4.98743657943;
    return fract(sin(dot(uv,vec2(x, y))))*uv.x*uv.y;
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

void main( void )
{
    vec3 vLightPosition = lightPosition;

    // World values
    vec3 vPositionW = vec3(world * vec4(vPosition, 1.0));
    vec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);

    // Light
    vec3 lightVectorW = normalize(vLightPosition - vPositionW);

    // diffuse
    float ndl = max(0., dot(vNormalW, lightVectorW));

    // Specular
    vec3 angleW = normalize(viewDirectionW + lightVectorW);
    float specComp = max(0., dot(vNormalW, angleW));
    specComp = pow(specComp, max(1., 64.)) * 2.;

    vec2 uv = 1.0-vUV;
    uv.y -= .575;
    uv.x -= .275;
    uv *= 25.;
    float n = noise(uv);
    float f = noise(uv);

    n = length(uv)+n*0.25-pow(time*2.0, 2.0);
    f = length(uv)+f*0.25-pow(time*2.0, 2.0);

    if (min(texture2D(textureSampler, vUV).a, n) < 0.5) {
        discard;
    }

    vec4 mainColor = texture2D(textureSampler, vec2(vUV.x, vUV.y));
    vec3 edgeColor = min(vec3(0.25, 0.15, 0.05) * (n-0.55), vec3(0.75, 0.75, 0.75)*n);
//    vec3 edgeColor = mix(vec3(1.0, 0.6, 0.1), vec3(0.0, 0.0, 0.0), n-0.55);
    if (min(texture2D(textureSampler, vUV).a, f) > 0.6) {
        f = 1.5;
    }
    vec3 coalEdgeColor = mix(
        vec3(1.0, 0.25, 0.1),
        vec3(0.0,0.0,0.0),
        f-0.5
    );
   // vec3 edgeColor1 = max(vec3(1.0, 0.6, 0.1) * (n*0.5-0.55), vec3(0.5, 0.5, 0.5));
   vec3 totalColor = mainColor.rgb * (edgeColor + coalEdgeColor);
    gl_FragColor = vec4(totalColor * ndl /*+ vec3(specComp)*/ + toLinearSpace(coalEdgeColor), /*mix(texture2D(textureSampler, vUV).a, 0.0, n)*/1.0);
}


