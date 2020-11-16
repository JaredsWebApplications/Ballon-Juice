function setup() {
	var DeePeeVee;
	var average = [0, 0, 0];
	DeePeeVee = new GenPoint;
	average = DeePeeVee.getDPV();
	
	for(var i = 0; i < 10; i++)
	{
		DeePeeVee = new GenPoint;
		average[0] = (DeePeeVee.getDPV()[0] + average[0]) / 2;
		average[1] = (DeePeeVee.getDPV()[1] + average[1]) / 2;
		average[2] = (DeePeeVee.getDPV()[2] + average[2]) / 2;
	}
}
// Function called every frame
function draw() {
	
}
