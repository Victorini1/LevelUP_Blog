const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('../config/connection.js');

const hashPassword = async (user, options) => {
    if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        user.password = hashedPassword
    }
    return user;
}

class User extends Model {
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [4]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [4]
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

User.addHook("beforeCreate", hashPassword);
User.addHook("beforeBulkCreate", async (users) => Promise.all(users.map(i => hashPassword(i))));
User.addHook("beforeUpdate", hashPassword);

module.exports = User;