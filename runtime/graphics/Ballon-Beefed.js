class BallonBeefed {
    constructor(balloon){
        this.balloon = balloon;
        this.innerWidth = 1916;
        this.innerHeight = 922;
        this.createInformation();
    }

    createInformation() {
        let _text;
        _text = createGraphics(400, 400);
        _text.fill('black');
        _text.textAlign(CENTER);
        _text.textSize(32);
        _text.text('penis', 100, 100);
        this.information = _text;
    }

    displayInformation() {
        texture(this.information);
        plane(300, 200);
    }


    displayTorus () {
        translate(240, 0, 0);
        normalMaterial();
        push();
        rotateZ(frameCount * 0.01);
        rotateX(frameCount * 0.01);
        rotateY(frameCount * 0.01);
        torus(70, 20);
        pop();
    }
}
