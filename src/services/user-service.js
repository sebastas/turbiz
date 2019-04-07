import { connection } from '../mysql_connection';

class UserService {

  /**
   * Gets all users
   * @param success Callback returns all rows
   */
  getUsers(success) {
    connection.query('select * from Ansatte', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  /**
   * Gets specific user from username
   * @param {string} username Username
   * @param success Callback returns one row
   */
  getUser(username, success) {
    connection.query('select * from Ansatte where brukernavn=?', [username], (error, results) => {
      if (error) return console.error(error);

      success(results[0]);
    });
  }

  /**
   * Updates user's password
   * @param {number} id User's id
   * @param {string} password Chosen password
   * @param success Callback returns nothing
   */
  updateUser(id, password, success) {
    connection.query('update Ansatte set passord=? where ansatt_id=?', [password, id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }

  /**
   * Adds a new user to db
   * @param {string} name User's name
   * @param {string} email User's email
   * @param {string} number User's phone number
   * @param {string} username Appropriate username
   * @param {string} password Chosen password
   * @param success Callback returns nothing
   */
  addUser(name, email, number, username, password, success) {
    let sql = "insert into Ansatte (navn, epost, tlf, brukernavn, passord) values (?, ?, ?, ?, ?)";
    connection.query(sql, [name, email, number, username, password], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}
export let userService = new UserService();