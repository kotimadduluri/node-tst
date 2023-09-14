const mongoose = require('mongoose');
const asyncHandler = require("express-async-handler");
const httpStatusCodes = require("../utils/httpCodes.js");

const { User, validate, userProfileUpdateValidator } = require("../models/userModel.js");
const { Result } = require('express-validator');



// get User details.
exports.get_user = asyncHandler(async (request, response) => {
    try {
        await User.findById(request.user._id).select("-password -__v")
            .then((result) => {
                if (result) {
                    response.status(httpStatusCodes.OK).json(result);
                } else {
                    response.status(httpStatusCodes.INVALID).json({ message: `Unable to find the details` })
                }
            }).catch((error) => {
                response.status(httpStatusCodes.INVALID).json({ message: `Unable to find the details` })
            });
    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: `Internal Error` })
    }

});

// get User details.
exports.get_user_by_id = asyncHandler(async (request, response) => {
    try {
        const { userId } = request.params
        User.findById(userId).select("-password -__v").then((user) => {
            if (user) {
                response.status(httpStatusCodes.OK).json(user);
            } else {
                response.status(httpStatusCodes.INVALID).json({ message: `Cannot find any user details` })
            }
        }).catch((error) => {
            response.status(httpStatusCodes.INVALID).json({ message: `Cannot find any user details` })
        })
    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: `Internal Error` })
    }

});


// get User details.
exports.get_all_users = asyncHandler(async (request, response) => {
    try {
        // Find all users except the logged-in user
        User.find({ _id: { $ne: request.user._id } }).select("-password -__v").then((users) => {
            if (users) {
                response.status(httpStatusCodes.OK).json(users);
            } else {
                response.status(httpStatusCodes.INVALID).json({ message: `No recards found.` })
            }
        }).catch((error) => {
            response.status(httpStatusCodes.INVALID).json({ message: `No recards found.` })
        })
    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: `Internal Error` })
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
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: `Internal Error` })
    }

});

//to update user by his id
exports.update_user = asyncHandler(async (request, response, next) => {
    try {

        const { error } = userProfileUpdateValidator(request.body);
        if (error) return response.status(httpStatusCodes.BAD_REQUEST).send(error.details[0].message);

        const { userId } = request.params;
        const body = request.body

        await User
            .findByIdAndUpdate(userId, body, { new: true })
            .select("-password -__v")
            .then((result) => {
                if (result) {
                    response.status(httpStatusCodes.OK).json(result);
                } else {
                    response.status(httpStatusCodes.INVALID).json({ message: `cannot find any user` })
                }
            }).catch((error) => {
                response.status(httpStatusCodes.INVALID).json({ message: `cannot find any user` })
            });
    } catch (error) {
        response.status(httpStatusCodes.INTERNAL_SERVER).json({ message: `Internal Error` })
    }
});


//to delete user
exports.delete_user = asyncHandler(async (request, response, next) => {
    try {
        const { userId } = request.params;
        await User.findByIdAndDelete(userId)
            .then((result) => {
                if (result) {
                    response.status(httpStatusCodes.DELETED).json(result);
                } else {
                    response.status(httpStatusCodes.NOT_FOUND).json({ message: `cannot find any user` })
                }
            }).catch((error) => {
                response.status(httpStatusCodes.NOT_FOUND).json({ message: `cannot find any user` })
            });
    } catch (error) {
        response.status(httpStatusCodes.NOT_FOUND).json({ message: error.message })
    }
});