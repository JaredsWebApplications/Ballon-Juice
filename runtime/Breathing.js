var x = 0;
var speed = 3;

// Spring force animation
//
// https://www.khanacademy.org/computer-programming/spring-forces/5216480855588864

class Ball {
    constructor(speed = 3){
        this.speed = speed;
        this.constant = this.speed;
        this.position = new DPV(
            Math.floor(windowHeight / 2),
            height,
            0
        );
        this.diameter = 100;
        this.color = color('blue');
        this.flag = false;
    }

    draw() {
        let [x, y] = this.position.position();
        stroke(255);
        strokeWeight(4);
        fill(this.color);
        ellipse(x, y, this.diameter, this.diameter);
    }

    move(){
        let[x, y] = this.position.position();
        let randomness = this.constant + (this.constant * -Math.random());
        if(Math.abs(y) > height){
            this.speed = -this.constant - randomness;
        } 
        else if(Math.abs(y) <= Math.floor(height / 2)){
            this.speed = this.constant + randomness;
        }
        this.position.y+=(this.speed);
        this.draw(this.position.y);
    }

    clicked() {
        let [x, y] = this.position.position();
        let distance = dist(mouseX, mouseY, x, y);

        if(distance < Math.floor(this.diameter / 2)){
            if(!this.flag){ this.color = color('red'); this.flag = true; }
            else { this.color = color('blue'); this.flag = false; }
        }
    }
    xRange() {
        return [this.x, this.x + this.diameter];
    }
    yRange(){
        return [this.diameter - this.y, this.y];
    }
}

//class CollisionDetector {
    //constructor(){}
    //between(val, range){
        /*
         * Check if a value is in range of values
        */
        //let [min, max] = range;
        //return(min <= val && max >= val);
    //}

    //value_in_range(coordinate){
        /*
         * Given two ranges, check if a coordinate lies in it
        */

        //let [x, y] = coordinate.position();
        //let x_in = this.between(x, this.x_range);
        //let y_in = this.between(y, this.y_range);
        //return (x_in && y_in);
    //}

    //hasCollided(a, b) {

        //return 
    //}

    //inRange(){

    //}
//}

let B;
let Bee;

function mousePressed() {
    B.clicked();
    Bee.clicked();
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    B = new Ball(1);
    Bee = new Ball(1);
    Bee.y = windowHeight;
}

function draw(){
    background(0);
    B.move(); 
    Bee.move();
}
