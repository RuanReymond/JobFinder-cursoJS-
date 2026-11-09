const express = require('express');
const router = express.Router();
const Job = require('../models/job');

router.get('/test', (req,res)=> {
    res.send('funcionando');
});

//detalhe da vaga
router.get('/view/:id', (req, res) => {
    Job.findOne({
        where: { id: req.params.id }
    }).then(job => {
        if (!job) {
            return res.status(404).send('Vaga não encontrada.');
        }

        res.render('views', { job });
    }).catch(err => {
        console.error('Erro ao carregar os detalhes da vaga:', err);
        res.status(500).send('Não foi possível carregar os detalhes da vaga.');
    });
});

//form da rota de envio
router.get('/add', (req, res) => {
    res.render('add');
});

// add job via post
router.post('/add', (req, res) => {
    let{ title, description, salary, company, email, new_job } = req.body;

//insert
Job.create({
    title,
    description,
    salary,
    company,
    email,
    new_job
})
    .then(job => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router;
