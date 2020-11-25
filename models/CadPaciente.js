const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CadPaciente = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    rg:{
        type: Number,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    sexo: {
        type: String
    },
    cep:{
        type: String,
        required: true
    },
    telefone: {
        type: Number
    },
    logradouro:{
        type: String,
        required: true
    },
    bairro:{
        type: String,
        required: true
    },
    cidade: {
        type: String,
        required: true
    },
    uf:{
        type: String,
        required: true
    },
    dataDeNascimento:{
        type: Date,
        required: true
    },
    idade: {
        type: Number
    }, 
    dataDeCadastro:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model('cadPaciente', CadPaciente);