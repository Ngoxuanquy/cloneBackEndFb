const express = require('express')
const GroupMessController = require('../../controllers/groupMess.controllers')
const asyncHandler = require('../../helpers/asyncHandle')
const { authenticationV2 } = require('../../auth/authUntil')

const router = express.Router()


//check _id của users
router.use(authenticationV2)



router.post('/addGroup', asyncHandler(GroupMessController.addGroup))
router.post('/getGroup/:keyId', asyncHandler(GroupMessController.getGroup))


module.exports = router