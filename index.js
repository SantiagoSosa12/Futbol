const express = require('express')
const app = express()
const port = 3000
const DBConnector = require('./BD/connectBD.js');

app.use(express.json());

app.get('/jugadores', DBConnector.validateToken ,(req, res) => {
    DBConnector.getPlayerList(res);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.post('/jugador', DBConnector.validateToken ,(req, res) => {
    DBConnector.addPlayer(req.body , res);
})

app.put('/jugador/:id', DBConnector.validateToken ,(req, res) => {
    DBConnector.modifyPlayer(req.params.id, req.body, res);
});

app.delete('/jugador/:id', DBConnector.validateToken ,(req, res) => {
    DBConnector.deletePlayer(req.params.id , res);
})

app.post('/login', (req, res) => {
    DBConnector.validatePassword(req.body.nombreUsuario, req.body.password, res);
})