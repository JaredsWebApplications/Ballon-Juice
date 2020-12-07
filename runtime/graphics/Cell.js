const Carinal = {
    NORTH: 0, // 1
    EAST: 1, // 2
    SOUTH: 2, // 3
    WEST: 3 // 4
}

//Sets the distance squares should be apart from eachother on the grid
var GRID_DIST_MULT = 50;
var X_OFFSET = 30;
var Y_OFFSET = 1.4*X_OFFSET;

//Multiply the position values by this much when generating colors
var COLOR_MULT = 200;
//Cool values for COLOR_MULT: 	200 	- Seemingly random
//								123 	- Easter colors
//								234 	- Color gradient
//								0x50 	- Vertical pattern
//								[char]	- Black & white

var EDGE_RADIUS_CURVE = 250;
class Cell {
	/*
     * Returns the dimensions of the cell
    */
    dimensions(){
      return [this.bl.x, this.bl.y, this.bl.z, this.diameter];
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
        this.outDegrees = 0;
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
	
	drawToScreen(type){
      /*
       * Draw the current square to the screen
      */ 
	  let [xpos, ypos, zpos] = this.bl.position();

		//Set the stroke to black
		stroke('black');
		
		//Fill based on this color's position
		fill(color(xpos*COLOR_MULT % 255,
				 ypos*COLOR_MULT % 255,
				 zpos*COLOR_MULT % 255));
      
      let [x1, y1, z1, diameter] = this.dimensions();
	  
	  //If this is the first or destination node, make them visually distinct. Otherwise, output the node normally.
	  switch(type)
	  {
		case "DESTINATION":
			fill(color(0, 0, 0));
			triangle((x1)*GRID_DIST_MULT + X_OFFSET, (y1 - .5)*GRID_DIST_MULT + Y_OFFSET,
				(x1 + .4)*GRID_DIST_MULT + X_OFFSET, (y1 + .25)*GRID_DIST_MULT + Y_OFFSET,
				(x1 - .4)*GRID_DIST_MULT + X_OFFSET, (y1 + .25)*GRID_DIST_MULT + Y_OFFSET);
			
			fill(color(255,255,0));
			triangle((x1)*GRID_DIST_MULT + X_OFFSET, (y1 + .5)*GRID_DIST_MULT + Y_OFFSET,
				(x1 - .4)*GRID_DIST_MULT + X_OFFSET, (y1 - .25)*GRID_DIST_MULT + Y_OFFSET,
				(x1 + .4)*GRID_DIST_MULT + X_OFFSET, (y1 - .25)*GRID_DIST_MULT + Y_OFFSET);
			break;
			
			case "SOURCE":
			fill(color(0, 0, 255));
			triangle((x1)*GRID_DIST_MULT + X_OFFSET, (y1 - .5)*GRID_DIST_MULT + Y_OFFSET,
				(x1 + .4)*GRID_DIST_MULT + X_OFFSET, (y1 + .25)*GRID_DIST_MULT + Y_OFFSET,
				(x1 - .4)*GRID_DIST_MULT + X_OFFSET, (y1 + .25)*GRID_DIST_MULT + Y_OFFSET);
			
			fill(color(255,255,255));
			triangle((x1)*GRID_DIST_MULT + X_OFFSET, (y1 + .5)*GRID_DIST_MULT + Y_OFFSET,
				(x1 - .4)*GRID_DIST_MULT + X_OFFSET, (y1 - .25)*GRID_DIST_MULT + Y_OFFSET,
				(x1 + .4)*GRID_DIST_MULT + X_OFFSET, (y1 - .25)*GRID_DIST_MULT + Y_OFFSET);
			break;
			
			case "BOT":
				fill(color(0,0,0));
				circle(x1*GRID_DIST_MULT + X_OFFSET, y1*GRID_DIST_MULT + Y_OFFSET, diameter - (3*z1));
			
			default:
				circle(x1*GRID_DIST_MULT + X_OFFSET, y1*GRID_DIST_MULT + Y_OFFSET, diameter - (3*z1));
			break;
	  }
    }

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
		
		//Let x, y, z equal the positions returned
		let [x1, y1, z1] = this.p1.center().position();
		let [x2, y2, z2] = this.p2.center().position();
		
		//Set the color of this wire equal to what the color would be if we were
		//directly in between these two nodes, and reduce it to get darker colors
		stroke(color(	((abs(x2-x1)/2 + Math.min(x1, x2))*COLOR_MULT % 255)/1.6,
						((abs(y2-y1)/2 + Math.min(y1, y2))*COLOR_MULT % 255)/1.6,
						((abs(z2-z1)/2 + Math.min(z1, z2))*COLOR_MULT % 255)/1.6	));
		
		//Update x, y, z to be centered
		[x1, y1, z1] = [(x1 - 15)*2 + X_OFFSET, (y1 - 15)*2 + Y_OFFSET, (z1 - 15)*2];
		[x2, y2, z2] = [(x2 - 15)*2 + X_OFFSET, (y2 - 15)*2 + Y_OFFSET, (z2 - 15)*2];
		
		//Don't fill
		noFill();
		
		//Is x/y increasing?
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
		
		//Output a curve from x1, y1 to x2, y2
		curve(x1 + xInc*EDGE_RADIUS_CURVE, y1 + yInc*EDGE_RADIUS_CURVE, x1, y1, x2, y2, x2 + xInc*EDGE_RADIUS_CURVE, y2 + yInc*EDGE_RADIUS_CURVE);

        // Increase the out degree

        this.p1.outDegrees+=1;
        this.p2.outDegrees+=1;
    }
}

