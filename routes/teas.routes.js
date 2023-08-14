const router = require("express").Router();
const Tea = require('../models/Tea.model.js')

router.get('/teas', async (req, res) => {
    try{
        let allTeasFromDB = await Tea.find()
        console.log(allTeasFromDB)
        res.render('teas/teas.hbs', {teas: allTeasFromDB})
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router;