class makeBalloons {
	constructor()
	{
		this.starValid = false;
		this.destValid = false;
        this.pathTaken = [];
		//Generated potential point where a balloon may be added
		var Point = new GenPoint;
		
		//Whether or not the point is already added
		var newPoint = false;
		this.connect = new Connector(0, 0);

		var generator = new RNG();
		
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

				//Sets the second element equal to the destination location
				if(i == 0)
				{
					while(Point.getDPV() == [3,13,3])
						Point = new GenPoint;
				}
				else if(i == 1)
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

		let sourceDPV = new DPV(19, 0, 0);
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
			sourceDPV = this.Balloons.getBalloon(i);
			
			for(let j = 0; j < NUMBER_NODES; j++)
			{
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
					if(i == 0 || j == 0)
						this.starValid = true;
					
					if(i == 1 || j == 1)
						this.destValid = true;
						
					this.connectionMatrix[i][j] = true;
					this.connectionMatrix[j][i] = true;

                    this.Balloons.Balloons[i].outDegree+=1;
                    this.Balloons.Balloons[j].outDegree+=1;
				}
			}
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
			//Draws all the circles to the screen if they have a connection
		for(let i = 0; i < NUMBER_NODES; i++)
			this.displayCell[i].drawToScreen();
	}
	
	//Display all of the connections
	displayConns()
	{
		for(let i = 0; i < NUMBER_NODES; i++)
			for(let j = i; j < NUMBER_NODES; j++)
			{
				if(this.connectionMatrix[i][j] == true)
				{
					this.connect = new Connector(this.displayCell[i], this.displayCell[j]);
					this.connect.drawConnection();
				}
			}
	}

    traverseConnnections(index, bot){
        // no outbound nodes or max depth reached
        if(this.connectionMatrix[index].length == 0 || bot.iterations > 20 || bot.foundDestination){
            if(bot.foundDestination){
                console.log("hey we did it guys!");
            } else {
                console.log("hit a dead end");
            }
            //let[d, p, v] = bot.coordinate;
            //console.log(`Current node with DPV of: (${d}, ${p}, ${v})`);

            for(let i = 0; i < this.pathTaken.length; i++){
                let [source, destination] = this.pathTaken[i];
                let [alpha, index_initial] = source;
                let [omega, index_final] = destination;
                console.log(`${alpha.coordinate} (${index_initial}) --> `);
                console.log(`\t${omega.coordinate} (${index_final})`);
            }

            // end recursive descent
            return;
        }

        // if we move forward, we cannot do that again

        // eventual conditions for termination
        // - we cannot move forward anymore
        // - the node in which we reach has no connections

        let sourceStream = this.connectionMatrix[index];
        // randomly take a dive
        let selection = Math.floor(Math.random() * sourceStream.length);
        //let node = this.displayCell[selection];
        let node = this.Balloons.Balloons[selection];
       //  Balloons[index].moveForward = false;

        // we can no longer move forward on this node
        //this.connectionMatrix[index][selection].forward = false;

        this.pathTaken.push(
            //[bot.balloon, node] // the source and the destination
            [[bot.balloon, index], [node, selection]] // the source and the destination
        )
        bot.updatePosition(node);
        this.traverseConnnections(selection, bot);
    }
}
