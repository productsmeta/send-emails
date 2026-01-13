
require('dotenv').config()


const globalError = (error , req, res , next)=>{
   res.status(error.statusCode || 500 )
    .json({ 
        status :error.status || 'error' 
        , message : error.message || 'Internal Server Error' , 
 stack : error.stack
         })
    
}



module.exports = globalError