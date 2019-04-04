import { connection } from '../mysql_connection';

class AdminService {

  //SQL to select every employee
  getEmployees(success){
    connection.query("select * from Ansatte where ansatt_id > 1", (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  //SQL to select every location in the database
  getLocations(success) {
    connection.query("select * from Sted", (error, results) => {
      if (error) return console.error(error);

      success(results)
    })
  }

  //SQL to select a specific employee
  getEmployee(id, success){
    connection.query("select * from Ansatte where ansatt_id=?", [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  //SQL to update employees information if changed
  updateEmployee(id, name, email, number, username, success) {
    connection.query('update Ansatte set navn=?, epost=?, tlf=?, brukernavn=? where ansatt_id=?',
    [name, email, number, username, id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }


  //SQL to delete selected employee from the database
  deleteEmployee(id, success) {
    connection.query('delete from Ansatte where ansatt_id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }


  //SQL to reset the selected employees password in case its forgotten
  resetPassord(id, success) {
    connection.query('update Ansatte set passord="default" where ansatt_id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success();
    })
  }


  //SQL to add a new location if necessary
  addLocation(location, adress, success) {
    connection.query('insert into Sted (sted_navn, adresse) values (?, ?)', [location, adress], (error, results) =>{
      if (error) return console.error(error);

      success();
    });
  }

}

export let adminService = new AdminService();
