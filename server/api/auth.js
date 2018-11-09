const jwt = require('jwt-simple')
const { isAuthenticated } = require('./utils')
const db = require('../db');
const { User } = db.models;
const express = require('express');
const router = express.Router();

module.exports = router;

router.post('/', (req, res, next) => { 
    const { image } = req.body;

    /* TO DO:
    Run the image through the face recoginition in collection and if match, then get the user that matches face ID */
    const faceId = '';
    User.findOne({
        where: { faceId }
    }).then( user => {
        if(!user) {
            return next({ status: 401 });
        }
        const token = jwt.encode({ faceId: user.faceId }, process.env.JWT_SECRET);
        res.send({ token })
    })
    .catch(next);
});

router.get('/', isAuthenticated, (req, res, next) => {
    if(!req.user) {
        return next({ status: 401 })
    }
    res.send(req.user);
});