const Carinal = {
    NORTH: 0, // 1
    EAST: 1, // 2
    SOUTH: 2, // 3
    WEST: 3 // 4
}

class Cell {
	/*
     * Returns the dimensions of the cell
    */
    dimensions(){
      return [this.bl.x, this.bl.y, this.z, this.length, this.width];
    }
	
	constructor(bl, content, length=50, width=50, depth=50){
        /*
         * bl: bottom left coordinate
         * length: how many pixels long the box is
         * width: how many pixels wide the box is
         * both of these are defaulted to 10
         * state: which color is the cell
        */
        this.bl = bl;
        this.content = content;
        this.length = length;
        this.width = width;
        this.depth = depth;
        // where all the connections fit to
        this.terminals = this.initializeTerminals();
        this.outDegrees = 0;
	}

    drawToScreen(){
      /*
       * Draw the current square to the screen
      */ 

      stroke('black');
      textFont('Georgia');
      //strokeWeight(2);
      
      let [x1, y1, z1, height, width] = this.dimensions();
      rect(x1, y1, height, width);

      textSize(20);
      fill('white');
      text(this.content, this.bl.x + Math.floor(this.length / 2) - 5, this.bl.y + Math.floor(this.width / 2) + 5);
      fill('black');
    }

    center(){
        /*
         * Get the approximate center of a cell
        */

        return new DPV(
            Math.floor((this.bl.x + this.length)/2),
            Math.floor((this.bl.y + this.width)/2),
            Math.floor((this.bl.z + this.depth)/2)
        )
    }

    initializeTerminals() {
        let halfLength = Math.floor(this.length / 2);
        let halfWidth = Math.floor(this.width / 2);

        return [
            new DPV(this.bl.x + halfLength, this.bl.y),

            new DPV(this.bl.x + this.length, this.bl.y + halfWidth),

            new DPV(this.bl.x + halfLength, this.bl.y + this.width),

            new DPV(this.bl.x, this.bl.y + halfWidth),
        ]
    }

}


class Connector {
    constructor(p1, p2){
        this.p1 = p1;
        this.p2 = p2;
    }

    drawConnection(a, b) {
        let position_1 = this.p1.terminals[a];
        let position_2 = this.p2.terminals[b];

        let [x1, y1] = position_1.position();
        let [x2, y2] = position_2.position();

        let delta = Math.abs(y2 - y1);

        this.p1.drawToScreen();

        let begin = new DPV(x1 + Math.floor(this.p1.bl.x / 2), y1, 0);
        let end = new DPV(x2, y2 , 0);

        line(begin.x, begin.y, end.x, end.y);

        this.p2.drawToScreen();
    }
}

