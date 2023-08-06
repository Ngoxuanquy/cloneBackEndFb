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
const friendSchema = require('../models/friend.modal.js')

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITTOR: 'EDITTOR',
    ADMIN: 'ADMIN',
}

class FriendService {


    static getUserNames = async ({ keySearch }) => {
        try {
            const regexSearch = new RegExp(keySearch, 'i')
            const result = await friendSchema.find({ name: { $regex: regexSearch } }).lean();

            return result

        } catch (error) {
            throw error
        }
    }

    static getNameById = async (payload) => {
        try {
            const result = await friendSchema.find({
                from_user: payload.userId,
                to_user: payload.youId,
            }).exec();

            return result;
        } catch (err) {
            console.error(err);
            throw err; // Optionally rethrow the error to handle it further up the call stack
        }
    }

    static getAllPostById = async ({ ById }) => {
        try {
            const result = await friendSchema.find({
                $or: [
                    { from_user: ById, status: true },
                    { to_user: ById, status: true },
                ]
            }).exec();

            const newIdFriend = [...new Set(result.reduce((acc, item) => [...acc, item.from_user, item.to_user], []))]

            return newIdFriend
        } catch (err) {
            console.error(err);
            throw err; // Optionally rethrow the error to handle it further up the call stack
        }
    }


    static checkFriend = async (payload) => {
        try {
            const result = await friendSchema.find({
                to_user: payload.userId,
                from_user: payload.youId,
            }).exec();

            return result;
        } catch (err) {
            console.error(err);
            throw err; // Optionally rethrow the error to handle it further up the call stack
        }
    }

    static submitFriend = async (payload) => {
        try {
            const check = await friendSchema.updateOne({
                to_user: payload.userId,
                from_user: payload.youId,
            },
                {
                    status: true
                }
            ).exec();


            return check;
        } catch (err) {
            console.error(err);
            throw err; // Optionally rethrow the error to handle it further up the call stack
        }
    }

    static addFriend = async (payload) => {
        try {

            const result = friendSchema.create({
                to_user: payload.youId,
                from_user: payload.userId
            })

            return result;

        } catch (error) {
            throw error
        }
    }

    static deleteFriend = async (payload) => {
        try {

            const result = friendSchema.deleteOne({
                to_user: payload.youId
            })

            return result;

        } catch (error) {
            throw error
        }
    }


};



module.exports = FriendService