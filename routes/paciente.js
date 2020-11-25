//carregando os modulos
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/CadPaciente');
const cadPaciente = mongoose.model('cadPaciente');
const {eAdmin} = require('../helpers/eAdmin')

router.get('/pacientes', eAdmin, (req, res) => {
    cadPaciente.find().lean().then((cadPaciente) => {
        res.render('paciente/pacientes', { cadPaciente: cadPaciente })
    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.render('paciente/pacientes')
    });

});

router.get('/cadastrarPacientes', eAdmin, (req, res) => {
    res.render('paciente/cadastrarPacientes')
})

router.post('/add-cadPaciente', eAdmin, (req, res) => {
    var errors = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ error: "Necessário preencher o campo nome!" })
    }

    if (errors.length > 0) {

    } else {
        const addCadPaciente = {
            nome: req.body.nome,
            sexo: req.body.sexo,
            cpf: req.body.cpf,
            rg: req.body.rg,
            idade: req.body.idade,
            dataDeNascimento: req.body.dataDeNascimento,
            email: req.body.email,
            telefone: req.body.telefone,
            cep: req.body.cep,
            logradouro: req.body.logradouro,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            uf: req.body.uf
        }
        new cadPaciente(addCadPaciente).save().then(() => {
            req.flash("success_msg", "Paciente cadastrado com sucesso!");
            res.redirect('/pacientes');
        }).catch((err) => {
            req.flash("error_msg", "Erro");
            res.redirect('/pacientes');
        });
    }
});

router.get('/edit-cadastrarPacientes/:id', eAdmin, (req, res) => {
    cadPaciente.findOne({ _id: req.params.id }).lean().then((cadPaciente) => {
        res.render('paciente/edit-cadastrarPacientes', { cadPaciente: cadPaciente })
    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.redirect('/pacientes')
    })
})

router.post('/update-cadPaciente', eAdmin, (req, res) => {

    cadPaciente.findOne({ _id: req.body.id }).then((cadPaciente) => {
        cadPaciente.nome = req.body.nome,
            cadPaciente.sexo = req.body.sexo,
            cadPaciente.cpf = req.body.cpf,
            cadPaciente.rg = req.body.rg,
            cadPaciente.idade = req.body.idade,
            cadPaciente.dataDeNascimento = req.body.dataDeNascimento,
            cadPaciente.email = req.body.email,
            cadPaciente.telefone = req.body.telefone,
            cadPaciente.cep = req.body.cep,
            cadPaciente.logradouro = req.body.logradouro,
            cadPaciente.bairro = req.body.bairro,
            cadPaciente.cidade = req.body.cidade,
            cadPaciente.uf = req.body.uf

        cadPaciente.save().then(() => {
            req.flash("success_msg", "Dados do paciente atualizados com sucesso!");
            res.redirect('/pacientes')
        }).catch((err) => {
            req.flash("error_msg", "Erro");
            res.redirect('/pacientes');
        });

    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.redirect('/pacientes');
    });
});

router.get('/delet-cadastrarPacientes/:id', eAdmin, (req, res) => {
    cadPaciente.deleteOne({ _id: req.params.id }).then(() => {
        req.flash("success_msg", "Dados do paciente deletados com sucesso!");
        res.redirect('/pacientes')
    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.redirect('/pacientes');
    });
});

//Exportar o módulo e rotas
module.exports = router;