const express = require('express'); 
const router = express.Router(); 
const {handleGetLikes, handleUpdateLikes} = require('../controllers/likesController');  

router.route(/\//)
    .get(handleGetLikes)
    .post(handleUpdateLikes)


module.exports = router