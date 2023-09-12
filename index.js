const gasPrice = 1.89;

class Vehicle {
    constructor() {
        this.currentSpeed = 0;
        this.gasConsumed = 0;
        this.kmDriven = 0;
        this.expenses = 0;
        this.money = 0;

    }

    drive = () => {

        if (this.tank <= 0) {
            console.log("Out of gas! Please refill the tank.");
            return;
        }

        if (this.tank < 3) {
            console.log("Only a few kilometers left, please refuel");
        }

        this.currentSpeed = this.maxSpeed;
        this.kmDriven += this.kmps;
        this.gasConsumed += this.lps;
        this.tank -= this.lps;
    }

    putGas = () => {
        const maxGas = this.constructor === Motorcycle ? 30 : this.constructor === Car ? 50 : 100;

        if (this.money >= (gasPrice * this.tank)) {
            this.pay(gasPrice * this.tank);
            this.tank = maxGas;
            console.log(`Filled the tank with ${maxGas} liters of gas.`);
        }
        else {
            console.log("Not enough money to fill the tank.");
            return;
        }
    }

    pay = (amount) => {
        this.expenses += amount;
        this.money -= amount;
    }

}

class Motorcycle extends Vehicle {
    constructor() {
        super();
        this.maxSpeed = 120;
        this.tank = 30;
        this.lps = 0.3;
        this.kmps = 1.5;
    }
}

class Car extends Vehicle {
    constructor() {
        super();
        this.maxSpeed = 200;
        this.tank = 50;
        this.lps = 0.5;
        this.kmps = 2;
    }
}

class Truck extends Vehicle {
    constructor() {
        super();
        this.maxSpeed = 100;
        this.tank = 100;
        this.lps = 1;
        this.kmps = 0.9;
    }
}




const motorcycle = new Motorcycle();
motorcycle.money = 60;

function simulateTime(vehicle) {
    const interval = 1000; // 1 second interval
    const fulltank = vehicle.tank;
    const timer = setInterval(() => {
        vehicle.drive();
        console.log(`Current speed: ${vehicle.currentSpeed} km/h`);
        console.log(`Kilometers driven: ${vehicle.kmDriven} km`);
        console.log(`Gas consumed: ${vehicle.gasConsumed} liters`);
        console.log(`Money spent: $${vehicle.expenses}`);
        console.log(`Remaining fuel: ${vehicle.tank} `)
        console.log(`Money remaining: $${vehicle.money}`);
        console.log('---');

        if (vehicle.tank <= 0) {
            clearInterval(timer);
            console.log("Out of gas! Simulation stopped.");
        } else if (vehicle.tank <= fulltank / 2 && vehicle.money >= (gasPrice * (fulltank - vehicle.tank))) {
            vehicle.putGas();
        }
    }, interval);
}

simulateTime(motorcycle);



