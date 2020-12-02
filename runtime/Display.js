//Number of nodes to add
var NUMBER_NODES = 40;
let bot;

function setup() {
	
	//Creates a new canvas
	createCanvas(1920, 1080);
	
	//Generated potential point where a balloon may be added
	var Point = new GenPoint;
	
	//Whether or not the point is already added
	var newPoint = false;
	var connect = new Connector(0, 0);

    var generator = new RNG();
	
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

    var position = generator.numberInRange(2, NUMBER_NODES) 
    bot = new Bot(Balloons.Balloons[position]);
    var amount = 0;
    while(bot.foundDestination == false && amount < 400){
        bot.moveBotRandomly();
        if(bot.foundDestination){
            console.log("found the coordinate!");
        } else {
            console.log("did not find the suspect!");
        }
        ++amount;
    }

    if(amount == 400 && bot.foundDestination == false){
        console.log("no viable connection Jim!");
    }

	
	//Generates connection matrix
	var connectionMatrix = [];
	//Generates connection matrix, and sets the number of connections each element has to 0
	for(var i = 0; i < NUMBER_NODES; i++)
	{
		connectionMatrix[i] = [];
		for(var j = 0; j < NUMBER_NODES; j++)
		{
			connectionMatrix[i][j] = false;
		}
	}

	
	sourceDPV = new DPV(19, 0, 0);
	let X1 = 0;
	let Y1 = 0;
	let Z1 = 0;
	let X2 = 0;
	let Y2 = 0;
	let Z2 = 0;
	//For every node
	for(var i = 0; i < NUMBER_NODES; i++)
	{
		sourceDPV = Balloons.getBalloon(i);
		
		for(var j = i + 1; j < NUMBER_NODES; j++)
		{
			let [X1, Y1, Z1] = Balloons.getBalloon(i).position();
			let [X2, Y2, Z2] = Balloons.getBalloon(j).position();

			if(	i != j 					   	   						&&
				//Generate connections by moving all from one value to one other value
				//C(X, Y, Z) -> C(0, Y + X, Z), Y + X <= 13 || C(0, Y, Z + X) (Z + X <= 7)
				(	(Y2 == Y1 + X1 && X2 == 0) ||
					(Z2 == Z1 + X1 && X2 == 0) ||
					(X2 == X1 + Y1 && Y2 == 0) ||
					(Z2 == Z1 + Y1 && Y2 == 0) ||
					(X2 == X1 + Z1 && Z2 == 0) ||
					(Y2 == Y1 + Z1 && Z2 == 0))						||
				//Generate connections by moving enough from one value to fill up another value
				//C(X, Y, Z) -> C(X - A, Y + A, Z) (Y + A = 13) || C(X - A, Y, Z + A) (Z + A = 7)
				(	(X1 + Y1 == 19 	&& X2 == 19) ||
					(X1 + Z1 == 19 	&& X2 == 19) ||
					(Y1 + X1 == 13 	&& Y2 == 13 && X2 == Y1) ||
					(Y1 + Z1 == 13 	&& Y2 == 13 && Z2 == Y1) ||
					(Z1 + X1 == 7 	&& Z2 == 7 	&& X2 == Z1) ||
					(Z1 + Y1 == 7 	&& Z2 == 7 	&& Y2 == Z1)))
			{
				connectionMatrix[i][j] = true;
				connectionMatrix[j][i] = true;
				
				connect = new Connector(displayCell[i], displayCell[j]);
				
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
