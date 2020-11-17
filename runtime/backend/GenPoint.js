class GenPoint
{
	constructor()
	{
		this.D = 0;	//Stores the D coordinate
		this.P = 0;	//Stores the P coordinate
		this.V = 0;	//Stores the V coordinate
		
		//While we haven't reached the max value of 19
		for(let i = 0; i < 19; i++)
		{
			//Add 1 to either D, P, or V
			switch(Math.floor((Math.random() * 3)))
			{
				case 0:
					this.D = this.D + 1;
					break;
				case 1:
					this.P = this.P + 1;
					break;
				case 2:
					this.V = this.V + 1;
					break;
			}
		}
	}
	
	//Returns the D, P, and V coordinates in an array
	getDPV()
	{	return [this.D, this.P, this.V];	}
};