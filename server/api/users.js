const { uploadImageToS3, uploadImageToFaceCollection } = require('../db/utils')
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


//Upload Image Data to S3. Add Image to FaceCollection. Store ImageName, FaceId in DB.
router.post("/", (req, res, next) => {
    const { firstName, lastName, image } = req.body;
    let imageName, imageUrl;

    uploadImageToS3(image, firstName.concat(lastName))
        .then(({ imageKey, url }) => {
            imageName = imageKey; 
            imageUrl = url;
            return uploadImageToFaceCollection(imageKey);
        }).then(({ faceId }) => {
            return User.create({ firstName, lastName, imageName, faceId, imageUrl })               
        }).then(user => res.status(201).send(user))
        .catch(next);
});

/* TO DO: If new image is updated, need to update S3 and FaceCollection  and new FaceID should be saved*/
router.put("/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(user => user.update(req.body))
        .then(user => res.send(user))
        .catch(next);
});

/*TO DO: Remove the image from S3 bucket and Face Collection */
router.delete("/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(user => user.destroy())
        .then(() => res.sendStatus(204))
        .catch(next);
});