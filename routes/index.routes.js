const express = require('express');
const router = express.Router();
const TeaQuote = require('../models/TeaQuotes.model.js');


//Render Random Messages taken from the TeaQuote DataBase to Display on IndexPage
/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const randomTeaQuote = await TeaQuote.aggregate([{ $sample: { size: 1 } }]);
    console.log(randomTeaQuote[0].teaQuote);
    res.render('index', { teaQuote: randomTeaQuote[0].teaQuote });
    
  } catch (error) {
    console.log(error)
  }
  

});

router.get('/', async(req, res) => {
  
})

module.exports = router;
