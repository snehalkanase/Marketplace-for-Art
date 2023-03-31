const router = require("express").Router();
const User = require("../models/User");
const Post =require("../models/Post");
const bcrypt = require("bcrypt");
const ApiFeatures = require("../utils/apiFeatures");

//Update User
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(  req.body.password , parseInt(salt));
            } catch (err){
                return res.status(500).json(err);
            }
        } 
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been Updated");
        }catch (err){
            return res.status(500).json(err);
        }
    } else {
          return res.status(403).json("you can update only your account! ");
    }
});

//delete user

router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has delete successfully");
        }catch (err){
            return res.status(500).json(err);
        }
    } else {
          return res.status(403).json("you can delete only your account! ");
    }
});

//get a user
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId 
        ? await User.findById(userId)
        : await User.findOne({ username: username});

        const {password,updatedAt, ...other} = user._doc
        res.status(200).json(other);
    } catch (err){
        res.status(500).json(err);
    }
});

//get all user
router.get("/user", async (req, res) => {
    
    try{
        const apiFeature = new ApiFeatures(User.findOne(), req.query).search();
        const user = await apiFeature.query;

        // const {password,updatedAt, ...other} = user._doc
        res.status(200).json(user);
    } catch (err){
        res.status(500).json(err);
    }
});

//follow user
router.put("/:id/follow" ,async (req,res) => {
    if(req.body.userId !== req.params.id){
        try{  
            const user = await User.findById(req.body.userId);
            const currentUser = await User.findById(req.params.id);
            if(!user.followers.includes(req.params.id)){
                await user.updateOne( { $push: { followers : req.params.id  } } );
                await currentUser.updateOne( { $push: { followings: req.body.userId} } );
                res.status(200).json(user);
            } else {
                res.status(403).json("you already follow this user");
            } 
        } catch (err){
            res.status(500).json(err);
        } 
    }else {
        res.status(403).json("you cannot follow yourself");
    }
});

//unfollow user
router.put("/:id/unfollow" , async (req,res) => {
    if(req.body.userId !== req.params.id){
        try{  
            const user = await User.findById(req.body.userId);
            const currentUser = await User.findById(req.params.id);
            if(user.followers.includes(req.params.id)){
                await user.updateOne( { $pull: { followers : req.params.id } } );
                await currentUser.updateOne( { $pull: { followings: req.body.userId } } );
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you won't follow this user");
            } 
        } catch (err){
            res.status(500).json(err);
        } 
    }else {
        res.status(403).json("you cannot unfollow yourself");
    }
});




module.exports = router;