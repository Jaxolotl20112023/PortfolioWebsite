
const {getComments, postComments} = require('../database/databasepg'); 

const handleGetComments = async (req,res) => {

    const {limit,offset} = req.query; 

    try {
        const comments = await getComments(limit,offset); 
        if (!comments) return res.status(400).json({"error" : "Unable to retrieve comments from db"}); 

        return res.status(200).json({"details" : comments}); 
    } catch (err) {
        console.error(err); 
        return res.sendStatus(400); 
    }
    
}

const handleAddComments = async (req,res) => {

    const {date, content} = req.body; 
    console.log(date);
    console.log(content);

    try {
        await postComments(date,content); 
        return res.sendStatus(201); 
    } catch (err) {
        console.error(err); 
        return res.sendStatus(400); 
    }
    
}

module.exports = {handleGetComments, handleAddComments}; 