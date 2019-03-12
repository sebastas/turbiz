import { connection } from '../mysql_connection';

class AdminService {

  getEmployees(success){
    connection.query("select * from Ansatte", (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getEmployee(id, success){
    connection.query("select * from Ansatte where ansatt_id=?", [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateEmployee(id, name, email, number, username, success) {
    connection.query('update Ansatte set navn=?, epost=?, tlf=?, brukernavn=? where ansatt_id=?',
    [name, email, number, username, id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  deleteEmployee(id, success) {
    connection.query('delete from Ansatte where ansatt_id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  resetPassord(id, success) {
    connection.query('update Ansatte set passord="default" where ansatt_id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    })
  }

  addLocation(location, success) {
    connection.query('insert into Sted (sted_navn) values (?)', [location], (error, results) =>{
      if (error) return console.error(error);

      success();
    });
  }

}

export let adminService = new AdminService();
