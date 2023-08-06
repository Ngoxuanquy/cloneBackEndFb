const express = require('express')
const { apiKey, permission } = require('../auth/checkAuth')
const router = express.Router()

router.use(apiKey)

// check permission
router.use(permission('0000'))


router.use('/v1/api/shop', require('./access'))
router.use('/v1/api/', require('./posts'))
router.use('/v1/api/user', require('./ussers'))
router.use('/v1/api/groupMess', require('./groupMess'))
router.use('/v1/api/story', require('./postStory'))
router.use('/v1/api/friends', require('./friends'))
router.use('/v1/api/messages', require('./message'))
router.use('/v1/api/nofitication', require('./nofitication'))






module.exports = router
