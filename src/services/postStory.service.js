const express = require('express')
const postModel = require('../models/post.model.js')
const { BadRequestError, AuthFailureError, ForbiddenError } = require('../core/error.response.js')
const bcrypt = require('bcryptjs')
const crypto = require('node:crypto')
const KeyTokenService = require('./keyToken.service.js')
const { createTokenPair, verifyJWT } = require('../auth/authUntil.js')
const { getInfoData } = require('../utils/index.js')
const { findByEmail } = require('./shop.service.js')
const { findAllPost, getAllByIds } = require('../models/repositories/post.repo.js')
const mongoose = require('mongoose');
const postStory = require('../models/postStory.model.js')

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITTOR: 'EDITTOR',
    ADMIN: 'ADMIN',
}

class PostService {

    static addStory = async (payload) => {

        try {

            const filter = { user_id: payload.user_id };
            const update = {
                user_id: payload.user_id,
                user_name: payload.user_name,
                user_img: payload.user_img,
            };

            if (payload.imgs) {
                update.$push = { imgs: payload.imgs };
            }
            const options = { upsert: true, new: true };

            const newPost = await postStory.findOneAndUpdate(filter, update, options)

            // const newPost = postStory.create({
            //     user_id: payload.user_id,
            //     user_name: payload.user_name,
            //     user_img: payload.user_img,
            //     imgs: payload.imgs
            // })
            return newPost;

        } catch (error) {
            throw error;
        }
    }

    static getStory = async ({ keyId }) => {
        try {

            const checkGroup = await postStory.find({});


            // const result = groupMess.find({})
            return checkGroup

        } catch (error) {
            throw error
        }
    }



};



module.exports = PostService