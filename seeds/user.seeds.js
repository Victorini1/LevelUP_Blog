const { User } = require("../models");

const userData = [
    {
        username: "JakeT",
        email: "JakeT@gmail.com",
        password: "password1"
    },
    {
        username: "JasonW",
        email: "JasonW@gmail.com",
        password: "password2"
    },
    {
        username: "AmyP",
        email: "AmyP@gmail.com",
        password: "password3"
    },
    {
        username: "deathrider",
        email: "deathrider@gmail.com",
        password: "password4"
    },
    {
        username: "dashcash",
        email: "dashcash@gmail.com",
        password: "password5"
    },
    {
        username: "wildcasey",
        email: "wildcasey@gmail.com",
        password: "password6"
    },
    {
        username: "cabbagefrog",
        email: "cabbagefrog@gmail.com",
        password: "password7"
    },
    {
        username: "losteinstein",
        email: "losteinstein@gmail.com",
        password: "password8"
    },
    {
        username: "climbingduck",
        email: "climbingduck@gmail.com",
        password: "password9"
    },
    {
        username: "paul",
        email: "paulsNotHome@gmail.com",
        password: "password10"
    },
    {
        username: "bootcamphater",
        email: "bootcamphater@gmail.com",
        password: "password11"
    },
    {
        username: "garyTalmes",
        email: "garyTalmes@gmail.com",
        password: "password12"
    }

];

const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;