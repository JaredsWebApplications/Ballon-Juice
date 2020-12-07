//Number of nodes to add
var NUMBER_NODES = 40;
let bot;

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
    let bot = new Bot(makeField.connectionMatrix[0]);
    makeField.traverseConnnections(0, bot);
}
// Function called every frame
function draw() {
	
}
