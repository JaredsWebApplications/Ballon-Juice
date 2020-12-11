/*************************************************************************
* * * * * * * * * * * * * *	DISPLAY.JS * * * * * * * * * * * * * * * * * * * *
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
    bot = new Bot(origin);
	makeField.floyd();
    makeField.traverseConnnections(0, bot, makeField.reconstruct(0, 1), 1);
	frameRate(1);
}

let increasing = true;
let success = true;

let a_x;
let a_y;
let b_x;
let b_y;

let y_naught = 100;

// Function called every frame
function draw() {
    textSize(30);
    success = makeField.displayBotMovement(index, increasing);
	
	//Travel the whole path, then return on the same path.
    if(success && increasing){
        let [a, b] = makeField.pathTaken[index];
        [a_x, a_y] = a;
        [b_x, b_y] = b;
        console.log(`(${a_y}) --> (${b_y})\n`, `Distance matrix slice (${a_y}): `, makeField.dist[a_y], '\n', `Next matrix slice  (${a_y}): `, makeField.next[a_y], '\n');
		index++;
    }
    else if(success && !increasing && index > 0){
        let [a, b] = makeField.pathTaken[index];
        [a_x, a_y] = a;
        [b_x, b_y] = b;
        console.log(`(${a_y}) --> (${b_y})\n`, `Distance matrix slice (${a_y}): `, makeField.dist[a_y], '\n', `Next matrix slice  (${a_y}): `, makeField.next[a_y], '\n');
		index--;
    }
	else if(increasing)
	{
        console.log("[+] Currently backtracking..");
		increasing = false;
		index--;
	}
    else if(!success){
        text("UNLUCKY!", 1200, 500);
    }
	else
		noLoop();
}
