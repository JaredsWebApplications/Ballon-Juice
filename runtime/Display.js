function setup() {
	//Generated potential point where a balloon may be added
	var Point = new GenPoint;
	
	//Whether or not the point is already added
	var newPoint = false;
	
	//Create a new collection of balloons
	Balloons = new BalloonField;
	
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
	
	//Check which points we have
	Balloons.outputBalloons();
}
// Function called every frame
function draw() {
	
}
