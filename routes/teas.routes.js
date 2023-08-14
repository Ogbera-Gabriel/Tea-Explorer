const router = require("express").Router();
const Tea = require('../models/Tea.model.js')
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const ReviewModel = require("../models/Review.model.js");
const User = require("../models/User.model.js");


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
        //console.log(teasDetail)

        const users = await User.find()

        await teasDetail.populate('review')

        await teasDetail.populate({
            path: 'review',
            populate: {
                path: 'author',
                model: 'User'
            }
        })

        //console.log(teasDetail)

        res.render('teas/teas-details.hbs', {teas: teasDetail})
    } catch (error) {
        console.log(error)
    }
})

router.post('/review/create/:teaId', isLoggedIn, async (req, res) => {
    try {
        const { teaId } = req.params;
        const { content, user_id } = req.body;

        // Create a new review
        const review = await ReviewModel.create({ content, user_id });

        // Get the details of the currently logged-in user
        const user = req.session.currentUser;
        console.log(user);

        // Update the tea's review array and the user's review array
        const teaUpdate = await Tea.findByIdAndUpdate(teaId, { $push: { review: review._id } });
        const userUpdate = await User.findByIdAndUpdate(user._id, { $push: { review: review._id } });

        // Redirect back to the tea details page
        res.redirect(`/teas/${teaId}`);
    } catch (error) {
        console.log(error);
    }
});

router.post('/review/delete/:reviewId', isLoggedIn, async(req, res) => {
    try {
        const { reviewId} = req.params;
        const removeReview = await ReviewModel.findByIdAndRemove(reviewId);
        const user = req.session.currentUser
        await User.findByIdAndUpdate(removeReview.user_id, {$pull: {review: removeReview._id}})
        
       
        res.redirect('/teas')
        
        
    } catch (error) {
        
    }
})


module.exports = router;