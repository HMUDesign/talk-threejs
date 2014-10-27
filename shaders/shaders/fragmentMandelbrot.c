uniform int iterations;
uniform sampler2D gradient;

uniform vec2 center, dimensions, resolution;

float scale = max(dimensions.x / resolution.x, dimensions.y / resolution.y);

vec2 square(vec2 z) {
	return vec2(z.x * z.x - z.y * z.y, 2. * z.x * z.y);
}

int mandelbrot(vec2 c) {
	vec2 z = vec2(0., 0.);
	int j = -1;
	for(int i = 0; i < 10000; i++) {
		z = square(z) + c;
		
		if(i >= iterations) {
			break;
		}
		if(z.x * z.x + z.y * z.y >= 4.) {
			j = i;
			break;
		}
	}
	
	return j;
}

void main() {
	vec2 position = (gl_FragCoord.xy - resolution / 2.) * scale + center;
	float value = float(mandelbrot(position)) / float(iterations);
	
	vec4 color = texture2D( gradient, vec2( 0., value ) );
	if(value < 0.)
		color = vec4(0.,0.,0., 1.);
	
	gl_FragColor = vec4( color.rgb, 1.0 );
}
