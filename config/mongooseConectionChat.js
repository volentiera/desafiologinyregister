require('dotenv').config()
const mongoose = require('mongoose')
const ChatDAO = require('../controllers/messages')



class MongoConnnection extends ChatDAO{
    
    async connect(){
        await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@ecommercecoderhousesant.6p5agbc.mongodb.net/sessions`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    })
    }
}
module.exports = MongoConnnection