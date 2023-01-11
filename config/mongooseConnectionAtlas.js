require('dotenv').config()

const mongoose = require('mongoose')
const LoginDAO = require('../controllers/login')

class MongoConnnectionAtlas extends LoginDAO{
    
    async connect(){
        await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@ecommercecoderhousesant.6p5agbc.mongodb.net/sessions`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    })
    }
    async disconnect(){
        await mongoose.disconnect()
    }
}
module.exports = MongoConnnectionAtlas