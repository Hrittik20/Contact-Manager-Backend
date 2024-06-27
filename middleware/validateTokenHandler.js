const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                res.status(403);
                throw new Error("Not authorized");
            }
            req.user = user;
            next();
        });

        if(!token) {
            res.status(403);
            throw new Error("Not authorized");
        }
    }
});

module.exports = validateToken;