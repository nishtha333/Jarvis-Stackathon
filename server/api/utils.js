const jwt = require('jwt-simple');
const db = require('../db');
const { User } = db.models;

const isAuthenticated = (req, res, next) => {
    
    const token = req.headers.authorization;
    if(!token) {
        return next();
    }

    let faceId;
    try {
        faceId = jwt.decode(token, process.env.JWT_SECRET).faceId;
    }
    catch(ex) {
        return next({ status: 401 });
    }

    User.findOne({ where: { faceId } })
        .then(user => {
            req.user = user;
            next();
        })
        .catch(next);
  }

  module.exports = { isAuthenticated }