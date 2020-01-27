class City {
    constructor (name, state, latitude, longitude) {
        this.name = name;
        this.state = state;
        this.latitude = latitude; // широта
        this.longitude = longitude; //долгоат
    }

    toString() {
        return `${this.name}, ${this.state}, ${this.latitude}, ${this.longitude};`
    }
}

export default City;