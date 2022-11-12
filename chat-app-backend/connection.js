const mongoose = require('mongoose')
require('dotenv').config()


// mongodb+srv://<DB user name>:<DB password>@cluster0.tbqht.mongodb.net/<DB NAME CAN BE ANYTHING>?retryWrites=true&w=majority

// make sure to update mongodb account database ...security/database/users -> built-in role to AtlasAdmin

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.tbqht.mongodb.net/chatApp?retryWrites=true&w=majority`, ()=>{{
    console.log("Connected to MongoDB")
}})