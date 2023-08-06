const express = require('express')
const NofiticatiionModel = require('../models/nofitication.model')
const { BadRequestError, AuthFailureError, ForbiddenError } = require('../core/error.response.js')
const bcrypt = require('bcryptjs')
const crypto = require('node:crypto')
const KeyTokenService = require('./keyToken.service.js')
const { createTokenPair, verifyJWT } = require('../auth/authUntil.js')
const { getInfoData } = require('../utils/index.js')
const { findByEmail } = require('./shop.service.js')
const { findAllPost, getAllByIds } = require('../models/repositories/post.repo.js')
const mongoose = require('mongoose');

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITTOR: 'EDITTOR',
    ADMIN: 'ADMIN',
}

class NofiticatiionService {

    static addNofiticatiion = async (payload) => {

        console.log(payload)

        try {
            const newPost = NofiticatiionModel.create({
                to_name: payload.to_name,
                to_id: payload.to_id,
                user_id: payload.user_id,
                type: payload.type,
                // user: payload.user,
                post_id: payload.post_id
            })

            return newPost;

        } catch (error) {
            throw error;
        }
    }

    static getNofiticatiion = async ({ user_id }) => {
        try {

            const filter = { user_id: user_id };
            const result = await NofiticatiionModel.find(filter);

            return result;

        } catch (error) {
            throw error;
        }
    }

    static getAllById = async ({ user_id }) => {
        try {

            const filter = { user_id: user_id };
            const result = await postModel.find(filter);

            return result;

        } catch (error) {
            throw error;
        }
    }


    static postHaha = async ({ user_post, user_id, feeling_value }) => {
        try {
            const checkPost = await postModel.findById(user_post);

            if (!checkPost) {
                throw new AuthFailureError('Authentication error');
            }

            // Hàm tìm kiếm phần tử dựa trên tiêu chí cho trước
            const index = checkPost.feeling.findIndex(item => item.user_id === user_id);

            console.log({ index })

            if (index === -1) {
                // Phần tử không tồn tại, thêm mới vào mảng
                checkPost.feeling.push({
                    user_post: user_post,
                    user_id: user_id,
                    feeling: feeling_value,
                });
            } else {
                // Phần tử đã tồn tại, cập nhật nó
                checkPost.feeling[index].feeling = feeling_value;
                const filter = { _id: user_post };

                const update = {
                    feeling: checkPost.feeling
                }

                const newPost = await postModel.updateOne(filter, update)
                return newPost;
            }

            const result = await checkPost.save();
            return result;
        } catch (error) {
            throw error;
        }
    };

};





module.exports = NofiticatiionService