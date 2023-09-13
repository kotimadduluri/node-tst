const {Router} = require("express");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const Joi = require("joi");

const { validateUserCredentilas } = require("../middleware/validator");

//authenticate user with given details
exports.post_authenticate = asyncHandler(async (request, response) => {
    try {
        const { error } = validateUserCredentilas(request.body);
        if (error) return response.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: request.body.email });
        if (!user) return response.status(400).send("Invalid email or password");

        const validPassword = await bcrypt.compare(
            request.body.password,
            user.password
        );
        if (!validPassword)
            return response.status(400).send("Invalid email or password");

        const token = user.generateAuthToken();
        response.json({authToken:token});
    } catch (error) {
        console.log(error);
        response.send("An error occured");
    }

});