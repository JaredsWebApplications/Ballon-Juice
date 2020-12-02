class BalloonBeefed {
    constructor(balloon, namespace){
        this.namespace = namespace;
        this.balloon = balloon;
        this.innerWidth = 1916;
        this.innerHeight = 922;
        this.information = this.createInformation();
    }

    createInformation() {
        let container = [];

        let _text = this.createLabel('outdegree: 0', new DPV(250, 25, 0));
        let text = this.createLabel('coordinate: (0, 0, 0)', new DPV(250, 50, 0));

        container.push(_text);
        container.push(text);
        return container;
    }

    createLabel(content, point) {
        let [x, y] = point.position();
        let _text;
        _text = this.namespace.createGraphics(500, 500);
        _text.fill('black');
        _text.textAlign(this.namespace.CENTER);
        _text.textSize(20);
        _text.text(content, x, y);
        return _text;
    }



    displayInformation() {
        let [x, y] = this.information;
        this.dI(x, 500, 500);
        this.dI(y, 500, 500);
    }
    dI (component, w, h){
        this.namespace.normalMaterial();
        this.namespace.texture(component);
        this.namespace.plane(w, h);
    }


    displayTorus () {
        this.namespace.background(250);
        this.namespace.translate(0, 0, 0);
        this.namespace.normalMaterial();
        this.namespace.push();
        this.namespace.rotateZ(this.namespace.frameCount * 0.01);
        this.namespace.rotateX(this.namespace.frameCount * 0.01);
        this.namespace.rotateY(this.namespace.frameCount * 0.01);
        this.namespace.torus(70, 20);
        this.namespace.pop();
    }
}
