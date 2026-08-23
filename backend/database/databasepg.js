const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres", 
    port: 5432,
    password: "Apr#2002",
    database: "portfolio"
})

client.connect(); 

const postQuery = async (query, values) => {

    try {
        await client.query(query,values); 
    } catch (err) {
        console.error(err); 
    }
}

const getPosts = async (column='*', filter) => {

    try {
        const likes = await client.query("SELECT $1 FROM posts WHERE id = $2", column, filter); 
        return likes.rows; 
    } catch (err) {
        console.error(err); 
    }
}

const updateLikes = async (id, likes) => {

    try {
        await client.query("UPDATE user SET likes = $1 WHERE id = $2", likes, id); 
    } catch (err) {
        console.error(err); 
    }
}

module.exports = {postQuery, getPosts, updateLikes}; 