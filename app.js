//carregando os modulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const home = require('./routes/home');
const login = require('./routes/login');
const paciente = require('./routes/paciente');
const consulta = require('./routes/consulta');
const servico = require('./routes/servico');
const usuario = require('./routes/usuario');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const moment = require('moment');
const passport = require('passport');
require('./config/auth')(passport)


//Configurações
//Sessão
app.use(session({
    secret: 'catshaaark',
    resave: true,
    saveUninitialized: true
}))

//Passport
app.use(passport.initialize())
app.use(passport.session())

//Flash
app.use(flash())

//Middleware
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()

})

//Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Handlesbars
app.engine('handlebars', handlebars({defaultLayout: "main"}));
app.set("view engine", 'handlebars');

//Conexão com banco de dados
mongoose.connect('mongodb://localhost/odontomanage', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log('Conexao realizada com sucesso');
}).catch((err) =>{
    console.log('Erro: Não foi possivel realizar conexão'+ err)
})

//Arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

//Rotas
app.use('/', home)
app.use('/', login)
app.use('/', paciente)
app.use('/', consulta)
app.use('/', servico)
app.use('/', usuario)

//Iniciar o servidor
const PORT = 8080;
app.listen(PORT, () =>{
    console.log('Servidor Iniciado!');
})

//Configura a função formatDate
app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials'),
    adminDir: path.join(__dirname, '/views/admin'),
    helpers: {
        formatDate: (date) => {
            return moment(date).format('YYYY-MM-DD')
        },
        formatData: (date) => {
            return moment(date).format('DD/MM/YYYY')
        },
    }
}));