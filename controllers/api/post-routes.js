const router = require('express').Router();

const { Post } = require("../../models");
const withAuth = require('../../utils/auth');

// Get all posts
router.get("/", async (req, res) => {
    const allPosts = await Post.findAll({});
    res.json(allPosts);
});

// Create a new post ** ADD WITHAUTH **
router.post("/", withAuth, async (req, res) => {
    try {
        const createPost = await Post.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id,
        })
        res.status(200).json("Success");
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// Update an existing post *** ADD WITHAUTH ***
router.put("/:id", withAuth, async (req, res) => {
    try {
        const updatePost = await Post.update({
            title: req.body.title,
            description: req.body.description,
        },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        if (updatePost) {
            res.status(200).json("Success");
        } else {
            res.status(400).json({ message: "That comment was not found" })
        };
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// Delete an existing post *** ADD WITHAUTH ***
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const destroyPost = Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!destroyPost) {
            res.status(400).json({ message: "That post was not found" });
        } else {
            res.json("Success");
        };
    }
    catch (err) {
        res.status(400).json(err);
    };
});

module.exports = router;