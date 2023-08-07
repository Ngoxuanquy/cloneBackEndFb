const FriendPostService = require('../services/friend.service')
const { CREATED, SuccessResponse, } = require('../core/success.response')


class FriendController {


    getUserName = async (req, res, next) => {
        new SuccessResponse({
            metadata: await FriendPostService.getUserNames(req.params),
        }).send(res)
    }

    getNameById = async (req, res, next) => {
        new SuccessResponse({
            metadata: await FriendPostService.getNameById(req.body),
        }).send(res)
    }


    checkFriend = async (req, res, next) => {
        new SuccessResponse({
            metadata: await FriendPostService.checkFriend(req.body),
        }).send(res)
    }

    getAllPostById = async (req, res, next) => {
        new SuccessResponse({
            metadata: await FriendPostService.getAllPostById(req.params),
        }).send(res)
    }

    addFriend = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await FriendPostService.addFriend(req.body),
        }).send(res)
    }

    deleteFriend = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await FriendPostService.deleteFriend(req.body),
        }).send(res)
    }

    submitFriend = async (req, res, next) => {
        new CREATED({
            message: 'Register OK',
            metadata: await FriendPostService.submitFriend(req.body),
        }).send(res)
    }

}

module.exports = new FriendController()