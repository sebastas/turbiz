import { connection } from '../mysql_connection';

class UtstyrService {

  //Gets all the bicycles from the database
  getBicycles(success) {
    let sql = "select * from Sykkel inner join Sted on Sykkel.sted = Sted.sted_id order by sykkel_id asc"
    connection.query(sql, (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }


  //Gets all the equipment from the database
  getEquipment(success) {
    let sql = "select * from Utstyr inner join Sted on Utstyr.sted = Sted.sted_id order by utstyr_id asc"
    connection.query(sql, (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }


  //Gets a selected bicycle using the bicycles id
  getBicycle(id, success) {
    connection.query("select * from Sykkel inner join Sted on Sykkel.sted = Sted.sted_id where sykkel_id=?", [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }


  //Updates the information about a selected bicycle
  updateBicycle(id, name, type, ppt, ppd, description, status, location, success) {
    connection.query('update Sykkel set navn=?, type=?, ppt=?, ppd=?, beskrivelse=?, status=?, sted=? where sykkel_id=?',
    [name, type, ppt, ppd, description, status, location, id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }


  //Gets the selected equipment using the equipments id
  getEquip(id, success) {
    connection.query("select * from Utstyr where utstyr_id=?", [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }


  //Updates the information about the selected equipment
  updateEquipment(id, name, type, price, description, status, location, success) {
    connection.query('update Utstyr set navn=?, type=?, pris=?, beskrivelse=?, status=?, sted=? where utstyr_id=?',
    [name, type, price, description, status, location, id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }


  //Deletes the selected bicycle
  deleteBicycle(id, success) {
    connection.query('delete from Sykkel where sykkel_id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }


  //Deletes the selected equipment
  deleteEquipment(id, success) {
    connection.query('delete from Utstyr where utstyr_id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }


  //Gets all the locations from the database
  getPlace(id, success){
    connection.query('select * from Sted order by sted_id = ? desc', [id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}
export let utstyrService = new UtstyrService();
