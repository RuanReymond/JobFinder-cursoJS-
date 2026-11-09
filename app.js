const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require('./models/job');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const PORT = 3000;

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', 'hbs');


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
    const search = req.query.job;
    const query = `%${search}%`;
    const options = {
        order: [['createdAt', 'DESC']]
    };

    if (search) {
        options.where = {
            [Op.or]: [
                { title: { [Op.like]: query } },
                { company: { [Op.like]: query } }
            ]
        };
    }

    Job.findAll(options)
        .then(jobs => res.render('index', { jobs, search }))
        .catch(err => {
            console.error('Erro ao buscar vagas:', err);
            res.status(500).send('Não foi possível carregar as vagas.');
        });
});

app.get('/add.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'add.html'));
});

//jobs routes
app.use('/jobs', require('./routes/jobs'));

app.listen(PORT, function() {
    console.log(`Express rodando na porta ${PORT}`);
});
