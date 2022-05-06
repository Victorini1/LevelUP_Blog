const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
// ADD WITHAUTH
router.get('/', withAuth, async (req, res) => {
    console.log(req.session)
    try {
        const postData = await Post.findAll({
            where: { "user_id": req.session.user_id },
            include: [User]
        });
        const commentData = await Comment.findAll({
            where: {
                "post_id": {
                    [Op.in]: postData.map(i => i.id),
                }
            },
            include: [Post]
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);
        const comments = commentData.map((comment) => comment.get({ plain: true }));
        console.log(comments);
        res.render('dashboard', {
            layout: 'main', posts, comments,
            loggedIn: req.session.loggedIn
        });
        if (loggedIn) {
            res.redirect("dashboard")
        }
        else {
            res.json("You are not logged in")
        }
    } catch (err) {
        console.log(err)
        res.status(500)
    }
});

// ADD WITHAUTH
router.get('/new', (req, res) => {
    res.render('new-post', {

    });
});

// ADD WITHAUTH
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });
            console.log(post);

            res.render('edit-post', {
                layout: 'dashboard',
                post, user
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

module.exports = router;