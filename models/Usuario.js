const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    login:{
        type: String,
        required: true  
    },
    senha: {
        type: String,
        required: true
    },
    tipo:{
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('usuario', Usuario);