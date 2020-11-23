var x = 0;
var speed = 3;

// Spring force animation
//
// https://www.khanacademy.org/computer-programming/spring-forces/5216480855588864

class Ball {
    constructor(speed = 3){
        this.speed = speed;
        this.constant = this.speed;
        this.x = Math.floor(windowWidth / 2);
        this.y = height;
        this.elapsed_time = 0;
        this.diameter = 100;
        this.color = color('blue');
        this.flag = false;
    }

    draw() {
        stroke(255);
        strokeWeight(4);
        fill(this.color);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    }

    move(){
        let randomness = this.constant + (this.constant * -Math.random());
        if(Math.abs(this.y) > height){
            this.speed = -this.constant - randomness;
        } 
        else if(Math.abs(this.y) <= Math.floor(height / 2)){
            this.speed = this.constant + randomness;
        }
        this.y+=(this.speed);
        this.draw(this.y);
    }

    clicked() {

        let distance = dist(mouseX, mouseY, this.x, this.y);

        if(distance < Math.floor(this.diameter / 2)){
            if(!this.flag){ this.color = color('red'); this.flag = true; }
            else { this.color = color('blue'); this.flag = false; }
        }
    }
}

let B;

function mousePressed() {
    B.clicked();
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    B = new Ball(1);
}

function draw(){
    background(0);
    B.move(); 
}
