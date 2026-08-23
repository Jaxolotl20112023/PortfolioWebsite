const fs = require('fs').promises;
const path = require('path');  

const {Mutex} = require('async-mutex');
const fileMutex = new Mutex();
const {postQuery} = require("../database/databasepg"); 

const handleRegister = async (req,res) => {

    const release = await fileMutex.acquire(); 

    const {currID} = req.body; 
    if (!currID) return res.status(404).json({"error" : "Please put a valid id"}); 

    const post = {
        id: currID,
        likes: 0  
    }

    query("INSERT INTO posts(likes,id) VALUES($1,$2)", [post.id, post.likes])
    // await fs.writeFile(path.join(__dirname, '../', 'models', 'likesDb.json'), JSON.stringify(newDB)); 
    console.log("wrote to file!"); 

    release(); 
    return res.status(200).json({"details" : "success"}); 

}

module.exports = {handleRegister};