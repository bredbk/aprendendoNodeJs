const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api', (req, res) => {
    res.json({
        message: "Opa, bem vindo a este servidor API"
    });
});

app.post('/api/post', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403); //Forbidden
        } else {
            res.json({
                message: "Post criado...",
                authData
            });
        }
    });
});

app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'bredbk',
        email: 'bredbk@gmail.com',
    };

    jwt.sign({ user: user }, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403) //foribidden
    }
}

app.listen(2000, (res, req) => {
    console.log('Servidor rodando na porta 2000')
})