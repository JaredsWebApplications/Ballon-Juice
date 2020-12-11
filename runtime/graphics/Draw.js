/************************************************************************
* * * * * * * * * * * * * *	DRAW.JS * * * * * * * * * * * * * * * * * * *
*************************************************************************
* CREATED BY : JARED DYRESON * jareddyreson@csu.fullerton.edu
*************************************************************************
*
* This file contains the driver code to display a plane, four quadrants and their
* respective rows.
*
 *************************************************************************/

class displayInterface {
	setup() {
		/*
		* attempting to center the canvas
		*/
		var canvas = createCanvas(windowWidth, windowHeight);
		var x = Math.floor((windowWidth - width) / 2);
		var y = Math.floor((windowHeight - height) / 2);
		canvas.position(x, y);
	}
	draw(inputMatrix) {
		//background(255);
		//stroke(0);

		//let P = new Plane(windowWidth, windowHeight);

        /*
         * Box placement
        */

        let y_naught_box = 0;
        let box_area = 25;

        /*
         * Text placement
        */

        let _text_x_naught = 0-325;
        let _text_y_naught = 0-158;

        //let _text_x_naught = Math.floor(P.hmiddle/2)-325;
        //let _text_y_naught = Math.floor(P.vmiddle/2)-158;

        let _matrix_width = inputMatrix.length;

        for(let i = 0; i < _matrix_width; ++i){
            if(i > 0){
                _text_y_naught+=(box_area);
            }
            y_naught_box+=box_area;
            textSize(10);
            //text(i, _text_x_naught, _text_y_naught);
            let row_ = new Row(box_area, 
                               inputMatrix[i], 
                               //Math.floor(P.hmiddle/2)+750, 
                               500+750, 
                               //Math.floor(P.vmiddle/2)-(200-y_naught_box)
                               500-(200-y_naught_box)
            );
            //row_.display();
        }
	}
}
