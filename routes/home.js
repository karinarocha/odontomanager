const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Usuario');
const cadUsuario = mongoose.model('usuario');
const {eAdmin} = require('../helpers/eAdmin')

router.get('/', eAdmin, (req, res) => {
    cadUsuario.findOne({_id: req.user._id}).lean().then((usuario) =>{
        res.render('home/index', {usuario: usuario})
    }).catch((err) =>{
        req.flash("error_msg", "Erro");
    })
});

//Exportar o módulo e rotas
module.exports = router;