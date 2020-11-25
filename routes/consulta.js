//carregando os modulos
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/CadPaciente');
const cadPaciente = mongoose.model('cadPaciente');
require('../models/CadConsulta');
const cadConsulta = mongoose.model('cadConsulta');
require('../models/CadServico');
const cadServico = mongoose.model('cadServico');
const { eAdmin } = require('../helpers/eAdmin');

router.get('/consultas', eAdmin, (req, res) => {
    cadConsulta.find().lean().populate('cadPaciente').then((cadConsulta) => {
        res.render('consulta/consultas', { cadConsulta: cadConsulta })
    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.render('consulta/consultas')
    });
});

router.get('/cadastrarConsultas', eAdmin, (req, res) => {
    cadPaciente.find().lean().then((cadPaciente) => {
            res.render('consulta/cadastrarConsultas', { cadPacientes: cadPaciente })
    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.render('consulta/cadastrarConsultas')
    });
});

router.post('/add-cadConsulta', eAdmin, (req, res) => {
    const addCadConsulta = {
        cadPaciente: req.body.cadPaciente,
        cadServico: req.body.cadServico,
        turno: req.body.turno,
        profissional: req.body.profissional,
        observacao: req.body.observacao,
        dataDaConsulta: req.body.dataDaConsulta,
        hora: req.body.hora
    }
    new cadConsulta(addCadConsulta).save().then(() => {
        req.flash("success_msg", "Consulta cadastrada com sucesso!");
        res.redirect('/consultas');
    }).catch((err) => {
        req.flash("error_msg", "Erro: Não foi possível cadastrar consulta");
        res.redirect('/consultas');
    });
});

router.get('/edit-cadastrarConsultas/:id', eAdmin, (req, res) => {
    cadConsulta.findOne({ _id: req.params.id }).lean().populate("cadPaciente").then((cadConsulta) => {
        cadPaciente.find().lean().then((cadPaciente) => {
            res.render('consulta/edit-cadastrarConsultas', { cadConsulta: cadConsulta, cadPaciente: cadPaciente })
        }).catch((err) => {
            req.flash("error_msg", "Erro");
            res.render('/consultas')
        });
    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.redirect('/consultas')
    });
});

router.post('/update-cadConsulta', eAdmin, (req, res) => {

    cadConsulta.findOne({ _id: req.body.id }).then((cadConsulta) => {
            cadConsulta.cadPaciente = req.body.cadPaciente,
            cadConsulta.cadServico = req.body.cadServico,
            cadConsulta.turno = req.body.turno,
            cadConsulta.profissional = req.body.profissional,
            cadConsulta.observacao = req.body.observacao,
            cadConsulta.dataDaConsulta = req.body.dataDaConsulta,
            cadConsulta.hora = req.body.hora

        cadConsulta.save().then(() => {
            req.flash("success_msg", "Dados da consulta atualizados com sucesso!");
            res.redirect('/consultas')
        }).catch((err) => {
            req.flash("error_msg", "Erro: Não foi possível atualizar dados da consulta");
            res.redirect('/consultas');
        });

    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.redirect('/consultas');
    });
});

router.get('/delet-cadastrarConsultas/:id', eAdmin, (req, res) => {
    cadConsulta.deleteOne({ _id: req.params.id }).then(() => {
        req.flash("success_msg", "Consulta deletada com sucesso!");
        res.redirect('/consultas')
    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.redirect('/consultas');
    });
});

//Exportar o módulo e rotas
module.exports = router;