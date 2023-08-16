const {Schema, model} = require('mongoose')

const teaQuoteSchema = new Schema(
    {
        teaQuote: String,
    },
    {
        timestamps: true
    }
)

const TeaQuote = model('TeaQuote', teaQuoteSchema)

module.exports = TeaQuote;

