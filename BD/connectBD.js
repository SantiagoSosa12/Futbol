const mariadb = require('mariadb');

const config ={
  host: 'localhost',
  user: 'santiago',
  password: 'a123',
  database: 'futbol',
  connectionLimit: 5,
  acquireTimeout: 300
}

class DBConnector{
  dbconnector = mariadb.createPool(config);

  async query(sQuery){
    var conn = await this.dbconnector.getConnection();
    var ret = null;
    await conn.query(sQuery)
      .then(data =>{
        ret = data;
        conn.end()
      })
      .catch(err =>{
        console.log(err)
        conn.end()
      })
    return ret;
  }
}

module.exports = new DBConnector();