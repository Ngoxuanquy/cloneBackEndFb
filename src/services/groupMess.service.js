const express = require('express')
const postModel = require('../models/post.model.js')
const { BadRequestError, AuthFailureError, ForbiddenError } = require('../core/error.response.js')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service.js')
const { createTokenPair, verifyJWT } = require('../auth/authUntil.js')
const { getInfoData } = require('../utils/index.js')
const { findByEmail } = require('./shop.service.js')
const { findAllPost, getAllByIds } = require('../models/repositories/post.repo.js')
const mongoose = require('mongoose');
const groupMess = require('../models/groupMess.js')

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITTOR: 'EDITTOR',
    ADMIN: 'ADMIN',
}

class PostService {

    static addGroup = async ({ payload }) => {

        try {

            const ids = payload.map(user => user._id);

            const newPost = groupMess.create({
                array_user: payload,
                array_Id: ids,
                name: payload[2].nameGroup
            })

            console.log(newPost)
            return newPost;

        } catch (error) {
            throw error;
        }
    }

    static getGroup = async ({ keyId }) => {
        try {

            const checkGroup = await groupMess.find({
                array_Id: { $elemMatch: { $eq: keyId } },
            });

            console.log({ checkGroup })

            // const result = groupMess.find({})
            return checkGroup

        } catch (error) {
            throw error
        }
    }



};



module.exports = PostService