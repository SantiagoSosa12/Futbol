const mariadb = require('mariadb');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const config = {
  host: 'localhost',
  user: 'santiago',
  password: 'a123',
  database: 'futbol',
  connectionLimit: 5,
  acquireTimeout: 300
}

class DBConnector {
  dbconnector = mariadb.createPool(config);

  async query(sQuery) {
    var conn = await this.dbconnector.getConnection();
    var ret = null;
    await conn.query(sQuery)
      .then(data => {
        ret = data;
        conn.end()
      })
      .catch(err => {
        console.log(err)
        conn.end()
      })
    return ret;
  }

  /**
   * Agrega los datos con la consulta correspondiente
   * @param {*} data Que es req.body
   */
  addPlayer(data, response) {
    this.ejectQuery(`INSERT INTO Jugador (nombreJugador, idEquipo)
    VALUES ('${data.nombreJugador}' , ${data.idEquipo});`, response);
  }

  modifyPlayer(idPlayer, data, response) {
    this.ejectQuery(`UPDATE Jugador SET nombreJugador = '${data.nombreJugador}',
    idEquipo = ${data.idEquipo}
    WHERE id = ${idPlayer};`, response);
  }

  deletePlayer(idPlayer, response) {
    this.ejectQuery(`DELETE FROM Jugador WHERE id = ${idPlayer};`, response);
  }

  validatePassword(nombreUsuario, password, res) {
    this.query(`SELECT nombreUsuario, password FROM Usuario 
    WHERE nombreUsuario = '${nombreUsuario}' AND password = MD5('${password}');`).then(response => {
      if (JSON.stringify(response) != "[]") {
        var user = {usernme: nombreUsuario};
        var accesToken = this.generateAccesToken(user);
        res.send("Login Correcto, tu token es: " + accesToken + " expira en 5 minutos");
      } else {
        res.send('Usuario o contrasena incorrectos');
      }
    });
  }

  generateAccesToken(nombreUsuario) {
    return jwt.sign(nombreUsuario , process.env.SECRET , {expiresIn: '5m'});
  }

  validateToken(req, res, next) {
    var accesToken = req.headers['authorization'];
    if( ! accesToken) {
      res.send('Acceso denegado');
    }
    jwt.verify(accesToken, process.env.SECRET, (err, user) => {
      if(err){
        res.send('El token ha expirado o es incorrecto');
      }else {
        next();
      }
    });
  }
  /**
   * 
   * @param {*} response 
   */
  getPlayerList(response) {
    this.ejectQuery("SELECT * FROM Jugador", response);

  }

  /**
   * Ejecuta la promesa con la query y da una respuesta
   * @param {*} query 
   * @param {*} res 
   */
  ejectQuery(query, res) {
    this.query(query).then(response => {
      var result = JSON.stringify(response, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
      .replace(/"(-?\d+)n"/g, (_, a) => a);
      res.send(result);
    });
  }

}

module.exports = new DBConnector();