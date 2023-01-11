require('dotenv').config()

const mongoose = require('mongoose')
const ProductsDAO = require('../controllers/products')



class MongoConnnection extends ProductsDAO{
    
    async connect(){
        await mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@ecommercecoderhousesant.6p5agbc.mongodb.net/sessions`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    })
    }
}
module.exports = MongoConnnection