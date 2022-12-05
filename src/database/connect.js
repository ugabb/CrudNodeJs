const mongoose = require("mongoose");

const connectToDatabse = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@nodejs.ymd2gl8.mongodb.net/database?retryWrites=true&w=majority`,
     (error) => {
        if(error){
            console.log('Ocorreu um erro ao se conectar com o banco de DADOS',error);
        } 
        return console.log("Conectou com sucesso!!!");
    });
}

module.exports = connectToDatabse;