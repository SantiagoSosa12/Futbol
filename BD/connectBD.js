const mariadb = require('mariadb');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const config = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 5,
  acquireTimeout: 300
}

class DBConnector {
  dbconnector = mariadb.createPool(config);

  /**
   * Metodo asincronico que ejecuta una query 
   * @param {*} sQuery query a ejecutar en la BD
   * @returns resltado de la ejecucion de la query
   */
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
  /**
  * 
  * @param {*} response 
  */
  getPlayerList(response) {
    this.ejectQuery("SELECT * FROM Jugador", response);

  }

  /* Crud of Team */

  addTeam(data, response) {
    this.ejectQuery(`INSERT INTO Equipo (nombreEquipo)
    VALUES ( '${data.nombreEquipo}' );`, response);
  }
  modifyTeam(idTeam, data, response) {
    this.ejectQuery(`UPDATE Equipo SET nombreEquipo= '${data.nombreEquipo}'
    WHERE id = ${idTeam};`, response);
  }

  deleteTeam(idTeam, response) {
    this.ejectQuery(`DELETE FROM Equipo WHERE id = ${idTeam};`, response);
  }
  getTeamList(response) {
    this.ejectQuery("SELECT * FROM Equipo", response);
  }

  /**
   * Valida que el usario y cotrasena esten registrados en la BD
   * @param {*} nombreUsuario 
   * @param {*} password 
   * @param {*} res 
   */
  validatePassword(nombreUsuario, password, res) {
    this.query(`SELECT nombreUsuario, password FROM Usuario 
    WHERE nombreUsuario = '${nombreUsuario}' AND password = MD5('${password}');`).then(response => {
      if (JSON.stringify(response) != "[]") {
        var user = { usernme: nombreUsuario };
        var accesToken = this.generateAccesToken(user);
        res.send("Login Correcto, tu token es: " + accesToken + " expira en 15 minutos");
      } else {
        res.send('Usuario o contrasena incorrectos');
      }
    });
  }

  /**
   * Genera un token unico con el nombre del usuario, 
   * la variable de entorno SECRET y un tiempo dterminado
   * @param {*} nombreUsuario propietario del token
   * @returns token unico
   */
  generateAccesToken(nombreUsuario) {
    return jwt.sign(nombreUsuario, process.env.SECRET, { expiresIn: '15m' });
  }

  /**
   * Valida el token enviado por el usuario
   * @param {*} req de donde se obtiene el token
   * @param {*} res rspuesta en caso de que el token sea negado o incorrecto
   * @param {*} next siguiente accion a ejecutar si el token en el correcto
   */
  validateToken(req, res, next) {
    var accesToken = req.headers['authorization'];
    if (!accesToken) {
      res.send('Acceso denegado');
    }
    jwt.verify(accesToken, process.env.SECRET, (err, user) => {
      if (err) {
        res.send('El token ha expirado o es incorrecto');
      } else {
        next();
      }
    });
  }


  /**
   * Ejecuta la promesa con la query y da una respuesta
   * 
   * @param {*} query a ejecutar
   * @param {*} res para enviar un mensaje con la respuesta de la query
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