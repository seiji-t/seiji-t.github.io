Array.prototype.scalarMultiply = function(x) { return this.map(function(d) { return x * d; }); }

var sigma = 10.0,
	rho = 28.0,
	beta = 8/3;

var x = 1,
	y = 0,
	z = 0; 

var nPendula = 1,
	initialRange = 1e-4;

xdot = function(x,y,z) {
	return (sigma*(y-x));
}

ydot = function(x,y,z) {
	return (x*(rho - z) - y)
}

zdot = function(x,y,z) {
	return x*y - beta*z
}

var Z = [x, y, z],
	oldZ = Z;

deltas = d3.range(-initialRange/2, initialRange/2,initialRange/nPendula);

Zs = deltas.map(x=>[Z[0],Z[1],Z[2]])

f = function(Z) {
	return [xdot(Z[0], Z[1], Z[2]), ydot(Z[0], Z[1], Z[2]), zdot(Z[0], Z[1], Z[2])];
}

RK4 = function(Z_n, f, tau) {
	var Y1 = f(Z_n).scalarMultiply(tau);
	var Y2 = f([Z_n[0] + 0.5*Y1[0], Z_n[1] + 0.5*Y1[1], Z_n[2] + 0.5*Y1[2], Z_n[3] + 0.5*Y1[3]]).scalarMultiply(tau);
	var Y3 = f([Z_n[0] + 0.5*Y2[0], Z_n[1] + 0.5*Y2[1], Z_n[2] + 0.5*Y2[2], Z_n[3] + 0.5*Y2[3]]).scalarMultiply(tau);
	var Y4 = f([Z_n[0] + Y3[0], Z_n[1] + Y3[1], Z_n[2] + Y3[2], Z_n[3] + Y3[3]]).scalarMultiply(tau);

	return [
		Z_n[0] + Y1[0]/6 + Y2[0]/3 + Y3[0]/3 + Y4[0]/6,
		Z_n[1] + Y1[1]/6 + Y2[1]/3 + Y3[1]/3 + Y4[1]/6,
		Z_n[2] + Y1[2]/6 + Y2[2]/3 + Y3[2]/3 + Y4[2]/6,
		Z_n[3] + Y1[3]/6 + Y2[3]/3 + Y3[3]/3 + Y4[3]/6,
	]
}

getCoords = function(Z) {
	return	{
		'x1':Z[0],
		'y1':Z[2]
	};
}
