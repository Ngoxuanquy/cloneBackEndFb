const { Schema, model } = require('mongoose') // Erase if already required

const DOCUMENT_NAME = 'GroupMess'
const COLLECTION_NAME = 'GroupMesss'

// Declare the Schema of the Mongo model
var GroupMessSchema = new Schema(
    {
        array_user: {
            type: Array,
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            // default: "quyquy",
        },

        array_Id: {
            type: Array,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
)

//Export the model
module.exports = model(DOCUMENT_NAME, GroupMessSchema)
