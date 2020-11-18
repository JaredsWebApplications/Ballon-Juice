function setup() {
	
	//Creates a new canvas
	createCanvas(1920, 1080);
	
	//Generated potential point where a balloon may be added
	var Point = new GenPoint;
	
	//Whether or not the point is already added
	var newPoint = false;
	var connect = new Connector(0, 0);
	
	//Create a new collection of balloons
	Balloons = new BalloonField;
	displayCell = new Cell(new DPV(0,0,0), "0");
	
	//While we're still adding balloons
	for(var i = 0; i < 40; i++)
	{
		//If this is not a new point
		while(!newPoint)
		{			
			//Create a new potential point
			Point = new GenPoint;

			//Consider it to be a new point
			newPoint = true;
			
			//If this is a valid point
			if(i == 0 || Balloons.checkValid(Point.getDPV()) == true)
			{
				//Add a Balloon with that point
				Balloons.addBalloon(Point.getDPV());
				
				//Initialize a cell to be displayed based on this balloon
				displayCell[i] = new Cell(Balloons.getBalloon(i), "0");
				
				if(i != 0)
				{
					connect[i - 1] = new Connector(displayCell[0], displayCell[i]);
					connect[i - 1].drawConnection();
				}
			}
			else
			{
				//This is not a valid point
				newPoint = false;
			}
		}
		//Reset whether or not this is a new point
		newPoint = false;
	}
	
	for(var i = 0; i < 40; i++)
	{
		displayCell[i].drawToScreen();
	}
	
	//Check which points we have
	Balloons.outputBalloons();
}
// Function called every frame
function draw() {
	
}
