const mongoose = require('mongoose');
const asyncHandler = require("express-async-handler");
const httpStatusCodes = require("../utils/httpCodes.js");

const { User, validate, userProfileUpdateValidator } = require("../models/userModel.js");



// get User details.
exports.get_user = asyncHandler(async (request, response) => {
    try {
        const user = await User.findById(request.user._id).select("-password -__v");
        response.status(httpStatusCodes.OK).json(user);
    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: error.message })
    }

});

// get User details.
exports.get_user_by_id = asyncHandler(async (request, response) => {
    try {
        console.log("get_user_by_id", request.params.userId)
        const { userId } = request.params
        const user = await User.findById(userId).select("-password -__v");
        if (user) {
            returnresponse.status(httpStatusCodes.OK).json(user);
        } else {
            return response.status(httpStatusCodes.INVALID).json({ message: `cannot find any user with ID ${userId}` })
        }
    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: error.message })
    }

});


// get User details.
exports.get_all_users = asyncHandler(async (request, response) => {
    try {
        // Find all users except the logged-in user
        const users = await User.find({ _id: { $ne: request.user._id } }).select("-password -__v");

        response.status(httpStatusCodes.OK).json(users);
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
        const userProfile = await User.findOne({ email: request.body.email })
        if (userProfile) {
            response.status(httpStatusCodes.BAD_REQUEST).json({ message: "Email alreadt availble." })
        } else {
            const user = new User(request.body);
            await user.save();
            response.status(httpStatusCodes.CREATED).send(user);
        }
    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: error.message })
    }

});

//to update user by his id
exports.update_user = asyncHandler(async (request, response, next) => {
    try {

        const { error } = userProfileUpdateValidator(request.body);
        if (error) return response.status(httpStatusCodes.BAD_REQUEST).send(error.details[0].message);

        const { userId } = request.params;
        const body = request.body
        const userDetails = await User.findByIdAndUpdate(userId, body, { new: true }).select("-password -__v");;

        if (!userDetails) {  //if user not present throw error response
            return response.status(httpStatusCodes.INVALID).json({ message: `cannot find any user with ID ${userId}` })
        } else {

            response.status(httpStatusCodes.OK).json(userDetails);
        }

    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: error.message })
    }
});


//to delete user
exports.delete_user = asyncHandler(async (request, response, next) => {
    try {
        const { userId } = request.params;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return response.status(httpStatusCodes.NOT_FOUND).json({ message: `cannot find any user with userId ${userId}` })
        }
        response.status(httpStatusCodes.DELETED).json(user);
    } catch (error) {
        response.status(httpStatusCodes.NOT_FOUND).json({ message: error.message })
    }
});