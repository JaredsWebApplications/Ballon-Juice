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

class Grid {
    constructor(){
        this.rows = 40;
        this.matrix = this.generateMatrix();
    }
    generateMatrix(){
        let mat = [];
        let size = 40;

        let length = size*50;
        let height = size*50;

        for(let x = 0; x < length; x+=length/size) {
          let arr = [];
          for(let y = 0; y < height; y+=height/size) {
            let cell = new Cell(new DPV(x, y, 0), "filler");
            arr.push(cell);
          }
          mat.push(arr);
        }
        return mat;
    }

    drawToScreen() {
        for(let i = 0; i < this.rows/4; ++i){
            for(let j = 0; j < this.rows/4; ++j){
                this.matrix[i][j].drawToScreen();
            }
        }
    }
}
