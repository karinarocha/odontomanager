const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CadConsulta = new Schema({
    cadPaciente: {
        type: Schema.Types.ObjectId,
        ref: "cadPaciente",
        required: true
    },
    cadServico: {
        type: String,
        ref: "cadServico",
        required: true
    },
    turno:{
        type: String,
        required: true
    },
    profissional: {
        type: String,
        required: true
    },
    observacao:{
        type: String
    }, 
    dataDaConsulta:{
        type: Date,
        required: true
    },
    hora:{
        type: String,
        required: true
    }
})

mongoose.model('cadConsulta', CadConsulta);