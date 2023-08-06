const { Schema, model } = require('mongoose') // Erase if already required

const DOCUMENT_NAME = 'Friend'
const COLLECTION_NAME = 'Friends'

// Declare the Schema of the Mongo model
var friendSchema = new Schema(
    {
        from_user: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
        },
        to_user: {
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
module.exports = model(DOCUMENT_NAME, friendSchema)
