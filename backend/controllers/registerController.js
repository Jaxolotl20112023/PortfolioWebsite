const fs = require('fs').promises;
const path = require('path');  

const {Mutex} = require('async-mutex');
const fileMutex = new Mutex();

const handleRegister = async (req,res) => {

    const release = await fileMutex.acquire(); 

    const {currID} = req.body; 
    if (!currID) return res.status(404).json({"error" : "Please put a valid id"}); 

    const db = await require('../models/likesDb.json'); 

    console.log(`db: ${db}`); 
    if ( (db.filter((item) => item.id === currID)).length !== 0 ) return res.status(200).json({"details" : "Already registered"}); 

    const post = {
        id: currID,
        likes: 0  
    }

    const newDB = [...db, post]
    console.log(newDB); 

    await fs.writeFile(path.join(__dirname, '../', 'models', 'likesDb.json'), JSON.stringify(newDB)); 
    console.log("wrote to file!"); 

    release(); 
    return res.status(200).json({"details" : "success"}); 

}

module.exports = {handleRegister};