"use strict";

const products = [
    { title: 'Shirt', price: 150, image: `images/goods.jpg` },
    { title: 'Socks', price: 50, image: `images/goods.jpg` },
    { title: 'Jacket', price: 350, image: `images/goods.jpg` },
    { title: 'Shoes', price: 250, image: `images/goods.jpg` },
];
const renderProducts = (title, price, image) => {
    return `<div class="goods-item">
    <h3>${title}</h3>
    <p>${price}</p>
    <img src = '${image}'/></div>`;
};
const renderPage = (list) => {
    let goodsList = list.map(item => renderProducts(item.title, item.price, item.image));
    document.querySelector('#root').innerHTML = goodsList.join('');
}
renderPage(products);