let _text;
let Beefed;


function setup() {
    createCanvas(1000, 1000, WEBGL);

    //_text = createGraphics(400, 400);
    //_text.fill('black');
    //_text.textAlign(CENTER);
    //_text.textSize(32);
    //_text.text('penis', 100, 100);
    Beefed = new BallonBeefed(100);
}

function draw() {
  background(250);
  normalMaterial();
  
  translate(100, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(50, 20);
  pop();

  Beefed.displayInformation();

  //texture(_text);
  //texture(_text);

}
