const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartItems: [],
        filtered: [],
        imgCart: 'https://via.placeholder.com/50x100',
        products: [],
        imgProduct: 'https://via.placeholder.com/200x150'
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(item) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const prod = Object.assign({ quantity: 1 }, item);//создание нового объекта на основе двух, указанных в параметрах
                            this.cartItems.push(prod)
                        }
                    }
                })
        },
        remove(item) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        filter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents) {
                    this.cartItems.push(item);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data) {
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let item of data) {
                    this.products.push(item);
                    this.filtered.push(item);
                }
            })
    }

});































//  4
// class ProductList {
//     constructor(container = '.root') {
//         this.container = container;
//         this.goods = [];
//         this._getProducts()
//             .then(data => {
//                 this.goods = data;
//                 this.render()
//             });
//     }

//     _getProducts() {
//         return fetch(`${API}/catalogData.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             });
//     }

//     goodsSum() {
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }

//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const item = new ProductItem(product);
//             block.insertAdjacentHTML("beforeend", item.render());
//             //block.innerHTML += item.render();
//         }
//     }
// }

// class ProductItem {
//     constructor(product) {
//         this.title = product.product_name;
//         this.price = product.price;
//         this.quantity = product.quantity;
//         this.image = `images/goods.jpg`
//     }
//     render() {
//         return `<div class="goods-item">
//             <h3>${this.title}</h3>
//             <p> price ${this.price}</p>
//             <img src = '${this.image}'/></div>`;
//     }
// }


// class Basket {
//     constructor(container = '.basket') {
//         this.container = container;
//         this.goods = [];
//         this._productInBasket()
//             .then(data => {
//                 this.goods = data.contents;
//                 this.render()
//                 this.addEventListener()
//             });

//     }
//     _productInBasket() {
//         return fetch(`${API}/getBasket.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             });
//     }
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const item = new ProductInBasket(product);
//             block.insertAdjacentHTML("beforeend", item.render());
//         }
//     }
//     addEventListener() {
//         let btnAdd = document.querySelectorAll('.add-item');
//         let btnRemove = document.querySelectorAll('.remove-item');
//         btnAdd.forEach(element => {
//             element.addEventListener('click', () => {
//                 this.plus(element.dataset.title);
//             });
//         });
//         btnRemove.forEach(element => {
//             element.addEventListener('click', () => {
//                 this.minus(element.dataset.title);
//             });
//         });

//     }
//     plus(title) {
//         let count = 0;
//         this.goods.forEach(el => {
//             if (el.product_name === title) {
//                 ++el.quantity;
//                 count = el.quantity;
//             }
//         })
//         document.querySelector(`#${title}`).innerHTML = `quantity ${count}`;
//     }
//     minus(title) {
//         let product1 = this.goods.find(el => el.product_name == title)
//         if (product1.quantity == 1) {
//             document.querySelector(`#${product1.id}`).remove();
//             return;
//         }
//         let count = 0;
//         this.goods.forEach(el => {
//             if (el.product_name === title) {
//                 --el.quantity;
//                 count = el.quantity;
//             }
//         })
//         document.querySelector(`#${title}`).innerHTML = `quantity ${count}`;
//     }
// }

// class ProductInBasket {
//     constructor(product) {
//         this.title = product.product_name;
//         this.price = product.price;
//         this.quantity = product.quantity;
//         this.id = product.id;
//         this.image = `images/goods.jpg`;
//     }
//     render() {
//         return `<div id="${this.id}" class="goods-item">
//             <h3>${this.title}</h3>
//             <p> price ${this.price}</p>
//             <p id="${this.title}"> quantity ${this.quantity}</p>
//             <button class="add-item" type="button" data-title="${this.title}"> добавить товар</button >
//             <button class="remove-item" type="button" data-title="${this.title}" >удалить товар</button>☺
//             <img src = '${this.image}'/></div>`;
//     }
// }



// let list = new ProductList();
// document.querySelector('.cart-button').addEventListener('click', () => {
//     let basket = new Basket();
// });


// 2
// class ProductList {
//     constructor(container = '.root') {
//         this.container = container;
//         this.goods = [];
//         this._fetchProducts();
//         this.render();
//         this.goodsSum();
//     }
//     _fetchProducts() {
//         this.goods = [
//             { title: 'Shirt', price: 150, image: `images/goods.jpg` },
//             { title: 'Socks', price: 50, image: `images/goods.jpg` },
//             { title: 'Jacket', price: 350, image: `images/goods.jpg` },
//             { title: 'Shoes', price: 250, image: `images/goods.jpg` },
//         ];
//     }
//     goodsSum() {
//         let summ = 0;
//         for (let product of this.goods) {
//             summ += product.price;
//         }
//         console.log(`Сумма всех товаров ${summ}`);
//     }

//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const item = new ProductItem(product);
//             block.insertAdjacentHTML("beforeend", item.render());
//             //block.innerHTML += item.render();
//         }
//     }
// }

// class ProductItem {
//     constructor(product) {
//         this.title = product.title;
//         this.price = product.price;
//         this.image = product.image;
//     }
//     render() {
//         return `<div class="goods-item">
//         <h3>${this.title}</h3>
//         <p>${this.price}</p>
//         <img src = '${this.image}'/></div>`;
//     }
// }

// let list = new ProductList();

//1
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