/*************************************************************************
* * * * * * * * * * * * * *	RNG.JS * * * * * * * * * * * * * * * * * * * *
**************************************************************************
* CREATED BY : JARED DYRESON * jareddyreson@csu.fullerton.edu
*************************************************************************
*
* This file contains the implementation of an RNG class to generate DPV coordinates
*
 *************************************************************************/

//Number of nodes to add
var NUMBER_NODES = 40;
let bot;
let index = 0;

function setup() {
	
	//Ensure we don't have too many nodes
	if(NUMBER_NODES > 111)
		NUMBER_NODES = 111;
	
	//Creates a new canvas
	createCanvas(1920, 1080);
	
	//Create a new field of balloons
	makeField = new makeBalloons();
	
	//While the start or end have no connections, make a new field
	while(makeField.isValid() == false)
		makeField = new makeBalloons();
	
	//Display all connections
	makeField.displayConns();
	//Display all nodes (will appear over the connections)
	makeField.displayNodes();
    let origin = makeField.Balloons.Balloons[0];
    let bot = new Bot(origin);
	makeField.floyd();
    makeField.traverseConnnections(0, bot, makeField.reconstruct(0, 1), 1);
	frameRate(1);
}

let increasing = true;
let success = true;
// Function called every frame
function draw() {
	success = makeField.displayBotMovement(index, increasing);
	
	//Travel the whole path, then return on the same path.
	if(success && increasing)
		index++;
	else if(success && !increasing && index > 0)
		index--;
	else if(increasing)
	{
		increasing = false;
		index--;
	}
	else
		noLoop();
}
