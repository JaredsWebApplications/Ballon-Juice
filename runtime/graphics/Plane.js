/*************************************************************************
* * * * * * * * * * * * * *	PLANE.JS * * * * * * * * * * * * * * * * * * * 
**************************************************************************
* CREATED BY : JARED DYRESON * jareddyreson@csu.fullerton.edu
*************************************************************************
*
* This file contains the implementation of the plane class, which is where 
* the quadrants and other components of this project reside
* It also defines the boundaries of each quadrant dynamically based on screen size and is passed the respective quadrant object
*
 *************************************************************************/

class Plane {
    constructor(length, height){
        /*
         * length, height: determine size of the Cartesian plane
         * middle: find center divider
         * quadrants: each quadrant for a given plane, interfaced via n-1 indexing. Quadrant 1 is at index 0, so on..
        */
        this.length = length;
        this.height = height;
        this.hmiddle = Math.floor(this.length/2);
        this.vmiddle = Math.floor(this.height/2);
        this.quadrants = this.partition();
    }

    display(){
        /*
         * Draw to the screen
        */
        line(this.hmiddle, 0, this.hmiddle, this.height); // vertical line
        line(0, this.vmiddle, this.length, this.vmiddle); // horizontal line
    }

    partition(){
        let container = [];

        container.push(new Quadrant(
                        [0, this.hmiddle],
                        [0, this.hmiddle]
                      )
        ) // 1

        container.push(new Quadrant(
                        [this.hmiddle+1, this.length],
                        [0, this.hmiddle]
                      )
        ) // 2


        container.push(new Quadrant(
                        [0, this.hmiddle],
                        [this.hmiddle+1, this.height]
                      )
        ) // 3

        container.push(new Quadrant(
                        [this.hmiddle+1, this.length],
                        [this.hmiddle+1, this.height]
                      )
        ) // 4
        return container;
    }

}
