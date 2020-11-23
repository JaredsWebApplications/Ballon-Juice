//Number of nodes to add
var NUMBER_NODES = 40;

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
	for(var i = 0; i < NUMBER_NODES; i++)
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
	
	//Generates connection matrix
	var connectionMatrix = [];
	var connPos;
	var curCons = new Array(NUMBER_NODES);
	var staCons = 0;
	//Generates connection matrix, and sets the number of connections each element has to 0
	for(var i = 0; i < NUMBER_NODES; i++)
	{
		connectionMatrix[i] = [];
		curCons[i] = 0;
		for(var j = 0; j < NUMBER_NODES; j++)
		{
			connectionMatrix[i][j] = false;
		}
	}
	
	//Ensures we don't enter an infinite loop if it is impossible/unlikely to add more connections
	var runs;
	
	//For every node
	for(var i = 0; i < NUMBER_NODES; i++)
	{
		//Starting connections = current starter node connections
		staCons = curCons[i];
		
		//While we have < 4 connections and it's possible to add more
		for(var k = 0; k < 4 - staCons; k++)
		{
			//connPos is the point we try to add a node to
			connPos = i + Math.floor(Math.random() * (NUMBER_NODES - i));
			
			//Reset runs to 0
			runs = 0;
			
			//While the current position is invalid, the same node,
			//or the other node already has too many connections
			while((connectionMatrix[i][connPos] == true || i == connPos || curCons[connPos] >= 4) && runs < 30)
			{
				//connPos is the point we try to add a node to
				connPos = i + Math.floor(Math.random() * (NUMBER_NODES - i));
				
				//Increment runs
				runs = runs + 1;
			}
			
			//If we didn't time out
			if(runs < 30)
			{
				//Mark a new connection at the starting and ending node
				connectionMatrix[i][connPos] = true;
				connectionMatrix[connPos][i] = true;
				
				//Add a connection to the starting and ending node
				curCons[i] 			= curCons[i] + 1;
				curCons[connPos] 	= curCons[connPos] + 1;
				
				//Connect the current node to the other node on it's connection matrix
				connect = new Connector(displayCell[i], displayCell[connPos]);
						
				//Draw the connection we just made
				connect.drawConnection();
			}
		}
	}
	
	//Draws all the circles to the screen
	for(var i = 0; i < NUMBER_NODES; i++)
	{
		displayCell[i].drawToScreen();
	}
	
	//Check which points we have
	//Balloons.outputBalloons();
}
// Function called every frame
function draw() {
	
}
