const { User } = require('../db').models;
const express = require('express');
const router = express.Router();

module.exports = router;

router.get("/", (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(next);
});

router.get("/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(user => res.send(user))
        .catch(next);
});

/* TO DO. 
- Image Data to be uploaded to S3. URL should then be saved to DB (imageUrl)
- Image to be added to the FaceCollection and FaceID (result) should be saved in DB (faceId)
*/
router.post("/", (req, res, next) => {
    User.create(req.body)
        .then(user => res.status(201).send(user))
        .catch(next);
});

/* If new image is updated, need to update S3 and FaceCollection  and new FaceID should be saved*/
router.put("/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(user => user.update(req.body))
        .then(user => res.send(user))
        .catch(next);
});

/*Remove the image from S3 bucket and Face Collection */
router.delete("/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(user => user.destroy())
        .then(() => res.sendStatus(204))
        .catch(next);
});