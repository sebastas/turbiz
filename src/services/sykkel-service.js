import { connection } from '../mysql_connection';

class sykkelService{

  getSykkel(success) {
    connection.query('select * from Sykkel', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }





  addSykkel( type, pris, beskrivelse, success) {
    let sql = "insert into Sykkel (type, pris, beskrivelse) values (?, ?, ?)";
    connection.query(sql, [type, pris, beskrivelse], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}
export let sykkelService = new SykkelService();
