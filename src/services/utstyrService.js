import { connection } from '../mysql_connection';

class UtstyrService {

  getBicycles(success) {
    let sql = "select * from Sykkel inner join Sted on Sykkel.sted = Sted.sted_id order by sykkel_id asc"
    connection.query(sql, (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getEquipment(success) {
    let sql = "select * from Utstyr inner join Sted on Utstyr.sted = Sted.sted_id order by utstyr_id asc"
    connection.query(sql, (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBicycle(id, success) {
    connection.query("select * from Sykkel inner join Sted on Sykkel.sted = Sted.sted_id where sykkel_id=?", [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateBicycle(id, name, type, ppt, ppd, description, status, location, success) {
    connection.query('update Sykkel set navn=?, type=?, ppt=?, ppd=?, beskrivelse=?, status=?, sted=? where sykkel_id=?',
    [name, type, ppt, ppd, description, status, location, id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  getEquip(id, success) {
    connection.query("select * from Utstyr where utstyr_id=?", [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateEquipment(id, name, type, price, description, status, location, success) {
    connection.query('update Utstyr set navn=?, type=?, pris=?, beskrivelse=?, status=?, sted=? where utstyr_id=?',
    [name, type, price, description, status, location, id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  deleteBicycle(id, success) {
    connection.query('delete from Sykkel where sykkel_id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  deleteEquipment(id, success) {
    connection.query('delete from Utstyr where utstyr_id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  getPlace(id, success){
    connection.query('select * from Sted order by sted_id = ? desc', [id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}
export let utstyrService = new UtstyrService();
