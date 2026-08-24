const fs = require('fs').promises;
const path = require('path');  

const {Mutex} = require('async-mutex');
const fileMutex = new Mutex();
const {postQuery, getNumberIDs} = require("../database/databasepg"); 

const handleRegister = async (req,res) => {

    const release = await fileMutex.acquire(); 

    const {currID} = req.body; 
    if (!currID) return res.status(404).json({"error" : "Please put a valid id"}); 

    const numberOfIds = await getNumberIDs([currID]); 
    console.log("number of ids: ",numberOfIds);
    if (numberOfIds > 0) return res.status(204).json({"details" : "already registered"}); 

    const post = {
        id: currID,
        likes: 0  
    }

    await postQuery("INSERT INTO posts(likes,id) VALUES($1,$2)", [post.likes, post.id])
    console.log("wrote to file!"); 

    release(); 
    return res.status(200).json({"details" : "success"}); 

}

module.exports = {handleRegister};