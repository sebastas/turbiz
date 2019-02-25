import { connection } from '../mysql_connection';

class UserService {

  getUsers(success) {
    connection.query('select * from Ansatte', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getUser(id, success) {
    connection.query('select * from Ansatte where id=?', [id], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  updateUser(id, name, email, success) {
    connection.query('update Students set name=?, email=? where id=?', [name, email, id], (error, results) => {
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