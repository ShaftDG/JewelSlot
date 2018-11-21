#ifdef GL_ES
        precision highp float;
#endif

// Attributes
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;

// Varying
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUV;

void main() {
    gl_Position = worldViewProjection * vec4(position, 1.0);
    vUV = uv;
    vPosition = position;
    vNormal = normal;
}