/*************************************************************************
* * * * * * * * * * * * * *	Bot.JS * * * * * * * * * * * * * * * * * * * *
**************************************************************************
* CREATED BY : JARED DYRESON * jareddyreson@csu.fullerton.edu
**************************************************************************
*
* This file contains the implementation of the BOT class used for
* the bot's logic. It stores the DPV coordinates that are passed in,
* and is able to determine whether it has reached its destination.
**************************************************************************/
 class Bot {
    constructor(coordinate) {
        // Current DPV value
        this.balloon = coordinate;
		
		//Whether the bot has found its destination
        this.foundDestination = false;
		
		//Number of iterations the bot has been running for
        this.iterations = 0;
    }

    didFindDestination(){
		//Get the DPV values from the bot's current DPV
        let [d, p, v] = this.balloon.coordinate;
		
		//If the DPV values are that of our destination, update
        if(d == 3 && p == 13 && v == 3)
			this.foundDestination = true;
    }

    updatePosition(position){
		//Update the position of the bot (DPV values)
        this.balloon = position;
		
		//Increase the number of iterations the bot has
        this.iterations++;
		
		//Set whether the bot has found its destination
        this.didFindDestination();
    }
}
