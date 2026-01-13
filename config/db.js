const mongoose = require('mongoose')
require('dotenv').config()

const databaseConnection = ()=>{

const url = process.env.DATABASE_URL
mongoose.connect(url)
const DB = mongoose.connection

DB.once('open', ()=>{
    console.log('Connected to dataBase')
})
DB.on('error' , ()=>{
        console.log('error on database')

})

}

module.exports = databaseConnection
