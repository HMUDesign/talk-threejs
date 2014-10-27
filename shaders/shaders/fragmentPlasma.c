#define PI  3.1415926535897932384626433832795
#define PI2 6.2831853071795864769252867665590

uniform float time;
uniform vec2 resolution;
uniform sampler2D gradient;

float common = min(resolution.x, resolution.y);
vec2 scaled = resolution / common;

float distance(vec2 p) {
	return distance(p, resolution / 2.);
}

float plasma1(vec2 pos) {
	float value = 0.;
	
	value += cos(pos.x * PI2 * 5.);
	value += cos(pos.y * PI2 * 5.);
	value += cos(distance(pos, scaled * vec2(.5, .5)) * 2. * PI2);
	
	value = value / 6. + .5;
	return value;
}

float plasma2(vec2 pos) {
	float value = 0.;
	
	value += sin(pos.x * 16.0);
	value += sin(pos.y * 8.0);
	value += sin((pos.x + pos.y) * 16.0);
	value += sin(sqrt(pos.x * pos.x + pos.y * pos.y) * 8.0);
	
	value = value / 8. + .5;
	return value;
}

float plasma3(vec2 pos) {
	float value = 0.;
	
	vec2 center = vec2(
		cos(time * 5.) / 2. + scaled.x / 2.,
		sin(time * 4.) / 2. + scaled.y / 2.
	);
	value += sin(distance(pos, center) * 8.0);
	
	value = value / 2. + .5;
	return value;
}

void main() {
	vec2 pos = (gl_FragCoord.xy) / common;
	float value = plasma1(pos);
	
	vec4 color = texture2D( gradient, vec2( 0.5, mod(value + time, 1.) ) );
	gl_FragColor = vec4( color.rgb, 1.0 );
}
