/*************************************************************************
* * * * * * * * * * * * * *	DPV.JS * * * * * * * * * * * * * * * * * * * *
**************************************************************************
* CREATED BY : JARED DYRESON * jareddyreson@csu.fullerton.edu
*************************************************************************
*
* This file contains the implementation of the point class, which represents
* Cartesian points on a three dimensional plane
*
 *************************************************************************/

class DPV {
	constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
	}

	//location of the current cell
	position() {
		return [this.x, this.y, this.z];
	}
}

