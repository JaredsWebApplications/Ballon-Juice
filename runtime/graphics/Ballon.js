/*************************************************************************
* * * * * * * * * * * * * *	BALLON.JS * * * * * * * * * * * * * * * * *  *
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

    valid() {
        return (this.x + this.y + this.z) <= 19;
    }
}

class Ballon {
    constructor(coordinate){
        this.coordinate = coordinate;
        this.outDegree = 0;
        this.connections = this.makeConnections();
    }

    makeConnections(maxConnections=4) {
        let container = new Array();
        let flag = true;
        while(container.length < maxConnections){
            let x = this.generator();
            let y = this.generator();
            if(x == y){ continue; }
            let point = new DPV(x, y);
            for(let i = 0; i < container.length; ++i){
                if(container[i] == point){
                    flag = false;
                    break;
                }
            }
            if(flag){ container.push(point); }
            flag = true;
        }
        return container;
    }
    generator(range=40) {
        return Math.floor(Math.random() * range) + 1;
    }
}

let B = new Ballon(1);
console.log(B.connections);
