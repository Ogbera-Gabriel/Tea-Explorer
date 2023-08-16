const router = require("express").Router();
const Tea = require('../models/Tea.model.js')
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const ReviewModel = require("../models/Review.model.js");
const User = require("../models/User.model.js");
const fileUploader = require("../config/cloudinary.config");






router.get('/teas', isLoggedIn, async (req, res) => {
    try{
        let allTeasFromDB = await Tea.find()
        const user = req.session.currentUser;
        console.log(user)
        res.render('teas/teas.hbs', {teas: allTeasFromDB, user})
    }
    catch(error){
        console.log(error)
    }
})

router.get("/teas/create", isLoggedIn, async (req, res) =>{
    try {
      res.render('teas/new-tea.hbs');
    } catch (error) {
      console.log(error);
    }
  })
  
  
  router.post('/teas/create', isLoggedIn, fileUploader.single("tea-cover-image"),  async(req, res) =>{
   try {
      const {name, origin, description, caffeine, tasteDescription, type} = req.body;
      await Tea.create({name, origin, description, caffeine, tasteDescription, type, image: req.file.path})
      res.redirect("/teas");
   } catch (error) { 
     console.log('Error while creating Tea', error);
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
        });


        res.render('teas/teas-details.hbs', {teas: teasDetail, teasReviews: teasDetail.review, user: req.session.currentUser})
    } catch (error) {
        console.log(error)
    }
})

router.get('/teas/:id/edit', isLoggedIn, async (req, res) =>{
  try {
    const { id } = req.params;
    let teaEdit = await Tea.findById(id);
    res.render('teas/teas-edit', {teaEdit})
  } catch (error) {
    console.log(error)
  }
})

router.post('/teas/:id/edit', isLoggedIn, fileUploader.single("tea-cover-image"), async (req, res) =>{
  try {
    const { id } =req.params
    const {name, origin, description, caffeine, tasteDescription, type , existingImage} = req.body
    let image;
    if(req.file){
      image = req.file.path;
    }else {
      image = existingImage;
    }

    const editTea = await Tea.findByIdAndUpdate(id, {name, origin, description, caffeine, tasteDescription, type , image}, {new: true})
    res.redirect('/teas')
  } catch (error) {
    console.log(error)
  }
})


router.post('/review/create/:teaId', isLoggedIn, async (req, res) => {
    try {
        const { teaId } = req.params;
        const { content} = req.body;

        // Get the details of the currently logged-in user
        const user = req.session.currentUser;

        // Create a new review
        const review = await ReviewModel.create({ content, author: user});

        // Update the tea's review array and the user's review array
        const teaUpdate = await Tea.findByIdAndUpdate(teaId, { $push: { review: review._id } });
        const userUpdate = await User.findByIdAndUpdate(user._id, { $push: { review: review._id } });

        // Redirect back to the tea details page
        res.redirect(`/teas/${teaId}`);
    } catch (error) {
        console.log(error);
    }
});

router.post('/review/delete/:teaId/:reviewId', isLoggedIn, async(req, res) => {
    try {
        const { teaId, reviewId } = req.params;
        const {currentUser} = req.session;

        await ReviewModel.findByIdAndRemove(reviewId);
        await Tea.findByIdAndUpdate(teaId, {$pull: {review: reviewId}});
        
        
        await User.findByIdAndUpdate(currentUser._id, {$pull: {review: reviewId}})
        
       
        res.redirect('/teas')
        
        
    } catch (error) {
        
    }
})

router.post("/teas/favorite/:id", isLoggedIn, async (req, res, next) => {
    const { id } = req.params;
    const currentUser = req.session.currentUser._id;
    try {
      const saveTea = await User.findByIdAndUpdate(currentUser, {
        $push: { favorites: id },
      });
  
      res.redirect(`/teas`);
    } catch (error) {
      console.log("Error while saving album to favorites:", error);
    }
  });


  router.get("/favorites", isLoggedIn, async (req, res, next) => {
    try {
      const currentUser = req.session.currentUser._id;
      console.log(currentUser)
  
      const user = await User.findById(currentUser).populate("favorites");
      console.log(user)
  
      res.render("teas/teas-favorites", user);
    } catch (error) {
      console.log("Error while viewing saved albums profile", error);
    }
  });
  
  router.post('/favorites/delete/:favoritesId', isLoggedIn, async (req, res) => {
       try { 
        const {favoritesId} = req.params;
        const user = req.session.currentUser
        // const removeFavorites = await User.findByIdAndRemove(favoritesId);
        await User.findByIdAndUpdate(user._id, {$pull: {favorites: favoritesId}})
        res.redirect('/favorites')
  } catch (error) {
    console.log('error', error)

  }
  })

  router.get('/search', isLoggedIn, async (req, res) =>{
    try {
      const searchQuery = req.query.name
      let foundTea = await Tea.find({name: { $regex: searchQuery, $options: 'i' }})
      console.log(foundTea);
      const user = req.session.currentUser;
      if(foundTea.length === 0){
        res.render('teas/search-result', {errorMessage: 'Oops! We do not have this tea in our DB. Maybe try to create a new one? 😉'})
      }
      
      res.render('teas/search-result', {teas: foundTea, user})
      
    } catch (error) {
      console.log(error)
    }
  })

  



module.exports = router;