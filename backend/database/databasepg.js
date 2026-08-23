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

const getQuery = async (query) => {

    try {
        await client.query("SELECT * from $1", query); 
    } catch (err) {
        console.error(err); 
    }
}

module.exports = {postQuery}; 