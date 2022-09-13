const mariadb = require('mariadb');

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

  modifyPlayer(idPlayer , data, response) {
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

  /**
   * Ejecuta la promesa con la query y da una respuesta
   * @param {*} query 
   * @param {*} res 
   */
  ejectQuery(query, res) {
    this.query(query).then(function (response) {
      res.json(response);//ERROR
    }).catch(function (error) {
      console.log(error);
      res.json(error);//ERROR
    });
  }

}

module.exports = new DBConnector();