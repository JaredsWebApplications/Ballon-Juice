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
        let matrix = [];
        for(let i = 0; i < this.rows; ++i){
            matrix[i] = new Array;
            for(let j = 0; j < this.rows; ++j){
                matrix[i][j] = 0;
            }
        }
        return matrix;
    }
}

let G = new Grid();