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
    },
    {
        teaQuote: "Tea's like magic, man. I felt like I could slip a tea reading into a church potluck and everyone would be amused, as opposed to the horrified reaction I'd get slamming a deck of Tarot cards beside the green bean casserole - J. W. Ocker"
    },
    {
        teaQuote: "When mama does my hair, she spills all the tea. - Alicia D. Williams, Genesis Begins Again"
    },
    {
        teaQuote: "I say let the world go to hell, but I should always have my tea. - Fyodor Dostoevsky, Notes from Underground"
    },
    {
        teaQuote: "A cup of tea would restore my normality. - Douglas Adams"
    },
    {
        teaQuote: "Dad was at his desk when I opened the door, doing what all British people do when they're freaked out: drinking tea. - Rachel Hawkins, Demonglass"
    },
    {
        teaQuote: "There is something in the nature of tea that leads us into a world of quiet contemplation of life - Lin Yutang, The Importance of Living"
    },
    {
        teaQuote: "Thank God for tea! What would the world do without tea! How did it exist? I am glad I was not born before tea. -  Sydney Smith, A memoir of the Rev. Sydney Smith"
    },
    {
        teaQuote: "Tea is the magic key to the vault where my brain is kept. - Frances Hardinge"
    },
    {
        teaQuote: "Tea ... is a religion of the art of life. - Kakuzō Okakura, The Book of Tea"
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