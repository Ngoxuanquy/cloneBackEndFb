const groupMessService = require('../services/groupMess.service')
const { CREATED, SuccessResponse, } = require('../core/success.response')


class groupMessController {


    getGroup = async (req, res, next) => {
        console.log(req.params)
        new SuccessResponse({
            metadata: await groupMessService.getGroup(req.params),
        }).send(res)
    }

    addGroup = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await groupMessService.addGroup(req.body),
        }).send(res)
    }

}

module.exports = new groupMessController()