const router = require('express').Router();

const { Post, User, Comment } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(req.session.loggedIn)
    res.render('dashboard', {
      posts: posts,
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

//  ADD WITHAUTH
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({

      where: { id: req.params.id },
      include: [
        User,
        {
          model: Comment,
          attributes: ['text'],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });
      console.log(post);
      // res.json(post)

      res.render('single-post', { post, loggedIn: req.session.loggedIn });

    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

module.exports = router;