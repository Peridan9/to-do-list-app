const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.post("/register", async (req,res) => {
    const {username, email, password, name, avatar} = req.body;

    try{
        // Check if the email or username is already taken
        const existingUser = await User.findOne({ $or: [{email},{username}]});
        if (existingUser){
            return res.status(400).json({message: "Email or Username already exists"});
        }
        const newUser = new User({username, email, password, name, avatar});
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch(err){
        res.status(400).json({message: err.message});
    }
});

router.post("/login", async (req,res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }

        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
        };


        res.status(200).json({message:"Login successful",user: req.session.user});
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

router.post("/logout", (req,res) => {
    req.session.destroy((err) => {
        if(err){
            return res.status(500).json({ message: "Logout Failed"});
        }
        res.clearCookie("connect.sid"); // Clear the session cookie
        res.status(200).json({message: "Logout Successful"});
    });
});


module.exports = router;
