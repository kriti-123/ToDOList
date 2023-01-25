const mongoose = require('mongoose');
//database connectivity
mongoose.connect('mongodb://127.0.0.1/TO_DO_LIST');
const db = mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to the database'));
db.once('open',function()
{
    console.log('successfully connected');
});
module.exports=db;