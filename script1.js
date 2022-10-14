"use strict";

class Hamburger {
    constructor() {
        this.container = null;
        this.size = 'small';
        this.price = 50;
        this.calories = 20;
        this.totalPrice = 50;
        this.totalCacories = 20;
        this.toppingPrice = 0;
        this.toppingCalories = 0;
        this.init();
    }
    init() {
        this.container = document.querySelector('#container');
        this.getValues();
        this.calculate();
        this.render();
    }
    getValues() {
        this.container.addEventListener('click', event => {
            if (event.target.name === 'burger') {
                this.price = +event.target.dataset.price;
                this.calories = +event.target.dataset.calories;
                this.calculate();
            }
            if (event.target.name === 'topping') {
                if (event.target.checked) {
                    this.toppingPrice += +event.target.dataset.price;
                    this.toppingCalories += +event.target.dataset.calories;
                    this.calculate()
                } else {
                    this.toppingPrice -= +event.target.dataset.price;
                    this.toppingCalories -= +event.target.dataset.calories;
                    this.calculate();
                }
            }
        })
    }

    calculate() {
        this.totalPrice = this.toppingPrice + this.price;
        this.totalCalories = this.toppingCalories + this.calories;
        this.render();
    }
    render() {
        document.querySelector('#calories').innerHTML = `Ваши калории ${this.totalCalories}`;
        document.querySelector('#price').innerHTML = `Ваша цена ${this.totalPrice}`
    }

}

let burger = new Hamburger();