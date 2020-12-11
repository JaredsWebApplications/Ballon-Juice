/*************************************************************************
* * * * * * * * * * * * * *	BALLON.JS * * * * * * * * * * * * * * * * *  *
**************************************************************************
* CREATED BY : JARED DYRESON * jareddyreson@csu.fullerton.edu
*			   MASON GODFREY * mgodfrey@csu.fullerton.edu
**************************************************************************
*
* This file contains both the implentation for balloons and a collection
* of balloons (balloonfield). A balloon stores its coordinates,
* outdegree. A balloonfield can add add balloons to itself, check if
* their coordinates are valid, output all balloons, and get balloons by
* index.
*
**************************************************************************/

class Balloon {
    constructor(coordinate){
        this.coordinate = coordinate;
        this.outDegree = 0;
    }
}

//A collection of Balloons
class BalloonField {
	
	//Class constructor
	constructor() 
	{
		//Create a temporary balloon that will be replaced
		this.Balloons = new Balloon(0,0,19);
		
		//Number of balloons currently stored
		this.index = 0;
	}
	
	//Add a balloon to the BalloonField
	addBalloon(coordinate)
	{
		//Create a new balloon
		this.Balloons[this.index] = new Balloon(coordinate);
		
		//Increment the number of stored balloons
		this.index = this.index + 1;
	}
	
	//Check whether the current balloon would be valid (in a new location) if added
	checkValid(coordinate)
	{	
		//For every balloon we have so far
		for(let i = 0; i < this.index; i++)
		{
			//If this balloon is already in the field
			if(this.Balloons[i].coordinate[0] == coordinate[0] && this.Balloons[i].coordinate[1] == coordinate[1])
			{
				return false;
			}
		}
		return true;
	}
	
	//Outputs all balloon locations and the total number of balloons
	outputBalloons()
	{
		for(let i = 0; i < this.index; i++)
			console.log(this.Balloons[i].coordinate[0] + " " + this.Balloons[i].coordinate[1] + " " + this.Balloons[i].coordinate[2]);
		console.log((this.index) + " balloons total.");
	}
	
	//If i < index, return the balloons DPV values, otherwise return -1.
	getBalloon(i) {
		if(i < this.index)
			return new DPV(this.Balloons[i].coordinate[0], this.Balloons[i].coordinate[1], this.Balloons[i].coordinate[2]);
		else
			return -1;
	}
}
