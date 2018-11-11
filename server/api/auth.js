const jwt = require('jwt-simple');
const { isAuthenticated } = require('./utils');
const { searchFaceByImageInCollection } = require('../db/utils');
const db = require('../db');
const { User } = db.models;
const express = require('express');
const router = express.Router();

module.exports = router;

router.post('/', (req, res, next) => { 

    searchFaceByImageInCollection(req.body.image)
        .then(faceId => {
            return User.findOne({ where: { faceId } })
        }).then( user => {    
            if(!user) {
                return next({ status: 401 });
            }
            const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET);
            const welcomeMsg = user.audioUrl;
            res.send({ token, welcomeMsg })
        }).catch(next);
});

router.post('/bruteForce', (req, res, next) => { 
    const { userName, password } = req.body
    User.findOne({ where: { firstName: userName, lastName: password } })
        .then( user => {    
            if(!user) {
                return next({ status: 401 });
            }
            const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET);
            const welcomeMsg = user.audioUrl;
            res.send({ token, welcomeMsg })
        }).catch(next);
});

router.get('/', isAuthenticated, (req, res, next) => {
    if(!req.user) {
        return next({ status: 401 })
    }
    res.send(req.user);
});