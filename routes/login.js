//carregando os modulos
const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/login', (req, res) =>{
    res.render('login/login', {layout: 'login.handlebars'})
});

router.post('/login', (req, res, next) =>{
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
});

router.get('/logout', (req, res) =>{
    req.logout();
    req.flash('success_msg', 'Deslogado com sucesso!')
    res.redirect('/login')
})


//Exportar o módulo e rotas
module.exports = router;