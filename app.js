const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 3000;

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');


//static folder
app.use(express.static(path.join(__dirname, 'public')));

//db connection
db
.authenticate()
.then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!');
})
.catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
});

// routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/add.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'add.html'));
});

//jobs routes
app.use('/jobs', require('./routes/jobs'));

app.listen(PORT, function() {
    console.log(`Express rodando na porta ${PORT}`);
});
