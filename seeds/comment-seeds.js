const { Comment } = require("../models");

const commentData = [
    {
        text: "Intersting",
        user_id: 1,
        post_id: 1
    },
    {
        text: "What do you mean?",
        user_id: 2,
        post_id: 2
    },
    {
        text: "Oh Wow",
        user_id: 3,
        post_id: 3
    },
    {
        text: "Something to think about.",
        user_id: 4,
        post_id: 4
    },
    {
        text: "LOLZ",
        user_id: 5,
        post_id: 5
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;