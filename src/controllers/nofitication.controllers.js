const NofiticatiionService = require('../services/Nofiticatiion.service')
const { CREATED, SuccessResponse, } = require('../core/success.response')


class NofiticatiionController {

    addNofiticatiion = async (req, res, next) => {
        console.log(req.body)
        new CREATED({
            message: 'Register OK',
            metadata: await NofiticatiionService.addNofiticatiion(req.body),
        }).send(res)
    }

    getNofiticatiion = async (req, res, next) => {
        new SuccessResponse({
            metadata: await NofiticatiionService.getNofiticatiion(req.params),
        }).send(res)
    }

    postHaha = async (req, res, next) => {

        console.log(req.body)
        new CREATED({
            message: 'Register OK',
            metadata: await PostService.postHaha(req.body),
        }).send(res)
    }

    getAllById = async (req, res, next) => {
        console.log(req.query)
        new SuccessResponse({
            metadata: await PostService.getAllById(req.query),
        }).send(res)
    }

}

module.exports = new NofiticatiionController()