const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
const sendToken = require("../utils/jwtToken");

// show register form
router.get("/register", function (req, res) {
    res.render("register");
});

// Register
router.post("/register",

    // body("username").notEmpty().withMessage("User Name is required"),
    // body("email").isEmail().withMessage("Valid Email required"),
    // body("password")
    //     .isLength({ min: 6 })
    //     .withMessage("Password must be at least 6 character long"),

    async (req, res) => {

    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({
    //             success: false,
    //             message: 'Please Enter all the fields',
    //         });
    //     }

    //     const usernameExists = await User.findOne({ username: req.body.username });

    //     if (usernameExists) {
    //         return res.status(400).json({
    //             message: 'Username is taken '
    //         });
    //     }

    //     const userExists = await User.findOne({ email: req.body.email });

    //     if (userExists) {
    //         return res.status(400).json({
    //             message: 'User already exists'
    //         });
    //     }


        try {
            //generate new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, parseInt(salt));

            //create new user
            const user = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });

            //save user and respond
            // const user = newUser.save();
            const newUser = user.save();
         return sendToken(user, 200, res);
            // const newUser = user.save();
            console.log("Success");
            res.status(200).json(token);
            // return res.redirect("/login");




        } catch (err) { 
            res.status(500).json(err);
        }


    });


//show login form
router.get("/login", function (req, res) {
    return res.render("login");
});

//login

router.post("/login",

    // body("email").isEmail().withMessage("Valid Email required"),
    // body("password")
    //     .isLength({ min: 6 })
    //     .withMessage("Password must be at least 6 character long"),

    async (req, res) => {

        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Please Enter all the fields',
        //     });
        // }

        try {
            const user = await User.findOne({ email: req.body.email });
            !user && res.status(404).json("user not found");

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            !validPassword && res.status(400).json("Wrong Password");

            
            return sendToken(user, 200, res);
            res.status(200).json(user);
            // return res.redirect("/");
            // sendToken(user, 200, res);

        } catch (err) { 
            return res.status(500).json(err);
        }
    });


module.exports = router;