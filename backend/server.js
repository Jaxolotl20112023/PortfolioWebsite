const express = require('express');
const path = require("path"); 
const cors = require('cors'); 
const app = express(); 
const PORT = process.env.PORT || 3500; 
const {closePool} = require("../backend/database/databasepg"); 

app.use(cors()); 
app.use(express.json())

app.use(/\/likes/, require('./routes/Likes'));
app.use(/\/register/, require('./routes/Register'));

app.listen(PORT, '0.0.0.0', () => {console.log(`Running on ${PORT}`)})

app.on("close", () => {
    console.log("closing client db"); 
    closePool();
})