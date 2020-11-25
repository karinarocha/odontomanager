//carregando os modulos
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs')
require('../models/Usuario');
const cadUsuario = mongoose.model('usuario');
const {eAdmin} = require('../helpers/eAdmin')

router.get('/usuarios', eAdmin, (req, res) => {
    cadUsuario.find().lean().then((usuario) => {
        res.render('usuario/usuarios', { usuarios: usuario })
    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.render('usuario/usuarios')
    })
});

router.get('/cadastrarUsuario', eAdmin, (req, res) => {
    res.render('usuario/cadastrarUsuario');
});

router.post('/add-cadUsuario', eAdmin, (req, res) => {
    var errors = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ error: "Necessário preencher o campo nome!" })
    }

    if (errors.length > 0) {
        res.render("usuario/cadastrarUsuarios", { errors: errors })
    } else {
        cadUsuario.findOne({ login: req.body.login }).then((usuario) => {
            if (usuario) {
                req.flash("error_msg", "Erro: Este login já está cadastrado");
                res.redirect('/usuarios');
            } else {
                const addUsuario = new cadUsuario({
                    nome: req.body.nome,
                    login: req.body.login,
                    senha: req.body.senha,
                    tipo: req.body.tipo
                });

                //CRIPTOGRAFAR SENHA
                bcryptjs.genSalt(10, (err, salt) =>{
                    bcryptjs.hash(addUsuario.senha, salt, (err, hash) => {
                        if(err){
                            req.flash("error_msg", "Erro: Não foi possível cadastrar usuário");
                            res.redirect('/usuarios');
                        }else{
                            addUsuario.senha = hash
                            addUsuario.save().then(() => {
                                req.flash("success_msg", "Usuário cadastrado com sucesso!")
                                res.redirect('/usuarios')
                            }).catch((err) => {
                                    req.flash("error_msg", "Error: Não foi possível cadastrar usuário")
                                    res.render("/usuarios")
                            });
                        }
                    });
                });
            }
        }).catch((err) => {
            req.flash("error_msg", "Erro: Não foi possível cadastrar usuário");
            res.redirect('/usuarios');
        });
    }
});

router.get('/edit-CadastrarUsuarios/:id', eAdmin, (req, res) =>{
    cadUsuario.findOne({ _id: req.params.id }).lean().then((usuario) => {
        res.render('usuario/edit-cadastrarUsuarios', { usuario: usuario })
    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.redirect('/usuarios')
    });
});

router.post('/update-cadUsuario', eAdmin, (req, res) =>{
    cadUsuario.findOne({_id: req.body.id}).then((usuario) =>{
        usuario.nome = req.body.nome,
        usuario.login = req.body.login,
        usuario.tipo = req.body.tipo

        usuario.save().then(() =>{
            req.flash("success_msg", "Usuário editado com sucesso!");
            res.redirect('/usuarios')
        }).catch((err) =>{
            req.flash("error_msg", "Erro: Não foi possível editar usuário");
            res.redirect('/usuarios')
    });
    }).catch((err) =>{
        req.flash("error_msg", "Erro: Não foi possível editar usuário");
        res.redirect('/usuarios')
    });
});

router.get('/delet-cadastrarUsuarios/:id', eAdmin, (req, res) =>{
    cadUsuario.deleteOne({ _id: req.params.id }).then(() => {
        req.flash("success_msg", "Dados do usuário deletados com sucesso!");
        res.redirect('/usuarios')
    }).catch((err) => {
        req.flash("error_msg", "Erro");
        res.redirect('/usuarios');
    });
});

//Exportar o módulo e rotas
module.exports = router;