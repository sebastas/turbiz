import { connection } from '../mysql_connection';

class UtstyrService {

  getUtstyr(success) {
    connection.query('select * from Utstyr', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }





  addUtstyr(name, type, pris, beskrivelse, success) {
    let sql = "insert into Utstyr (navn, type, pris, beskrivelse) values (?, ?, ?, ?)";
    connection.query(sql, [navn, type, pris, beskrivelse], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}
export let utstyrService = new UtstyrService();
