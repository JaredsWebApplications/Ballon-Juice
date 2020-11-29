/*************************************************************************
* * * * * * * * * * * * * *	RNG.JS * * * * * * * * * * * * * * * * * * * *
**************************************************************************
* CREATED BY : JARED DYRESON * jareddyreson@csu.fullerton.edu
*************************************************************************
*
* This file contains the implementation of an RNG class to generate DPV coordinates
*
 *************************************************************************/

var DIR = {
    HORIZONTAL: 0,
    VERTICAL : 1,
    DIAG : 2
};

class RNG {
    constructor() {
        this.version = 1.0;
    }

    numberInRange(low, high) {
        /*
         * Thank you -> https://stackoverflow.com/a/1527820
        */
        return Math.floor(Math.random() * (high - low) + low);
    }

    generateRange(n, k) {
        /*
         * Get container of numbers in a given range
         * n to k
        */

        let container = [];
        for(let i = n; i < k; ++i){ container.push(i); }
        return container;
    }

    generateDPV() {
        let d, p, v, leftover;

        d = this.numberInRange(6, 19);
        if(d == 19){
            [p, v] = [0, 0];
        } else {
            leftover = 19 - d;
            p = this.numberInRange(0, leftover);
            v = 19 - d - p;
        }
        return (d + p + v == 19) ? [d, v, p] : [-1, -1, -1];

    }

    generateMovement() {
        /*
         * Our goal is to maintain the summation to 19 principle and also to have each coordinate to be greater than or equal to 0
        */

        let container = this.generateDPV();
        let [d, p, v] = container;
        let displacement;


        // Roll on which axis to move
        
        let directionality = this.generateRange(0, 3);
        let position = Math.floor(Math.random() * directionality.length);

        // horizontal, vertical, diagonal (z-axis)

        let direction_a = directionality[position];
        directionality.splice(position, 1);


        // let's say we want to move postively in any given direction

        displacement  = Math.abs(19 - container[direction_a]);

        // move a random amount in that range
        // if we have a maximum movement of 10 paces, we can get any number from 0, 10
        // we also need to determine which is the min and max of the range
        let random_movement = this.numberInRange(0, container[position]);
       
        // what's leftover after doing our first roll
        let position_two = Math.floor(Math.random() * directionality.length);
        let direction_b = directionality[position_two];

        let random_movement_two = this.numberInRange(0, container[position_two]);

        // How much can the bot move on an axis
        // Bounding it between the two random numbers generated because we know that they cannot exceed the value in question
        // and maintain the <= 0 property

        let actual = this.numberInRange(random_movement, random_movement_two);

        // We move up the given displacement on the selected axis

        container[position]+=actual;

        // We move down via the given displacement on other axis

        container[position_two]-=actual;

        return container;
    }
}

let rando = new RNG();

for(let i = 0; i < 1000; ++i) {
    let container = rando.generateDPV();
    let [x, y, z] = container;
    if(y > 13){
        console.log(`Error at index ${i}!!!!!\n`);
        break;
    }
}
