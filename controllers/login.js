const mongoose = require('mongoose')
const { Schema } = mongoose

const loginSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

class LoginDAO{
    loginDAO = mongoose.model('usuarios', loginSchema)
    
    async getLogin(){
        try {
            await this.disconnect()
            await this.connect()
            const allMessages = await this.loginDAO.find()
            return allMessages
        } catch (error) {
            console.log(error)
        }
    }
    async insertLogin(object){
        try {
            await this.disconnect()
            await this.connect()
            await this.loginDAO.create(object)
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = LoginDAO