const postStoryService = require('../services/postStory.service')
const { CREATED, SuccessResponse, } = require('../core/success.response')


class groupMessController {


    getStory = async (req, res, next) => {
        new SuccessResponse({
            metadata: await postStoryService.getStory(req.params),
        }).send(res)
    }

    addStory = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await postStoryService.addStory(req.body),
        }).send(res)
    }

}

module.exports = new groupMessController()