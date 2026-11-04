const express = require('express');
const app = express();
const db = require('./db/connection');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`Express rodando na porta ${PORT}`);
});

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
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
    res.sendFile(path.join(__dirname, 'index.html'));
});

//jobs routes
app.use('/jobs', require('./routes/jobs'));
