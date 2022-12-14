const express = require('express')
const app = express()
const port = 3000
const DBConnector = require('./BD/connectBD.js');

//routes----------

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

/**
 * Desde aqui se puede obtener el token para un usuario registrado en la DB
 */
app.post('/login', (req, res) => {
    DBConnector.validatePassword(req.body.nombreUsuario, req.body.password, res);
})

app.post('/createTeam',DBConnector.validateToken, (req, res) => {
    console.log(req.body.nombreEquipo);
    DBConnector.addTeam(req.body , res);
})
app.put('/modifyTeam/:id',DBConnector.validateToken, (req, res) => {
    DBConnector.modifyTeam(req.params.id, req.body, res);
});
app.get('/teamList',DBConnector.validateToken, (req, res) => {
    DBConnector.getTeamList(res);
})

app.delete('/deleteTeam/:id', DBConnector.validateToken,(req, res) => {
    DBConnector.deleteTeam(req.params.id , res);
    console.log("----------------");
   console.log("Equipo eliminado");
})