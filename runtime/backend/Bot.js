class Bot {
    constructor(coordinate) {
        // Current DPV value
        this.balloon = coordinate;
        this.foundDestination = false;
        this.randomGenerator = new RNG();
        this.iterations = 0;
    }

    didFindDestination(){
        let [d, p, v] = this.balloon.coordinate;
        if(d == 3 && p == 13 && v == 3){ this.foundDestination = true; }
    }

    updatePosition(position){
        this.balloon = position;
        this.iterations++;
        this.didFindDestination(); // if it does
    }

}
