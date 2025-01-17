const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler (async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({username, email, password: hashedPassword});
    if(user) {
        res.status(201).json({username: user.username, email: user.email});
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});

const loginUser = asyncHandler (async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
        res.status(200).json({accessToken});
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

const getUserProfile = asyncHandler (async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, getUserProfile };