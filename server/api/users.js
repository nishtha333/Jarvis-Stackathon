const { uploadImageToS3, uploadImageToFaceCollection, 
    createAndUploadWelcomeMsg, searchFaceByImageInCollection, deleteImageFromFaceCollection } = require('../db/utils')
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
//Create and Upload Welcome audio msg to S3 too
router.post("/", (req, res, next) => {
    const { firstName, lastName, image } = req.body;
    let imageName, imageUrl, faceId;

    searchFaceByImageInCollection(image)
        .then(response => {
            if(response) {
                throw new Error("User already registered. Please login..")
            } else {
                return uploadImageToS3(image, firstName.concat(lastName))
            }
        }).then(({ imageKey, url }) => {
            imageName = imageKey; 
            imageUrl = url;
            return uploadImageToFaceCollection(imageKey);
        }).then(({id})  => {
            faceId = id;
            return createAndUploadWelcomeMsg(firstName)                 
        }).then(({ audioName, audioUrl }) => {
            return User.create({ firstName, lastName, imageName, faceId, imageUrl, audioName, audioUrl })  
        }).then(user => res.status(201).send(user))
        .catch(next);
});

/* TO DO: If new image is updated, need to update S3 and FaceCollection  and new FaceID should be saved*/
router.put("/", async (req, res, next) => {
    const { firstName, lastName, image, email, address } = req.body
    let imageName, imageUrl, faceId, audioName, audioUrl

    try {
        faceId = req.body.faceId
        const user = await User.findOne({ where: { faceId } });
        imageName = user.imageName;
        imageUrl = user.imageUrl;
        audioName = user.audioName;
        audioUrl = user.audioUrl;

        if(image.length) {
            await deleteImageFromFaceCollection(faceId);
            const result = await uploadImageToS3(image, firstName.concat(lastName));
            imageName = result.imageKey;
            imageUrl = result.url;
            const { id } = await uploadImageToFaceCollection(imageName);
            faceId = id;
        } 

        if(user.firstName != firstName) {
            const audio = await createAndUploadWelcomeMsg(firstName);
            audioName = audio.audioName;
            audioUrl = audio.audioUrl;             
        }                       
        await user.update({ firstName, lastName, imageName, faceId, imageUrl, email, address, audioName, audioUrl });
        const update = await User.findOne({ where: { faceId } });
        res.send(update);
    }
    catch(error) {
        next(error);
    }
});

/*TO DO: Remove the image from S3 bucket and Face Collection */
router.delete("/:id", (req, res, next) => {
    User.findById(req.params.id)
        .then(user => user.destroy())
        .then(() => res.sendStatus(204))
        .catch(next);
});