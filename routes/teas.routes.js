const router = require("express").Router();
const Tea = require('../models/Tea.model.js')
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
router.get('/teas', isLoggedIn, async (req, res) => {
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