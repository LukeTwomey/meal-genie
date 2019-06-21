const mongoose = require('mongoose');
const Test = mongoose.model('test');

async function saveTest(){
    const test = await new Test({ name: 'luke' }).save()
    console.log(test);
}

saveTest();