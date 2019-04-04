import { connection } from '../mysql_connection';

class RegistrerService {

  //SQL to add bicycle to the database
  addBicycle(id, name, type, ppt, ppd, description, status, location, success){
    connection.query('insert into Sykkel (navn, type, ppt, ppd, beskrivelse, status, sted) values (?, ?, ?, ?, ?, ?, ?)',
    [name, type, ppt, ppd, description, status, location, id], (error, results) => {

      if (error) return console.error(error);

      success(results[0]);
    });
  }

  //SQL to add equipment to the database
  addEq(id, name, type, price, description, status, location, success){
    connection.query('insert into Utstyr (navn, type, pris, beskrivelse, status, sted) values (?, ?, ?, ?, ?, ?)',
    [name, type, price, description, status, location, id], (error, results) => {

      if (error) return console.error(error);

      success(results[0]);
    });
  }

  //SQL to select all the locations from the database
  getPlace(id, success){
    connection.query('select * from Sted order by sted_id = ? desc', [id], (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let registrerService = new RegistrerService();
