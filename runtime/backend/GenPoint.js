/*************************************************************************
* * * * * * * * * * * * * *	GenPoint.JS * * * * * * * * * * * * * * * * *
**************************************************************************
* CREATED BY : Mason Godfrey * mgodfrey@csu.fullerton.edu
**************************************************************************
*
* This file randomly generates the DPV values to be given to a node. It
* also has a function to generate the destination's location.
**************************************************************************/
class GenPoint
{
	constructor()
	{
		//Set the V value of the node
		this.V = Math.floor(Math.random() * 8);
		
		//Set the P value of the node
		if(this.V == 7)
			this.P = Math.floor(Math.random() * 13);
		else
			this.P = Math.floor(Math.random() * 14);
		
		//Set the D value of the node
		this.D = 19 - this.V - this.P;
	}
	
	//Sets this node's DPV to the destination's DPV
	setToDestination()
	{
		[this.D, this.P, this.V] = [3, 13, 3];
	}
	
	//Returns the D, P, and V coordinates in an array
	getDPV()
	{	return [this.D, this.P, this.V];	}
};