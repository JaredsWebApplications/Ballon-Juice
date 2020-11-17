const Carinal = {
    NORTH: 0, // 1
    EAST: 1, // 2
    SOUTH: 2, // 3
    WEST: 3 // 4
}

function setup() {
    createCanvas(1000, 1000, WEBGL);
	//frameRate(60);
}

function draw() {
  //background(250);
  //normalMaterial();
  //let translationCoordinate = new DPV(240, 0, 0);
  //let boxCoordinate = new DPV(70, 70, 70);

  //let [x, y, z] = translationCoordinate.position();

  //translate(x, y, z);
  //push();
  //rotateZ(frameCount * 0.01);
  //rotateX(frameCount * 0.01);
  //rotateY(frameCount * 0.01);
  //let [a, b, c] = boxCoordinate.position();
  //box(a, b, c);
  //pop();

  //let C = new Cell(new DPV(10, 10, 10))
  //box(70, 70, 70);
  //line(70, 70, 70, 70);
  //rect(30, 20, 55, 55);
  //line(30, 10, 85, 75);
  //rect(150, 20, 55, 55);
    let cell_one = new Cell(new DPV(0, 0, 0), "0");
    let cell_two = new Cell(new DPV(0, 100, 0), "0");

    let C = new Connector(cell_one, cell_two);
    //alert(C.delta());
    C.drawConnection(Cardinal.SOUTH, Cardinal.NORTH);
}
