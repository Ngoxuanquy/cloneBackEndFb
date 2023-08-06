const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'PostStory';
const COLLECTION_NAME = 'PostStorys';

const postStorySchema = new mongoose.Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        user_name: {
            type: String,
            maxLength: 150,
        },
        user_img: {
            type: String,
            maxLength: 150,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        imgs: {
            type: Array,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

// Export the model
module.exports = mongoose.model(DOCUMENT_NAME, postStorySchema);
