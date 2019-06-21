const mongoose = require('mongoose');
const { Schema } = mongoose; 

const testSchema = new Schema({
    name: String
})

mongoose.model('test', testSchema);



