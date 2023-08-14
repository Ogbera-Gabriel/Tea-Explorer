const router = require("express").Router();
const Tea = require('../models/Tea.model.js')
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");


router.get('/teas', isLoggedIn, async (req, res) => {
    try{
        let allTeasFromDB = await Tea.find()
        res.render('teas/teas.hbs', {teas: allTeasFromDB})
    }
    catch(error){
        console.log(error)
    }
})

router.get('/teas/:teaId', isLoggedIn, async(req, res) =>{
    try {
        const {teaId} = req.params
        const teasDetail = await Tea.findById(teaId)
        console.log(teasDetail)

        res.render('teas/teas-details.hbs', {teas: teasDetail})
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;