const {Client, Pool} = require('pg');

// const client = new Client({
//     host: "localhost",
//     user: "postgres", 
//     port: 5432,
//     password: "Apr#2002",
//     database: "portfolio"
// })

const pool = new Pool({
    user: "postgres", 
    host: "localhost", 
    database:"portfolio",
    port: 5432,
    password: "Apr#2002",

    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000
})

const postQuery = async (query, values) => {

    try {
        await pool.query(query,values); 
    } catch (err) {
        console.error(err); 
    }
}

const getLikes = async (filter) => {

    try {
        const likes = await pool.query("SELECT likes FROM posts WHERE id = $1", filter); 
        return likes.rows[0];
    } catch (err) {
        console.error(err); 
    }
}

const getNumberIDs = async (filter) => {

    try {
        const id = await pool.query("SELECT id FROM posts WHERE id = $1", filter); 
        return id.rowCount; 
    } catch (err) {
        console.error(err); 
    }
}

const updateLikes = async (id, likes) => {

    try {
        
        await pool.query("UPDATE posts SET likes = $1 WHERE id = $2", [likes,id]); 
    } catch (err) {
        console.error(err); 
    }
}

const closePool = () => {
    pool.end(); 
}

module.exports = {postQuery, getLikes, updateLikes, getNumberIDs, closePool}; 