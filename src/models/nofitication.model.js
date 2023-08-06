const { Schema, model, Types } = require('mongoose') // Erase if already required

const DOCUMENT_NAME = 'Nofiticatiion'
const COLLECTION_NAME = 'Nofiticatiions'
// Declare the Schema of the Mongo model
var nofiticatiionSchema = new Schema(
    {
        user_id: {
            type: String,
            require: true,
            // ref: 'Shop',
        },
        type: {
            type: String,
            required: true,
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
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
)

//Export the model
module.exports = model(DOCUMENT_NAME, nofiticatiionSchema)
