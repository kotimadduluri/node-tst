const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcrypt");


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           description: The email address of the user (must be unique).
 *         password:
 *           type: string
 *           description: The password of the user.
 *       required:
 *         - name
 *         - email
 *         - password
 */

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name required"],
        },
        email: {
            type: String,
            unique: [true, "Provide unique email"],
            required: [true, "Email required"],
        },
        password: {
            type: String,
            required: [true, "Password required"],
        },
    },
    {
        timestamps: true
    }
)

//hook to encrypt password before storing
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
    return token;
};

const User = mongoose.model("User", userSchema);

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

const userProfileUpdateValidator = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().max(0),
        password: Joi.string().max(0),
    });
    return schema.validate(user);
};

module.exports = { User, validate , userProfileUpdateValidator };