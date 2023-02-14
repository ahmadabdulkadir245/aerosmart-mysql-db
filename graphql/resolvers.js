const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const Product = require('../models/product');
// const User = require('../models/user');


module.exports = {
    createProduct: async function({ productInput }, req) {
   
        // const createdProduct = await Product.create({
        //     title: productInput.title,
        //     price: productInput.price,
        //     imageUrl: productInput.imageUrl,
        //     description: productInput.description,
        //     // userId: req.user.id
        //   })

        const createdProduct = await new Product(null,  productInput.title,  productInput.imageUrl,  productInput.description,  productInput.price);

        createdProduct.save()
    
        return {
          id: createdProduct.id.toString(),
          title: createdProduct.title,
          price: createdProduct.price,
          imageUrl: createdProduct.imageUrl,
          description: createdProduct.description,
          createdAt: createdProduct.createdAt.toISOString(),
          updatedAt: createdProduct.updatedAt.toISOString()
        };
      },

      products: async function({ page }, req) {
        if (!page) {
          page = 1;
        }
        const perPage = 2;
        const totalPosts = 3;
        const products = await Product.fetchAll() .then(([rows, fieldData]) => {
          return rows
        })
        .catch(err => console.log(err));
        return {
          products: products.map(product => {
            return {
                id: product.id,
                title: product.title,
                price: product.price,
                imageUrl: product.imageUrl,
                description: product.description,
                // createdAt: product.createdAt.toISOString(),
                // updatedAt: product.updatedAt.toISOString()
            };
          }),
          totalPosts: totalPosts
        };
      },
      product: async function({ id }, req) {
        const product = await   Product.findById(id)
        .then(([product]) => {
          return product[0]
        })
        .catch(err => console.log(err))

        // if (!product) {
        //   const error = new Error('No post found!');
        //   error.code = 404;
        //   throw error;
        // }
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          description: product.description,
          // createdAt: product.createdAt.toISOString(),
          // updatedAt: product.updatedAt.toISOString()
        };
      },
}