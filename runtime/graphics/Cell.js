const Carinal = {
    NORTH: 0, // 1
    EAST: 1, // 2
    SOUTH: 2, // 3
    WEST: 3 // 4
}

//Sets the distance squares should be apart from eachother on the grid
var GRID_DIST_MULT = 70;

//Multiply the position values by this much when generating colors
var COLOR_MULT = 200;

var EDGE_RADIUS_CURVE = 600;

class Cell {
	/*
     * Returns the dimensions of the cell
    */
    dimensions(){
      return [this.bl.x, this.bl.y, this.z, this.diameter];
    }
	
	constructor(bl, content, diameter=30, depth=50){
        /*
         * bl: bottom left coordinate
         * diameter: how many pixels long the box is
         * both of these are defaulted to 10
        */
		
        this.bl = bl;	//Stores DPV values of the bottom left coordinate
        this.content = content;
		this.diameter = diameter;
        this.depth = depth;
        // where all the connections fit to
        //this.terminals = this.initializeTerminals();
        this.outDegrees = 0;
        //this.label = this.createLabel();
	}

    createLabel(content, point) {
        let x = this.bl.x + Math.floor(this.diameter / 2) - 7;
        let y = this.bl.y + Math.floor(this.diameter / 2) + 7;

        let _text;
        _text = createGraphics(this.diameter, this.diameter);
        _text.fill('black');
        //_text.textAlign(CENTER);
        _text.textSize(20);
        _text.text(this.content, x, y);
        return _text;
    }

    drawToScreen(){
      /*
       * Draw the current square to the screen
      */ 
	  
	  let [xpos, ypos, zpos] = this.bl.position();

      stroke('black');
	  fill(color(xpos*COLOR_MULT % 255,
				 ypos*COLOR_MULT % 255,
				 zpos*COLOR_MULT % 255));
      
      let [x1, y1, z1, diameter] = this.dimensions();
	  circle(x1*GRID_DIST_MULT, y1*GRID_DIST_MULT, diameter);
      

      //texture(this.label);
      //plane(400, 400);
    }

    //this.clicked = function() {
        //alert("you clicked me!");
    //}

    center(){
        /*
         * Get the approximate center of a cell
        */

        return new DPV(
            Math.floor((this.bl.x*GRID_DIST_MULT + this.diameter)/2),
            Math.floor((this.bl.y*GRID_DIST_MULT + this.diameter)/2),
            Math.floor((this.bl.z*GRID_DIST_MULT + this.depth)/2)
        )
    }

    initializeTerminals() {
        let halfLength = Math.floor(this.diameter / 2);
        let halfWidth  = Math.floor(this.diameter / 2);

        return [
            new DPV(this.bl.x + halfLength, this.bl.y),

            new DPV(this.bl.x + this.diameter, this.bl.y + halfWidth),

            new DPV(this.bl.x + halfLength, this.bl.y + this.diameter),

            new DPV(this.bl.x, this.bl.y + halfWidth),
        ]
    }

}


class Connector {
    constructor(p1, p2){
        this.p1 = p1;
        this.p2 = p2;
    }

    drawConnection() {
		//this.p1.center(), this.p2.center();
		
		let [x1, y1, z1] = this.p1.center().position();
		let [x2, y2, z2] = this.p2.center().position();
		
		[x1, y1, z1] = [(x1 - 15)*2, (y1 - 15)*2, (z1 - 15)*2];
		[x2, y2, z2] = [(x2 - 15)*2, (y2 - 15)*2, (z2 - 15)*2];
		
		noFill();
        //line(x1, y1, x2, y2);
		
		let xInc = 1;
		let yInc = 1;
		
		if(x1 < x2)
		{
			xInc = -1;
		}
		
		if(y1 < y2)
		{
			yInc = -1;
		}
		
		curve(x1 + xInc*EDGE_RADIUS_CURVE, y1 + yInc*EDGE_RADIUS_CURVE, x1, y1, x2, y2, x2 + xInc*EDGE_RADIUS_CURVE, y2 + yInc*EDGE_RADIUS_CURVE);
    }
}

