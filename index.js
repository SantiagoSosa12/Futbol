const express = require('express')
const app = express()
const port = 3000
const DBConnector = require('./BD/connectBD.js');

app.get('/jugadores', (req, res) => {
    DBConnector.query("SELECT * FROM Jugador").then(function (response) {
        res.send(response)
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

