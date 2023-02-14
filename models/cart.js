const fs = require('fs')
const path = require('path')

const cartPath =  path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
 static addProduct(id, productPrice) {
    // fetch the previous cart
    fs.readFile(cartPath, (err, fileContent) => {
        let cart = {products:  [], totalPrice: 0}
        if(!err) {
            cart = JSON.parse(fileContent)
        }
        // Analyze the cart => Find exising product
        const exsistingProductIndex = cart.products.findIndex(product => product.id === id)
        const exsistingProduct = cart.products[exsistingProductIndex]
        let updatedProduct
    // Add new product / increase quantity
        if(exsistingProduct){
            updatedProduct = {...exsistingProduct}
            updatedProduct.qty = updatedProduct.qty + 1
            cart.products = [...cart.products]
            cart.products[exsistingProductIndex] = updatedProduct
        } else {
            updatedProduct = {id: id, qty: 1}
            cart.products = [...cart.products, updatedProduct]
        }
        cart.totalPrice = cart.totalPrice + +productPrice
        fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
        })
    })
 }
    static deleteProduct(id, productPrice) {
        fs.readFile(cartPath, (err, fileContent) => {
            if(err) {
                return
            }
            const updatedCart = { ...JSON.parse(fileContent)}

            const product =  updatedCart.products.find(product => product.id === id)
              
            if(!product) {
                return
            }

            const productQty = product.qty

            updatedCart.products = updatedCart.products.filter(product => product.id !== id)

            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty

            fs.writeFile(cartPath, JSON.stringify(updatedCart), (err) => {
            })
        }) 
    }

    static getCart (cb) {
        fs.readFile(cartPath, (err, fileContent) => {
            const cart = JSON.parse(fileContent)
            if (err) {
               cb(null);
            }else{
              cb(cart);
            }
          });
    }
}