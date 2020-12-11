/************************************************************************
* * * * * * * * * * * * * *	CELL.JS * * * * * * * * * * * * * * * * * * *
*************************************************************************
* CREATED BY : JARED DYRESON * jareddyreson@csu.fullerton.edu
*************************************************************************
*
* This file contains the implementation of the Box class, which is where each
* index of a given string is displayed on to the screen.
*
 *************************************************************************/

class Box {
	/* Returns the dimensions of the box */
    dimensions() {
      return [this.bl.x, this.bl.y, this.length, this.width];
    }

	constructor(bl, content, length=5, width=5){
        /*
         * bl: bottom left coordinate
         * length: how many pixels long the box is
         * width: how many pixels wide the box is
         * both of these are defaulted to 10
         * state: which color is the box
        */
        this.bl = bl;
        this.content = content;
        this.length = length;
        this.width = width;
	}

    drawToScreen(position, x, y, colorMe=true){
      /*
       * Draw the current square to the screen
      */

          //fill('green');
      stroke('black');
      strokeWeight(1);

      let [x1,y1,height,width] = this.dimensions();
      rect(x1, y1, height, width);

      textSize(18);

	  //fill("black");
	  strokeWeight(0)
      text(this.content, x+position+5, y+20);
	  strokeWeight(1);
    }

    center() {
        /*
         * Get the approximate center of a box
        */

        return new point(
            Math.floor((this.bl.x + this.length)/2),
            Math.floor((this.bl.y + this.width)/2)
        )
    }
}
