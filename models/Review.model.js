const { Schema, model } = require('mongoose')

const reviewSchema = new Schema(
    {
        content: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('Review', reviewSchema);