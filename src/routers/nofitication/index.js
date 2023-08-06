const { addMessage, getMessages } = require("../../controllers/messageController");
const NofiticationController = require('../../controllers/nofitication.controllers')
const asyncHandler = require('../../helpers/asyncHandle')
const { authenticationV2 } = require('../../auth/authUntil')
const router = require("express").Router();
//check _id của users
router.use(authenticationV2)

router.post('/addNofiticatiion', asyncHandler(NofiticationController.addNofiticatiion))
router.post('/getNofiticatiion/:user_id', asyncHandler(NofiticationController.getNofiticatiion))


// router.post("/addmsg", addMessage);
// router.post("/getmsg", getMessages);

module.exports = router;
