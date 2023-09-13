const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const httpStatusCodes = require("../utils/httpCodes.js");

const { validateUserCredentilas } = require("../middleware/validator");

//authenticate user with given details
exports.post_authenticate = asyncHandler(async (request, response) => {
    try {
        const { error } = validateUserCredentilas(request.body);
        if (error) return response.status(httpStatusCodes.BAD_REQUEST).send(error.details[0].message);


        const user = await User.findOne({ email: request.body.email })
        if (!user) return response.status(httpStatusCodes.INVALID).json({message:"Invalid credentials."});


        console.log(request.body)
        console.log(user)

        const validPassword = await bcrypt.compare(
            request.body.password,
            user.password
        );

        if (!validPassword)
            return response.status(httpStatusCodes.BAD_REQUEST).json({message:"Invalid email or password"});

        const token = user.generateAuthToken();
        if(token){
            response.status(httpStatusCodes.OK).json({ authToken: token });
        }else{
            response.status(httpStatusCodes.INTERNAL_SERVER).json({message:"Something went wrong"});    
        }
    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({message:error.message});
    }

});