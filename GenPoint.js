class GenPoint
{
	constructor() {
		this.D = 0;
		this.P = 0;
		this.V = 0;
		for(let index = 0; index < 19; index++)
		{
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
	getDPV()
	{
		return [this.D, this.P, this.V];
	}
};