const express = require('express')
const PostController = require('../../controllers/post.controllers')
const asyncHandler = require('../../helpers/asyncHandle')
const { authenticationV2 } = require('../../auth/authUntil')

const router = express.Router()


//check _id của users
router.use(authenticationV2)

router.post('/createPost', asyncHandler(PostController.createPost))
router.post('/getPost', asyncHandler(PostController.getPost))
router.post('/postHaha', asyncHandler(PostController.postHaha))
router.post('/getAllById', asyncHandler(PostController.getAllById))
router.post('/getPostById/:post_id', asyncHandler(PostController.getPostById))
router.post('/createComment', asyncHandler(PostController.createComment))
router.post('/deleteComment', asyncHandler(PostController.deleteComment))






module.exports = router