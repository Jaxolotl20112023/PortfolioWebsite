const fs = require('fs').promises; 
const path = require('path'); 

const {updateLikes, getLikes} = require('../database/databasepg');

const handleGetLikes = async (req, res) => {

    const id = req.query.id; 
    if (!id) return res.status(400).json({"error" : "Please enter an id!"}); 

    console.log("id: ", id);
    const post = await getLikes([id]);
    console.log("likes: ",post);  
    if (!post) return res.status(404).json({"error" : "Post not found!"});
    
    return res.status(200).json(post); 

}

const handleUpdateLikes = async (req, res) => {

    const {likes,id} = req.body; 
    
    if (!id || !likes) return res.status(400).json({"error" : "Please enter an id or valid number of likes!"}); 

    console.log("number of likes: ",likes); 
    console.log("want to update id: ",id);

    try {
        await updateLikes(id, likes); 
        return res.status(200).json({"details" : "Success!!"});
    } catch (err) {
        return res.status(400).json({"error" : "Could not update likes!"});
    }
    
    

}

module.exports = {handleGetLikes, handleUpdateLikes}