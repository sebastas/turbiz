import { connection } from '../mysql_connection';

class UserService {

  getUsers(success) {
    connection.query('select * from Ansatte', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getUser(username, success) {
    connection.query('select * from Ansatte where brukernavn=?', [username], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateUser(id, password, success) {
    connection.query('update Ansatte set passord=? where ansatt_id=?', [password, id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  addUser(name, email, number, username, password, success) {
    let sql = "insert into Ansatte (navn, epost, tlf, brukernavn, passord) values (?, ?, ?, ?, ?)";
    connection.query(sql, [name, email, number, username, password], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}
export let userService = new UserService();