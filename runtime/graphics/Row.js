/************************************************************************
* * * * * * * * * * * * * *	ROW.JS * * * * * * * * * * * * * * * * * * *
*************************************************************************
* CREATED BY : JARED DYRESON * jareddyreson@csu.fullerton.edu
*************************************************************************
*
* This file contains the implementation of the Row class, which is where
* a chain of Box class instances form a horizontal row.
*
 *************************************************************************/

class Row {
    constructor(size, string, x=0, y=0){
        this.size = size;
        this.string = string;
        this.x = x;
        this.y = y;
        this.container = this.createContainer(x, y);
    }

    createContainer(x, y) {
        /*
         * we convert the string into an array of Boxs
         * here we can display each index correctly in a row like fashion
         * contents can be changed after, so we can even pass into sorting functions directly
        */

        let array = [];
        let indexer = 0;

        let length = this.size * this.string.length;
        let height = length;

        for(var i = 0; i < length; i+=length/this.string.length){
            let p =  new point(x+i, y);
            let box = new Box(p, this.string[indexer++], this.size, this.size);
            array.push(box);
        }
        return array;
    }

    display() {
        // write to the screen
        for(var i = 0; i < this.container.length; ++i){
            this.container[i].drawToScreen(i*this.size, this.x, this.y);
        }
    }
    updateColor(index, color){
        this.container[index].drawToScreen(index*this.size, this.x, this.y, color);
    }
}
