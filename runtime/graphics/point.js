/*************************************************************************
* * * * * * * * * * * * * *	POINT.JS * * * * * * * * * * * * * * * * * * *
**************************************************************************
* CREATED BY : JARED DYRESON * jareddyreson@csu.fullerton.edu
*************************************************************************
*
* This file contains the implementation of the point class, which represents
* Cartesian points on a plane
*
 *************************************************************************/

class point {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	//location of the current cell
	position() {
		return [this.x, this.y];
	}
}
