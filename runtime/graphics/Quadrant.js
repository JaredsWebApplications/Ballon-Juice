/****************************************************************************
* * * * * * * * * * * * * *	QUADRANT.JS * * * * * * * * * * * * * * * * * * *
*****************************************************************************
* CREATED BY : JARED DYRESON * jareddyreson@csu.fullerton.edu
*************************************************************************
*
* This file contains the implementation of the quadrant class, which is where each
* each row and algorithm resides.
*
 *************************************************************************/

class Quadrant {
    constructor(x_ran, y_ran){
        this.x_range = x_ran;
        this.y_range = y_ran;
    }

    between(val, range){
        /*
         * Check if a value is in range of values
        */
        let [min, max] = range;
        return(min <= val && max >= val);
    }

    value_in_range(coordinate){
        /*
         * Given two ranges, check if a coordinate lies in it
        */
        let [x, y] = coordinate.position();
        let x_in = this.between(x, this.x_range);
        let y_in = this.between(y, this.y_range);
        return (x_in && y_in);
    }

    center(){

        /*
         * Get the approximate center of a quadrant
        */

        let [x_0, x_f] = this.x_range;
        let [y_0, y_f] = this.y_range;

        return new point(
            Math.floor((x_0 + x_f)/2),
            Math.floor((y_0 + y_f)/2)
        )
    }

    writeLabel(content, coordinate) {

      let [x, y] = coordinate.position();
      textSize(16);
      text(content, x, y);
    }

    writeRow(content){
      content.display();
    }
}
