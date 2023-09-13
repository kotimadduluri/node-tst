const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const { validateProductRequest, validateProductId } = require("../middleware/validator");

const httpStatusCodes = require("../utils/httpCodes.js");

//models
const Product = require('../models/productModel');



// Display list of all products.
exports.get_products = asyncHandler(async (request, response, next) => {
    try {
        const errors = validateProductId(request)
        if (errors.length > 0) {
            return response.status(httpStatusCodes.BAD_REQUEST).json({ errors: errors });
        }

        const products = await Product.find();
        response.status(httpStatusCodes.OK).json(products);
    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: error.message })
    }

});

// Returns product details by its ID.
exports.get_products_by_id = asyncHandler(async (request, response, next) => {
    try {
        const errors = validateProductId(request)
        if (errors.length > 0) {
            return response.status(httpStatusCodes.BAD_REQUEST).json({ errors: errors });
        }

        const { productId } = request.params
        const product = await Product.findById(productId);
        if(product){
            response.status(httpStatusCodes.OK).json(product); 
        }else response.status(httpStatusCodes.BAD_REQUEST).json({ message: "No record found"})
    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: error.message })
    }
});

//add new product
exports.save_product = asyncHandler(async (request, response, next) => {

    try {

        const errors = validateProductRequest(request)
        if (errors.length > 0) {
            return response.status(httpStatusCodes.BAD_REQUEST).json({ errors: errors });
        }

        const product = await Product.create(request.body)
        response.status(httpStatusCodes.CREATED).json(product)
    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: error.message })
    }

});

//to update product by it is id
exports.update_product = asyncHandler(async (request, response, next) => {
    try {

        const errors = validateProductId(request)
        if (errors.length > 0) {
            return response.status(httpStatusCodes.BAD_REQUEST).json({ errors: errors });
        }

        const { productId } = request.params;
        const body = request.body
        const product = await Product.findByIdAndUpdate(productId, body);

        if (!product) {  //if product not present throw error response
            return response.status(404).json({ message: `cannot find any product with ID ${productId}` })
        }

        //if we find prosuct and update it 
        const updatedProduct = await Product.findById(productId);
        response.status(httpStatusCodes.OK).json(updatedProduct);

    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: error.message })
    }
});


//delete product

exports.delete_product = asyncHandler(async (request, response, next) => {
    try {

        const errors = validateProductId(request)
        if (errors.length > 0) {
            return response.status(httpStatusCodes.BAD_REQUEST).json({ errors: errors });
        }

        const { productId } = request.params;
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return response.status(httpStatusCodes.NOT_FOUND).json({ message: `cannot find any product with productId ${productId}` })
        }
        response.status(httpStatusCodes.DELETED).json(product);

    } catch (error) {
        response.status(httpStatusCodes.NOT_FOUND).json({ message: error.message })
    }
});