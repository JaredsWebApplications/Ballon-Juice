let _text;
let Beefed;
let G;
let container = [];
let leftBuffer;
let flag = true;

var simplePlane = function(simple) {
    simple.setup = function() {
        simple.createCanvas(500, 500);
        simple.background('white');
        simple.textSize(32);
        simple.text('word', 10, 30);
        for(let i = 0; i < container.length; ++i){
            container[i].drawToScreen();
        }
    }
    
    simple.draw = function() {
    }
}

var anotherPlane = function(s){
    s.flag = true;
    s.setup = function() {
        //s.background('gray');
        s.createCanvas(s.windowWidth, s.windowHeight, s.WEBGL);
        s.Beefed = new BalloonBeefed(100, s);
        s.container = [

            new Cell(new DPV(0, 0, 0), "0"),
            new Cell(new DPV(30, 100, 0), "2"),
            new Cell(new DPV(0, 100, 0), "1"),
            new Cell(new DPV(-30, 100, 0), "1"),
            new Cell(new DPV(100, 0, 0), "3")
        ];
    }
    s.draw = function() {
       s.Beefed.displayTorus();
       s.Beefed.displayInformation();
    }
    s.mousePressed = function() {
        if(s.mouseX >= -50 && s.mouseX <= 50){
            alert("in the box");
            s.flag = true ? (!s.flag) : false;
        }
    }
}

function setup(){
    createCanvas(500, 500);
}

function draw() {
    var plane = new p5(anotherPlane);
}

