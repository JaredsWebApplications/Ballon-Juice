function setup() {
    createCanvas(1000, 1000);
}

function draw() {
    let container = [
        new Cell(new DPV(0, 0, 0), "0"),
        new Cell(new DPV(0, 100, 0), "1"),
        new Cell(new DPV(100, 100, 0), "2"),
        new Cell(new DPV(100, 0, 0), "3")
    ];

    //for(let i = 0; i < 4; ++i){
        //if(i % 2 == 0){
            //let C = new Connector(container[i], container[i+1]);
            //C.drawConnection(2, 0);
        //}
    //}

    let C = new Connector(container[0], container[2]);
    C.drawConnection(2, 0);

    let C2 = new Connector(container[1], container[3]);
    C2.drawConnection(1, 3);



    translate(240, 0, 0);
     push();
     rotateZ(frameCount * 0.01);
     rotateX(frameCount * 0.01);
     rotateY(frameCount * 0.01);
     torus(70, 20);
     pop();
    //cell_three.drawToScreen();
    //cell_four.drawToScreen();
}
