const { Schema, model, Types } = require('mongoose') // Erase if already required

const DOCUMENT_NAME = 'Comment'
const COLLECTION_NAME = 'Comments'
// Declare the Schema of the Mongo model
var commentSchema = new Schema(
    {
        user_id: {
            type: String,
            require: true,
            // ref: 'Shop',
        },
        to_id: {
            type: String,
        },
        to_name: {
            type: String,
            required: true,
        },
        post_id: {
            type: String,
            required: true,
        },
        content: {
            type: Array,
            required: true,
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
)

//Export the model
module.exports = model(DOCUMENT_NAME, commentSchema)
