const PostService = require('../services/post.service')
const { CREATED, SuccessResponse, } = require('../core/success.response')


class AccessController {

    createPost = async (req, res, next) => {
        console.log(req.body)
        new CREATED({
            message: 'Register OK',
            metadata: await PostService.createPost(req.body),
        }).send(res)
    }

    getPost = async (req, res, next) => {
        console.log(req.query)
        new SuccessResponse({
            metadata: await PostService.findAllProducts(req.query),
        }).send(res)
    }

    postHaha = async (req, res, next) => {

        console.log(req.body)
        new CREATED({
            message: 'Register OK',
            metadata: await PostService.postHaha(req.body),
        }).send(res)
    }

    deleteComment = async (req, res, next) => {
        console.log(req.body)
        new CREATED({
            message: 'Register OK',
            metadata: await PostService.deleteComment(req.body),
        }).send(res)
    }

    getAllById = async (req, res, next) => {
        console.log(req.query)
        new SuccessResponse({
            metadata: await PostService.getAllById(req.query),
        }).send(res)
    }

    getPostById = async (req, res, next) => {
        new SuccessResponse({
            metadata: await PostService.getPostById(req.params),
        }).send(res)
    }

    createComment = async (req, res, next) => {
        console.log(req.body)
        new CREATED({
            message: 'Register OK',
            metadata: await PostService.createComment(req.body),
        }).send(res)
    }



}

module.exports = new AccessController()