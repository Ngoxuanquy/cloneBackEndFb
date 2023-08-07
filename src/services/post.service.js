const express = require('express')
const postModel = require('../models/post.model.js')
const { BadRequestError, AuthFailureError, ForbiddenError } = require('../core/error.response')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair, verifyJWT } = require('../auth/authUntil')
const { getInfoData } = require('../utils')
const { findByEmail } = require('./shop.service')
const { findAllPost, getAllByIds } = require('../models/repositories/post.repo.js')
const mongoose = require('mongoose');

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITTOR: 'EDITTOR',
    ADMIN: 'ADMIN',
}

class PostService {

    static createPost = async (payload) => {

        try {
            const newPost = postModel.create({
                user_id: payload.user_id,
                name: payload.name,
                // email: payload.email,
                content: payload.content,
                imgs: payload.imgs,
            })
            return newPost;

        } catch (error) {
            throw error;
        }
    }



    static createComment = async (payload) => {

        console.log(payload.postId)
        try {

            const checkPost = await postModel.findById(payload.post_id);

            checkPost.comment.push({
                to_name: payload.to_name,
                to_id: payload.to_id,
                user_id: payload.user_id,
                post_id: payload.post_id,
                content: payload.content,
                from_name: payload.from_name
            });

            const newPost = checkPost.save()

            return newPost;

        } catch (error) {
            throw error;
        }
    }

    static findAllProducts = async ({
        limit = 50,
        sort = 'ctime',
        page = 1,
        filter = { isPublished: true },
        select = null,
    }) => {
        return await findAllPost({
            limit,
            sort,
            page,
            filter,
            select: ['name', 'user_id', 'content', 'comment', 'imgs', 'updatedAt', 'feeling'] || select,
        })
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

    static getPostById = async ({ post_id }) => {
        try {
            const filter = { _id: post_id };
            const result = await postModel.find(filter);

            return result;

        } catch (error) {
            throw error;
        }
    }

    static deleteComment = async ({ payload }) => {
        try {
            const checkPost = await postModel.findById(payload.post_id);

            if (!checkPost) {
                throw new AuthFailureError('Authentication error');
            }

            const filteredData = checkPost.comment.filter(item => {
                return JSON.stringify(item) != JSON.stringify(payload)
            });

            checkPost.comment = filteredData

            const result = await checkPost.save();
            return result;

        } catch (error) {
            throw error;
        }
    };


    static postHaha = async ({ user_post, user_id, feeling_value }) => {
        try {
            const checkPost = await postModel.findById(user_post);

            if (!checkPost) {
                throw new AuthFailureError('Authentication error');
            }

            // Hàm tìm kiếm phần tử dựa trên tiêu chí cho trước
            const index = checkPost.feeling.findIndex(item => item.user_id === user_id);


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





module.exports = PostService