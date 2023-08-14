const {Schema, model} = require('mongoose')

const teaSchema = new Schema (
    { name: String,
      image: String,
      origin: String,
      description: String,
      caffeine: String,
      tasteDescription: String,
      type: String,
      review: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }]

    },
    {
        timestamps: true
    }

)
module.exports = model('Tea', teaSchema)