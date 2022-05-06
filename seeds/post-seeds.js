const { Post } = require("../models");

const postData = [
    {
        title: "React",
        description: "React is Fun and intersting to Use",
        user_id: 12,
        comment_id: 1
    },
    {
        title: "Word Press",
        description: "Ideas on WordPress? I hear it's no fun to use.",
        user_id: 10,
        comment_id: 2
    },
    {
        title: "Hey Guys",
        description: "New to the site, any tips to get started?",
        user_id: 3,
        comment_id: 3
    },
    {
        title: "Interesting Tech",
        description: "Any new tech ideas to share?",
        user_id: 4,
        comment_id: 4
    },
    {
        title: "Fun",
        description: "Interesting tech to try out and have fun",
        user_id: 5,
        comment_id: 5
    },

];

const seedPosts = () => Post.bulkCreate(postData);
module.exports = seedPosts;