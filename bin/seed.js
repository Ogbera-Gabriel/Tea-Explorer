const mongoose = require('mongoose');

const TeaQuote = require('../models/TeaQuotes.model.js');


const MONGO_URI =
"mongodb+srv://Gabriel:6IKVRbqusGKvLIew@cluster0.gses18a.mongodb.net/Tea"

const teaquotes = [
    {
        teaQuote: "It's hard. Wanting the tea, but also not wanting the tea, but feeling like you should want the tea, but knowing you should protest the tea, so you put the protest on the teapot and throw all the tea in the harbor, and the teapot I guess. . . stays empty? - Katherine Locke, Out Now: Queer We Go Again!"
    },
    {
        teaQuote: "All you need is tea, travel and a good book - Niamh Horne"
    },
    {
        teaQuote: "I greet you as guests and so will not crush the life from you and devour your souls with peals of laughter. No, instead I will make some tea. - Steven Erikson"
    }
]

async function insertTea() {
    try {
        let db = await mongoose.connect(MONGO_URI)
        
        console.log("Database is now connected");

        let teaQuoteCreated = await TeaQuote.create(teaquotes)

        console.log(teaQuoteCreated)

        await mongoose.connection.close();
    } catch (error) {
        console.log('Error', error)
    }
}

insertTea();