const express = require('express');
const cors = require('cors'); 
const app = express(); 
const PORT = process.env.PORT || 3500; 

app.use(cors()); 
app.use(express.json())

app.use(/\/likes/, require('./routes/Likes'));
app.use(/\/register/, require('./routes/Register'));

app.listen(PORT, '0.0.0.0', () => {console.log(`Running on ${PORT}`)})