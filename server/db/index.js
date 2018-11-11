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
    imageName: {
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
    audioName: {
        type: conn.Sequelize.STRING,
    },
    audioUrl: {
        type: conn.Sequelize.STRING,
    },
    email: {
        type: conn.Sequelize.STRING,
        allowNull: true
    },
    address: {
        type: conn.Sequelize.STRING,
        allowNull: true
    },
    stocks: {
        type: conn.Sequelize.STRING,
        allowNull: true,
        defaultValue: "SPY"
    },
});

module.exports = {
    models: {
        User
  }
};