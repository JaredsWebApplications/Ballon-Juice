let flag = false;
let initial = true;

var nodeFieldPlane = function(node) {
    node.delegator;

    node.setup = function() {
        node.createCanvas(500, 500);
        node.background('white');
        node.delegator = new PlaneDelegator(node); //<-- pass the p as parameter in the constructor
    }
}

var informationPlane = function(information){
    information.delegator;
    information.number = 0;
    information.Beefed = new BalloonBeefed(100, information);
    information.container = information.Beefed.information;

    [information.x, information.y, information.z] = new DPV(0, 0, 0).position();

    information._text;
    information. _text = information.createGraphics(500, 500);
    information._text.fill('black');
    information._text.textAlign(information.CENTER);
    information._text.textSize(20);
    information._text.text(`Outdegree: ${information.number}`, 250, 25);
    information._text.text(`Coordinate: (${information.x}, ${information.y}, ${information.z})`, 250, 50);

    information.display = function() {
        information.Beefed.displayInformation();
        information.Beefed.displayTorus();
    }

    information.setup = function() {
        information.createCanvas(information.windowWidth, information.windowHeight, information.WEBGL);
        //information.delegator = new PlaneDelegator(information);
    }


    information.draw = function() {

        if(flag){
            noLoop();
        } else {

            information.background(250);

            information.normalMaterial();

            information.translate(240, 0, 0);
            information.push();
            information.rotateZ(information.frameCount * 0.02);
            information.rotateX(information.frameCount * 0.02);
            information.rotateY(information.frameCount * 0.02);
            information.torus(70, 20);
            information.pop();

            information.texture(information._text);
            information.plane(500, 500);
        }
    }
}

//class PlaneDelegator {
    //constructor(plane) {
        //this.plane = plane; // <-- save the for reuse
    //}

    //render() {
        //this.plane.display();
    //}
//}
//c
function Shape(x, y){
    this.x = x;
    this.y = y;

    this.display = function(){
        ellipse(this.x, this.y, 50, 50);
    }
    this.clicked = function(){
        alert(`Position: ${this.x}, ${this.y}`);
    }
}

let plane;
let S;

function mousePressed() { 
    //if(flag){ remove(); }
  // Check if mouse is inside the circle
  let d = dist(mouseX, mouseY, 360, 200);
  let another = plane.dist(plane.mouseX, plane.mouseY, plane.windowWidth, plane.windowHeight);
  if (d < 100) {
    //flag = (!flag) ? true : false;
    //remove();
    //plane.redraw(100);
    // Pick new random color values
    r = random(255);
    g = random(255);
    b = random(255);
  }
  if(mouseY >= 500){
     plane.remove();
  }
}

function setup(){
    if(initial){
        createCanvas(windowWidth, 500);
        S = new Shape()
        r = random(255);
        g = random(255);
        b = random(255);
    } else {
        createCanvas(0, 0);
    }

    plane = new p5(informationPlane);
}

function draw() {
  background(250);
  // Draw a circle
  strokeWeight(2);
  stroke(r, g, b);
  fill(r, g, b, 127);
  ellipse(360, 200, 200, 200);
}

