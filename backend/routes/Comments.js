const express = require("express");
const router = express.Router(); 
const {handleGetComments, handleAddComments} = require("../controllers/commentsController"); 

router.route(/^\/$/)    
    .get(handleGetComments)
    .post(handleAddComments)

module.exports = router;