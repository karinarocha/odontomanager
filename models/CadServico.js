const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CadServico = new Schema({
    nomeServico: {
        type: String,
        required: true
    },
    valor: {
        type: mongoose.Decimal128,
        required: true
    },
    descricao:{
        type: String
    }
})

mongoose.model('cadServico', CadServico);