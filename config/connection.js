const mongoose = require('mongoose');



const MONGOOSECONNECTIONURI = 'mongodb://localhost:27017';
const databasename= 'petous';

const options = {

    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName: databasename

};

mongoose.connect(MONGOOSECONNECTIONURI, options).then(()=> console.log("Connected to db"))
.catch((error)=> console.log('Error connecting to MongoDB ${error}'));
