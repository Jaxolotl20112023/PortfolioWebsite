const fs = require('fs').promises; 
const path = require('path'); 

const {getPosts, updateLikes} = require('../database/databasepg');

const handleGetLikes = (req, res) => {

    const id = req.query.id; 
    if (!id) return res.status(400).json({"error" : "Please enter an id!"}); 

    // const db = require('../models/likesDb.json')
    // const [post] = db.filter((key) => key.id === id)
    const post = getPosts('likes', id);
    console.log(post);  
    if (!post) return res.status(404).json({"error" : "Post not found!"});
    
    return res.status(200).json({"likes" : post}); 

}

const handleUpdateLikes = async (req, res) => {

    const id = req.query.id; 
    const {likes} = req.body; 
    
    if (!id || !likes) return res.status(400).json({"error" : "Please enter an id or valid number of likes!"}); 

    updateLikes(id, likes); 
    // const db = require('../models/likesDb.json'); 
    // const [post] = db.filter((key) => key.id === id);
    // post.likes = likes;
    
    // const removeDB = db.filter((key) => key.id !== post.id); 
    // const newDB = [...removeDB,post]; 

    // console.log(newDB);

    // await fs.writeFile(path.join(__dirname, '../', 'models', 'likesDb.json'), JSON.stringify(newDB)); 
    return res.status(200).json({"details" : "Success!!"});

}

module.exports = {handleGetLikes, handleUpdateLikes}