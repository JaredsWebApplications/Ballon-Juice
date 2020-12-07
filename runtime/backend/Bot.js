class Bot {
    constructor(coordinate) {
        // Current DPV value
        this.balloon = coordinate;
        this.coordinate = this.balloon.coordinate;
        this.foundDestination = false;
        this.randomGenerator = new RNG();
        this.iterations = 0;
    }

    moveBotRandomly() {
       let point = this.coordinate;
       this.coordinate = this.randomGenerator.generateMovement(point);
       let [D, P, V] = this.coordinate;
       if(D == 3 && P == 13 && V == 3){ this.foundDestination = true; }
    }

    updatePosition(position){
        this.coordinate = position;
        this.iterations++;
    }

}
