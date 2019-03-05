import { connection } from '../mysql_connection';

class RegistrerService {

  addBicycle(id, name, type, ppt, ppd, description, status, location, currentLocation, success){
    connection.query('insert into Sykkel (navn, type, ppt, ppd, beskrivelse, status, tilhorighet, sted) values (?, ?, ?, ?, ?, ?, ?, ?)',
    [name, type, ppt, ppd, description, status, location, currentLocation, id], (error, results) => {

      if (error) return console.error(error);

      success(results[0]);
    });
  }

  addEq(id, name, type, price, description, status, location, currentLocation, success){
    connection.query('insert into Utstyr (navn, type, pris, beskrivelse, status, tilhorighet, sted) values (?, ?, ?, ?, ?, ?, ?)',
    [name, type, price, description, status, location, currentLocation, id], (error, results) => {

      if (error) return console.error(error);

      success(results[0]);
    });
  }
}

export let registrerService = new RegistrerService();
