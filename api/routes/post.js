const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});
//update post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("The post has been updated");
        } else {
            res.status(403).json("You can update only your post");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

//delete post

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("The post has been deleted");
        } else {
            res.status(403).json("You can delete only your post");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

//Like & dislike a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("Post has been Disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//get a post
router.get("/post",  async (req, res) => {
    try {
        const post = await Post.findById(req.body.postId);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get timeline post
router.get("/timeline/:userId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            }));
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err);
    }
});

//get USERS all post
router.get("/profile/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

//add to wishlist

// router.put("/:userId/wishlist", async (req, res) => {
//     try {

//         const user = await User.findById(req.params.userId);
//         const wishlist = await Post.findById(req.body.postId);
//         if (!user.wishlist.includes(req.body.postId)) {
//             await user.updateOne({ $push: { wishlist: req.body.postId } });
//             res.status(200).json("post saved to wishlist");
//         } else {
//             await user.updateOne({ $pull: { wishlist: req.body.postId } });
//             res.status(200).json("Post removed from wishlist");
//         }
//     }
//     catch (err) {
//         console.log(err);
//     }
// });


router.put("/:userId/wishlist", async (req, res) => {
        try {
    
            const user = await User.findById(req.params.userId);
            const wishlist = await Post.findById(req.body.postId);
            if (!user.wishlist.includes(req.body.postId)) {
                await user.updateOne({ $push: { wishlist: req.body.postId } });
                res.status(200).json("post saved to wishlist");
            } else {
                await user.updateOne({ $pull: { wishlist: req.body.postId } });
                res.status(200).json("Post removed from wishlist");
            }
        }
        catch (err) {
            console.log(err);
        }
    } );

router.get("/:userId/wishlist", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        // const posts = await Post.find({ postId: user._id })
        const posts = await Promise.all(
            user.wishlist.map(postId => {
                return Post.findById(postId)
            })
        );
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});



// router.put("/wishlist/:username", async (req, res) => {
//     try {

//         const user = await User.findById(req.params.userId);
//         const wishlist = await Post.findById(req.body.postId);
//         if (!user.wishlist.includes(req.body.postId)) {
//             res.status(500).json("you can not remove post")
//         } else {
//             await user.updateOne({ $pull: { wishlist: req.body.postId } });
//             res.status(200).json("Post removed from wishlist");
//         }
//     }
//     catch (err) {
//         console.log(err);
//     }
// });

module.exports = router;