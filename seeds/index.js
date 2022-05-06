// const mysql = require('mysql2');
const sequelize = require("../config/connection");

const seedUsers = require("./user.seeds");
const seedPosts = require("./post-seeds");
const seedComments = require("./comment-seeds");

/*
if (process.env.JAWSDB_URL) {
    conn = new Sequelize(process.env.JAWSDB_URL);
} else {

}

const con = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}).promise();
*/

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    await seedComments();

    process.exit(0);
};

seedAll();