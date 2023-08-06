const express = require('express')
const PostStoryController = require('../../controllers/postStory.controllers')
const asyncHandler = require('../../helpers/asyncHandle')
const { authenticationV2 } = require('../../auth/authUntil')

const router = express.Router()


//check _id của users
router.use(authenticationV2)



router.post('/addStory', asyncHandler(PostStoryController.addStory))
router.post('/getStory', asyncHandler(PostStoryController.getStory))


module.exports = router