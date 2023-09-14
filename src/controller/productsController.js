const asyncHandler = require("express-async-handler");
const mongoose = require('mongoose');
const { validateProductRequest, validateProductId } = require("../middleware/validator");

const httpStatusCodes = require("../utils/httpCodes.js");

//models
const Product = require('../models/productModel');
const { Result } = require("express-validator");



// Display list of all products.
exports.get_products = asyncHandler(async (request, response, next) => {
    try {
        const errors = validateProductId(request)
        if (errors.length > 0) {
            return response.status(httpStatusCodes.BAD_REQUEST).json({ errors: errors });
        }

        await Product.find().select("-__v").then((result) => {
            if (result) {
                response.status(httpStatusCodes.OK).json(result);
            } else {
                response.status(httpStatusCodes.OK).json({ message: [] });
            }
        }).catch((error) => {
            response.status(httpStatusCodes.BAD_REQUEST).json({ message: "Invalid data" });
        })

    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: error.message })
    }

});

// Returns product details by its ID.
exports.get_products_by_id = asyncHandler(async (request, response, next) => {
    try {
        const { productId } = request.params
        await Product.findById(productId).select("-__v")
            .then((result) => {
                if (result) {
                    response.status(httpStatusCodes.OK).json(product);
                } else {
                    response.status(httpStatusCodes.INVALID).json({ message: `cannot find any product` })
                }
            }).catch((error) => {
                response.status(httpStatusCodes.BAD_REQUEST).json({ message: "Invalid data" });
            });
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

        await Product.create(request.body)
            .then((result) => {
                if (result) {
                    response.status(httpStatusCodes.CREATED).json(result)
                } else {
                    response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: `Unable to add new product` })
                }
            }).catch((error) => {
                response.status(httpStatusCodes.BAD_REQUEST).json({ message: "Invalid data" });
            })
    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: error.message })
    }

});

//to update product by it is id
exports.update_product = asyncHandler(async (request, response, next) => {
    try {

        const { productId } = request.params;
        const body = request.body

        //if we find prosuct and update it 
        await Product.findByIdAndUpdate(productId, body, { new: true })
            .then((result) => {
                if (result) {
                    response.status(httpStatusCodes.OK).json(result);
                } else {
                    response.status(httpStatusCodes.INVALID).json({ message: "Unable to update" });
                }
            }).catch((error) => {
                response.status(httpStatusCodes.BAD_REQUEST).json({ message: "Invalid data" });
            })

    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: error.message })
    }
});


//delete product

exports.delete_product = asyncHandler(async (request, response, next) => {
    try {
        const { productId } = request.params;

        await Product.findByIdAndDelete(productId)
            .then((result) => {
                if (result) {
                    response.status(httpStatusCodes.DELETED).json(result);
                } else {
                    response.status(httpStatusCodes.INVALID).json({ message: "Unable to delete" });
                }
            }).catch((error) => {
                response.status(httpStatusCodes.BAD_REQUEST).json({ message: "Invalid data" });
            })
    } catch (error) {
        response.status(httpStatusCodes.NOT_FOUND).json({ message: error.message })
    }
});