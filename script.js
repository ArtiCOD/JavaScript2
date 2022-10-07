"use strict";

class ProductList {
    constructor(container = '.root') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();
        this.goodsSum();
    }
    _fetchProducts() {
        this.goods = [
            { title: 'Shirt', price: 150, image: `images/goods.jpg` },
            { title: 'Socks', price: 50, image: `images/goods.jpg` },
            { title: 'Jacket', price: 350, image: `images/goods.jpg` },
            { title: 'Shoes', price: 250, image: `images/goods.jpg` },
        ];
    }
    goodsSum() {
        let summ = 0;
        for (let product of this.goods) {
            summ += product.price;
        }
        console.log(`Сумма всех товаров ${summ}`);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
            //block.innerHTML += item.render();
        }
    }
}

class ProductItem {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.image = product.image;
    }
    render() {
        return `<div class="goods-item">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <img src = '${this.image}'/></div>`;
    }
}

let list = new ProductList();


// const products = [
//     { title: 'Shirt', price: 150, image: `images/goods.jpg` },
//     { title: 'Socks', price: 50, image: `images/goods.jpg` },
//     { title: 'Jacket', price: 350, image: `images/goods.jpg` },
//     { title: 'Shoes', price: 250, image: `images/goods.jpg` },
// ];
// const renderProducts = (title, price, image) => {
//     return `<div class="goods-item">
//     <h3>${title}</h3>
//     <p>${price}</p>
//     <img src = '${image}'/></div>`;
// };
// const renderPage = (list) => {
//     let goodsList = list.map(item => renderProducts(item.title, item.price, item.image));
//     document.querySelector('.root').innerHTML = goodsList.join('');
// }
// renderPage(products);