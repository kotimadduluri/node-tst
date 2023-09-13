
const Joi = require("joi");

function isEmpty(value) {
    if (!value || value == 0) {
        return false
    }
    return true
}

function isValidProductName(value) {
    if (isEmpty(value)) {
        return false;
    }
    return true
}

function isValidProductQuantity(value) {
    if (isEmpty(value)) {
        return false;
    } else if (isNaN(value)) {
        return false
    }
    return true
}

function isValidProductPrice(value) {
    if (isEmpty(value)) {
        return false;
    } else if (isNaN(value)) {
        return false
    }
    return true
}


//to validate product details
function validateProductRequest(req) {
    const errors = [];

    try {
        const { name, quantity, price } = req.body;


        if (isValidProductName(name)) {
            errors.push('Product name is required.');
        }

        if (isValidProductQuantity(quantity)) {
            errors.push('Product quantity is required.');
        }

        if (isValidProductPrice(price)) {
            errors.push('Product price is required.');
        }


    } catch (error) {
        errors.push(error.message);
    }
    return errors;
}



//to validate product id

function validateProductId(req) {

    const errors = [];

    try {

        const { productId } = req.body;

        if (isEmpty(productId)) {
            errors.push('Product id  is invalid');
        }

    } catch (error) {
        errors.push(error.message);
    }
    return errors;
}

const validateUserProfile = (user) => {
    console.log(user)
    const schema = Joi.object({
        name : Joi.string().required(),
        email : Joi.string().email().required(),
        password : Joi.string().required(),
    });
    return schema.validate(user);
};

const validateUserCredentilas = (user) => {
    console.log(user)
    const schema = Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().required(),
    });
    return schema.validate(user);
};

module.exports = {validateProductRequest,validateProductId,validateUserProfile,validateUserCredentilas}