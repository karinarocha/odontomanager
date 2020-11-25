//carregando os modulos
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/CadServico');
const cadServico = mongoose.model('cadServico');
const {eAdmin} = require('../helpers/eAdmin')

router.get('/servicos', eAdmin, (req, res) => {
    cadServico.find().lean().then((cadServico) => {
        res.render('servicos/servicos', { cadServico: cadServico })
    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.render('servicos/servicos')
    });

})

router.get('/cadastrarServicos', eAdmin, (req, res) => {
    res.render('servicos/cadastrarServicos')
})

router.post('/add-cadServico', eAdmin, (req, res) => {
    var errors = []
    if (!req.body.nomeServico || typeof req.body.nomeServico == undefined || req.body.nomeServico == null) {
        errors.push({ error: "Necessário preencher o campo nome!" })
    }

    if (errors.length > 0) {

    } else {
        const addCadServico = {
            nomeServico: req.body.nomeServico,
            valor: req.body.valor,
            descricao: req.body.descricao
        }
        new cadServico(addCadServico).save().then(() => {
            req.flash("success_msg", "Serviço cadastrado com sucesso!");
            res.redirect('/servicos');
        }).catch((err) => {
            req.flash("error_msg", "Erro");
        })
    }
})

router.get('/edit-cadastrarServicos/:id', eAdmin, (req, res) => {
    cadServico.findOne({ _id: req.params.id }).lean().then((cadServico) => {
        res.render('servicos/edit-cadastrarServicos', { cadServico: cadServico })
    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.redirect('/servicos')
    });
});

router.post('/update-cadServico', eAdmin, (req, res) => {

    cadServico.findOne({ _id: req.body.id }).then((cadServico) => {

        cadServico.nomeServico = req.body.nomeServico,
        cadServico.valor = req.body.valor,
        cadServico.descricao = req.body.descricao

        cadServico.save().then(() => {
            req.flash("success_msg", "Dados do serviço atualizados com sucesso!");
            res.redirect('/servicos')
        }).catch((err) => {
            req.flash("error_msg", "Erro");
            res.redirect('/servicos');
        });

    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.redirect('/servicos');
    });
});

router.get('/delet-cadastrarServicos/:id', eAdmin, (req, res) => {
    cadServico.deleteOne({ _id: req.params.id }).then(() => {
        req.flash("success_msg", "Dados do serviço deletados com sucesso!");
        res.redirect('/servicos')
    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.redirect('/servicos');
    });
});

//Exportar o módulo e rotas
module.exports = router;