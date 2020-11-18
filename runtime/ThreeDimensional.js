let flag = true;

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


    //information.container = [
        //new Cell(new DPV(0, 0, 0), "0"),
        //new Cell(new DPV(30, 100, 0), "2"),
        //new Cell(new DPV(0, 100, 0), "1"),
        //new Cell(new DPV(-30, 100, 0), "1"),
        //new Cell(new DPV(100, 0, 0), "3")
    //];

    information.display = function() {
        information.Beefed.displayInformation();
        information.Beefed.displayTorus();
    }

    information.setup = function() {
        information.createCanvas(information.windowWidth, information.windowHeight, information.WEBGL);
        information.delegator = new PlaneDelegator(information);
    }


    information.draw = function() {

        if(flag){
            noLoop();
        } else {

            information.background(250);

            information.normalMaterial();

            information.translate(240, 0, 0);
            information.push();
            information.rotateZ(information.frameCount * 0.01);
            information.rotateX(information.frameCount * 0.01);
            information.rotateY(information.frameCount * 0.01);
            information.torus(70, 20);
            information.pop();

            information.texture(information._text);
            information.plane(500, 500);
        }
    }
}

class PlaneDelegator {
    constructor(plane) {
        this.plane = plane; // <-- save the for reuse
    }

    render() {
        this.plane.display();
    }
}

let plane;

function mouseClicked() {
    //plane.Beefed.displayInformation();
    flag = (!flag) ? true : false;
}
function setup(){
    createCanvas(50, 50, WEBGL);
    plane = new p5(informationPlane);
}

function draw() {
    //plane.delegator.render();
    //this.namespace.background(250);
    //this.namespace.translate(0, 0, 0);
    //this.namespace.normalMaterial();
    //this.namespace.push();
    //this.namespace.rotateZ(this.namespace.frameCount * 0.01);
    //this.namespace.rotateX(this.namespace.frameCount * 0.01);
    //this.namespace.rotateY(this.namespace.frameCount * 0.01);
    //this.namespace.torus(70, 20);
    //this.namespace.pop();
}

