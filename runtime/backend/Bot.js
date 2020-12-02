class Bot {
    constructor(coordinate) {
        // Current DPV value
        this.coordinate = coordinate.coordinate;
        this.foundDestination = false;
        this.randomGenerator = new RNG();
    }

    moveBotRandomly() {
       let point = this.coordinate;
       this.coordinate = this.randomGenerator.generateMovement(point);
       let [D, P, V] = this.coordinate;
       if(D == 3 && P == 13 && V == 3){ this.foundDestination = true; }
    }

}
