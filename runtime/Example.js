const Carinal = {
    NORTH: 0, // 1
    EAST: 1, // 2
    SOUTH: 2, // 3
    WEST: 3 // 4
}

class N {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.diameter = 20;
    }
    position(){ return [this.x, this.y]; }
    draw(){
        ellipse(this.x, this.y, this.diameter, this.diameter);
        fill('red');
    }

    initializeTerminals() {
        let halfLength = Math.floor(this.diameter / 2);
        let halfWidth = halfLength;

        return [
            new DPV(this.x + halfLength, this.y),

            new DPV(this.x + this.diameter, this.y + halfWidth),

            new DPV(this.x + halfLength, this.y + this.diameter),

            new DPV(this.x, this.y + halfWidth),
        ]
    }
}

class Connector {
    constructor(p1, p2){
        this.p1 = p1;
        this.p2 = p2;
    }

    drawConnection(a, b) {
        //let position_1 = this.p1.terminals[a];
        //let position_2 = this.p2.terminals[b];

        //let [x1, y1] = position_1.position();
        //let [x2, y2] = position_2.position();

        this.p1.draw();

        //let begin = new DPV(x1 + Math.floor(this.p1.bl.x / 2), y1, 0);
        //let end = new DPV(x2, y2 , 0);

        //line(begin.x, begin.y, end.x, end.y);

        this.p2.draw();
    }
}


let container;
let matrix;

function setup(){
   createCanvas(600, 400);
   matrix = [
        [0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0]
  ];

    container = [
        new N(100, 100), // node 1
        new N(100, 50), // node 2
        new N(150, 100), // node 3
        new N(50, 100), // node 4
        new N(100, 150) // node 5

    ];

}

function randomRange(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw(){
    for(let i = 0; i < container.length; ++i){
        container[i].draw();
    }
    let rand = randomRange(0, container.length);
    alert(rand);
    container[rand].draw();
    fill('yellow');
    //for(let x = 0; x < matrix.length; ++x){
        //for(let y = 0; y < matrix[x].length; ++y){
            //if(matrix[x][y] == 1){
                //let a = container[x];
                //let b = container[y];
                //console.log(`(${a.x}, ${a.y}) ---> (${b.x}, ${b.y})`);
            //}
        //}
}


//}
