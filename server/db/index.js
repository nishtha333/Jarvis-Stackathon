const conn = require('./conn');

const User = conn.define('user', {
    firstName: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    faceId: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: conn.Sequelize.STRING,
        allowNull: true
    },
    address: {
        type: conn.Sequelize.STRING,
        allowNull: true
    },
});

module.exports = {
    models: {
        User
  }
};