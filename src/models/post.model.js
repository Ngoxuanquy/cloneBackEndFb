const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Post';
const COLLECTION_NAME = 'Posts';

const postSchema = new mongoose.Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            maxLength: 150,
        },
        content: {
            type: String,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        imgs: {
            type: Array,
        },
        verify: {
            type: mongoose.Schema.Types.Boolean,
            default: false,
        },

        feeling: {
            type: Array,
        },
        feeling_angry: {
            type: Number,
        },
        feeling_senseless: {
            type: Number,
        },
        share: {
            type: Array,
        },
        comment: {
            type: Array,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, postSchema);
