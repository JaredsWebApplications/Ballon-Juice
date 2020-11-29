class GenPoint
{
	constructor()
	{
		this.V = Math.floor(Math.random() * 8);
		
		if(this.V == 7)
			this.P = Math.floor(Math.random() * 13);
		else
			this.P = Math.floor(Math.random() * 14);
		
		this.D = 19 - this.V - this.P;
	}
	
	//Returns the D, P, and V coordinates in an array
	getDPV()
	{	return [this.D, this.P, this.V];	}
};