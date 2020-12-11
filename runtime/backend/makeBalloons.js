/*************************************************************************
* * * * * * * * * * * * * *	makeBalloons.JS * * * * * * * * * * * * * * *
**************************************************************************
* CREATED BY : Mason Godfrey * mgodfrey@csu.fullerton.edu
**************************************************************************
*
* This file contains a field of balloons, and is responsible for several
* key operations of our program. It first creates a field of balloons,
* then generates a connection matrix and creates the connections for each
* node, based on 'move-all' & 'move-fill' connections. It also contains
* functions used in traversal, including our implementation of the Floyd
* Warshall algorithm.
**************************************************************************/
class makeBalloons {
	constructor()
	{
		//Whether the starting/destination points have valid outbound connections
		this.starValid = false;
		this.destValid = false;
		
		//Array containing the final path
        this.pathTaken = [];
		
		//Generated potential point where a balloon may be added
		var Point = new GenPoint;
		
		//Whether or not the point is already added
		var newPoint = false;
		this.connect = new Connector(0, 0);
		
		//Create a new collection of balloons
		let Balloons = new BalloonField;
		this.displayCell = new Cell(new DPV(0,0,0), "0");

		//While we're still adding balloons and we're below the maximum number possible (111)
		for(let i = 0; i < NUMBER_NODES; i++)
		{
			//If this is not a new point
			while(!newPoint)
			{			
				//Create a new potential point
				Point = new GenPoint;

				if(i == 0) //Makes sure that the starting point is not the ending point
					while(Point.getDPV() == [3,13,3])
						Point = new GenPoint;
				else if(i == 1) //Sets the second element equal to the destination location
					Point.setToDestination();

				//Consider it to be a new point
				newPoint = true;
				
				//If this is a valid point
				if(i == 0 || Balloons.checkValid(Point.getDPV()) == true)
				{
					//Add a Balloon with that point
					Balloons.addBalloon(Point.getDPV());
					
					//Initialize a cell to be displayed based on this balloon
					this.displayCell[i] = new Cell(Balloons.getBalloon(i), "0");
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
		this.connectionMatrix = [];
		//Generates connection matrix, and sets the number of connections each element has to 0
		for(let i = 0; i < NUMBER_NODES; i++)
		{
			this.connectionMatrix[i] = [];
			for(let j = 0; j < NUMBER_NODES; j++)
			{
				this.connectionMatrix[i][j] = false;
			}
		}

		//sourceDPV will contain a node to compare against another node
		let sourceDPV = new DPV(19, 0, 0);
		
		//Ised fpr move-all and move-fill connections
		let X1 = 0;
		let Y1 = 0;
		let Z1 = 0;
		let X2 = 0;
		let Y2 = 0;
		let Z2 = 0;
        this.Balloons = Balloons;
		
		//For every node
		for(let i = 0; i < NUMBER_NODES; i++)
		{
			//Update the source DPV
			sourceDPV = this.Balloons.getBalloon(i);
			
			//For every other node
			for(let j = 0; j < NUMBER_NODES; j++)
			{
				//Set X,Y,Z values to the source and destination positions
				let [X1, Y1, Z1] = this.Balloons.getBalloon(i).position();
				let [X2, Y2, Z2] = this.Balloons.getBalloon(j).position();

				if(	//If i != j and we haven't made a connection between i and j
					i != j && this.connectionMatrix[i][j] == false			&&
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
					//If there is at least one outgoing connection from the start, the start point is valid
					if(i == 0 || j == 0)
						this.starValid = true;
					
					//If there is at least one outgoing connection from the destination, the destination is valid
					if(i == 1 || j == 1)
						this.destValid = true;
					
					//Set the connection matrix for this connection
					this.connectionMatrix[i][j] = true;
					this.connectionMatrix[j][i] = true;

					//Increment the outdegree of each node
                    this.Balloons.Balloons[i].outDegree+=1;
                    this.Balloons.Balloons[j].outDegree+=1;
				}
			}
			//Copy this matrix
			this.copyMatrix = this.connectionMatrix;
		}
	}
	
	//Returns whether the current balloon field is valid
	isValid()
	{
		return this.starValid && this.destValid;
	}
	
	//Displays all of the nodes
	displayNodes()
	{
		//If we're drawing the source to the screen and it is valid
		if(NUMBER_NODES >= 1)
			this.displayCell[0].drawToScreen("SOURCE");
		
		//If we're drawing the destination to the screen and it is valid
		if(NUMBER_NODES >= 2)
			this.displayCell[1].drawToScreen("DESTINATION");
		
		//Draws all the circles to the screen if they have a connection
		for(let i = 2; i < NUMBER_NODES; i++)
			this.displayCell[i].drawToScreen();
	}
	
	//Display all of the connections
	displayConns()
	{
		//For every edge
		for(let i = 0; i < NUMBER_NODES; i++)
			for(let j = i; j < NUMBER_NODES; j++)
				if(this.connectionMatrix[i][j] == true)
				{
					//Make a new connection
					this.connect = new Connector(this.displayCell[i], this.displayCell[j]);
					//Draw the connection to the screen
					this.connect.drawConnection();
				}
	}
	
	//Displays the movement of the bot
	displayBotMovement(index) {
		//If this is valid
		if(index < this.pathTaken.length)
		{
			//Set the source and destination to those passed in
			let [source, destination] = this.pathTaken[index];
			let [alpha, index_initial] = source;
			let [omega, index_final] = destination;
			//Make a connection between the source and destination
			this.connect = new Connector(this.displayCell[index_initial], this.displayCell[index_final]);
			//Draw this connection
			this.connect.drawTraversal(increasing);
		}
		//Return whether this was valid
		return index < this.pathTaken.length;
	}

	//Traverse the connections
	traverseConnnections(index, bot, pathway, pos)
	{
		// no outbound nodes or max depth reached
		if(this.connectionMatrix[index].length == 0 || bot.iterations > 20 || bot.foundDestination)
		{
			//Collect path information
			for(let i = 0; i < this.pathTaken.length; i++){
				let [source, destination] = this.pathTaken[i];
				let [alpha, index_initial] = source;
				let [omega, index_final] = destination;
			}
			// end recursive descent
			return;
		}

		// if we move forward, we cannot do that again

		// eventual conditions for termination
		// - we cannot move forward anymore
		// - the node in which we reach has no connections

		//If this is a valid position
		if(pos < pathway.length)
		{
			//Remove this connection
			let selection = pathway[pos++];
			this.copyMatrix[index][selection] = false;
			this.copyMatrix[selection][index] = false;
			
			//Move to this connection
			let node = this.Balloons.Balloons[selection];
			
			//Add this connection to our path
			this.pathTaken.push(
				[[bot.balloon, index], [node, selection]] // the source and the destination
			)
			bot.updatePosition(node);
			this.traverseConnnections(selection, bot, pathway, pos);
		}
		else //If we can't reach the destination
			console.log("unlucky");
    }

	//Implementation of the floyd warshall algorithm
    floyd(){
		//V is the number of nodes we've started with
        let V = NUMBER_NODES;

		//Initialize starting, destination arrays
        this.dist = [];
		this.next = [];
		
		//Initialize both 2d arrays
		for(let u = 0; u < V; u++)
		{
			this.next[u] = [];
			this.dist[u] = [];
			for(let v = 0; v < V; v++)
			{
				this.dist[u][v] = Number.POSITIVE_INFINITY;
				this.next[u][v] = null;
			}
		}
		
		//If there's a connection between two nodes
		for(let u = 0; u < V; u++)
			for(let v = 0; v < V; v++)
				if(this.connectionMatrix[u][v])
				{
					//Update weight to 1
					this.dist[u][v] = 1;
					
					//Update next node to point to the second node
					this.next[u][v] = v;
				}
		
		//Reset all diagonal information
		for(let v = 0; v < V; v++)
		{
			this.dist[v][v] = 0;
			this.next[v][v] = v;
		}

		//Generate paths between two different nodes
        for(let k = 0; k < V; k++)
            for(let i = 0; i < V; i++)
                for(let j = 0; j < V; j++) {
					//Let a, b equal the distance weights between the two nodes
                    let a = this.dist[i][k];
                    let b = this.dist[k][j];

					//If the current weight is larger
                    if(this.dist[i][j] > (a + b))
					{
						//reduce the weight to a + b
                        this.dist[i][j] = (a + b);
						//Update the next node on the path
						this.next[i][j] = this.next[i][k];
					}
                }	
    }
	
	//Reconstruct the shortest distance path
    reconstruct(u, v) {
		//If there is no path, return an empty set
        if(this.next[u][v] == null)
            return [];
		else {
			//Build a path and return it
			let path = [];
			path.push(u);
			while(u != v){
				u = this.next[u][v];
				path.push(u);
			}
			return path;
		}
    }
}
