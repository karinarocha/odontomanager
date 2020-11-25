const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
require('../models/Usuario');
const Usuario = mongoose.model('usuario');

module.exports = function(passport){
    passport.use(new localStrategy({usernameField: 'login', passwordField: 'senha'}, (login, senha, done) =>{
        Usuario.findOne({ login: login }).then((usuario) =>{
            if(!usuario){
                return done(null, false, {message: "Usuário não encontrado!"})
            }

            bcryptjs.compare(senha, usuario.senha, (err, correta) =>{
                if(correta){
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: "Dados de acesso incorretos!"})
                }
            })
        })
    }))
}

//Salvar os dados do usuário na sessão
passport.serializeUser((usuario, done) =>{
    done(null, usuario.id)
})

passport.deserializeUser((id, done) =>{
    Usuario.findById(id, (err, usuario) =>{
        done(err, usuario)
    })
})