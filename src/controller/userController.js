const mongoose = require('mongoose');
const asyncHandler = require("express-async-handler");
const httpStatusCodes = require("../utils/httpCodes.js");

const { User, validate } = require("../models/userModel.js");



// get User details.
exports.get_user = asyncHandler(async (request, response) => {
    try {
        const user = await User.findById(request.user._id).select("-password -__v");
        response.status(httpStatusCodes.OK).json(user);
    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: error.message })
    }

});

// create User details.
exports.create_user = asyncHandler(async (request, response) => {
    try {
        const { error } = validate(request.body);
        if (error) return response.status(httpStatusCodes.BAD_REQUEST).send(error.details[0].message);


        //check if email already exisit
        const userProfile = await User.findOne({email:request.body.email});
        if(userProfile){
            response.status(httpStatusCodes.BAD_REQUEST).json({ message:"Email Id was taken."})
        }else{
            const user = new User(request.body);
            await user.save();
            response.status(httpStatusCodes.CREATED).send(user);
        }
    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: error.message })
    }

});