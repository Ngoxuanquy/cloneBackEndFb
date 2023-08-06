const express = require('express')
const FriendController = require('../../controllers/friend.controllers')
const asyncHandler = require('../../helpers/asyncHandle')
const { authenticationV2 } = require('../../auth/authUntil')

const router = express.Router()


//check _id của users
router.use(authenticationV2)

router.post('/getNameById', asyncHandler(FriendController.getNameById))
router.post('/checkxacnhanBanBe', asyncHandler(FriendController.checkFriend))
router.post('/addFriend', asyncHandler(FriendController.addFriend))
router.post('/deleteFriend', asyncHandler(FriendController.deleteFriend))
router.post('/XacNhanFriend', asyncHandler(FriendController.submitFriend))
router.post('/getAllPostById/:ById', asyncHandler(FriendController.getAllPostById))




module.exports = router