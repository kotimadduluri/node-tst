const jwt = require("jsonwebtoken");
const httpStatusCodes  = require("../utils/httpCodes");

module.exports = (req, res, next) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.status(httpStatusCodes.FORBIDEN).send("Access denied.");

        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(httpStatusCodes.UNAUTHORISED).send("Invalid token");
    }
};