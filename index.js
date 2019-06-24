const express = require('express');
const mongoose = require('mongoose');
const app = express();
const keys = require('./config/keys');
require('./models/Recipe');
require('./services/mongodb');

mongoose.connect(keys.mongoURI);

require('./routes/routes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 3001;
app.listen(PORT);