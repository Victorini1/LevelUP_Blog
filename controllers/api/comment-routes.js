const router = require('express').Router();

const { Comment } = require("../../models");
const withAuth = require('../../utils/auth');

// Get all comments
router.get("/", withAuth, async (req, res) => {
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const allComments = await Comment.findAll({
        where: { "post_id": post_id },

    });
    res.json(allComments);
});

// Create a new comment *** ADD WITHAUTH ***
router.post("/", withAuth, async (req, res) => {
    try {
        const createComment = await Comment.create({
            text: req.body.text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
        res.status(200).json(createComment);
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// Update an existing comment *** ADD WITHAUTH ***
router.put("/:id", withAuth, async (req, res) => {
    try {
        const updateComment = await Comment.update({
            text: req.body.text,
        },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        if (updateComment) {
            res.status(200).json("Success");
        } else {
            res.status(400).json({ message: "That comment was not found" })
        };
    }
    catch (err) {
        res.status(500).json(err);
    };
});

// Delete an existing comment *** ADD WITHAUTH ***
router.delete("/:id", withAuth, async (req, res) => {
    try {
        const destroyComment = Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!destroyComment) {
            res.status(400).json({ message: "That comment was not found" });
        } else {
            res.json("Success");
        };
    }
    catch (err) {
        res.status(400).json(err);
    };
});

module.exports = router;