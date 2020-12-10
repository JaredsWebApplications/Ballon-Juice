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
    console.log(makeField.reconstruct(0, 1));
    makeField.traverseConnnections(0, bot);
	frameRate(1);
}
// Function called every frame
function draw() {
    if(makeField.displayBotMovement(index))
        index++;
    else
        noLoop();
}
