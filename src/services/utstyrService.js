import { connection } from '../mysql_connection';

class UtstyrService {

  getBicycles(success) {
    let sql = "select * from Sykkel"
    connection.query(sql, (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getEquipment(success) {
    let sql = "select * from Utstyr"
    connection.query(sql, (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getBicycle(id, success) {
    connection.query("select * from Sykkel where sykkel_id=?", [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateBicycle(id, name, type, ppt, ppd, description, status, location, currentLocation, success) {
    connection.query('update Sykkel set navn=?, type=?, ppt=?, ppd=?, beskrivelse=?, status=?, tilhorighet=?, sted=? where sykkel_id=?',
    [name, type, ppt, ppd, description, status, location, currentLocation, id], (error, results) => {
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

  updateEquipment(id, name, type, price, description, status, location, currentLocation, success) {
    connection.query('update Utstyr set navn=?, type=?, pris=?, beskrivelse=?, status=?, tilhorighet=?, sted=? where utstyr_id=?',
    [name, type, price, description, status, location, currentLocation, id], (error, results) => {
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
}
export let utstyrService = new UtstyrService();
