import { connection } from '../mysql_connection';

class OrderService {

    /**
     * Gets all orders from db
     * @param success Callback returns all rows
     */
    getOrders(success) {
        let sql = "select *\n" +
          "from Bestilling\n" +
          "inner join Ansatte A on Bestilling.ansatt_id = A.ansatt_id\n" +
          "inner join Kunde K on Bestilling.kunde_id = K.kunde_id\n" +
          "order by bestilling_id desc";
        connection.query(sql, (error, results) => {
            if (error) return console.error(error);

            success(results);
        });
    }

    /**
     * Gets a specific order
     * @param {number} id OrderId
     * @param success Callback returns one row
     */
    getOrder(id, success) {
        let sql = "select *\n" +
          "from Bestilling\n" +
          "inner join Ansatte A on Bestilling.ansatt_id = A.ansatt_id\n" +
          "where bestilling_id = ?";
        connection.query(sql, [id], (error, results) => {
            if (error) return console.error(error);

            success(results[0]);
        });
    }

    /**
     * Get bikes from specific order
     * @param {number} orderId Id of order
     * @param success Callback returns all rows
     */
    getBikes(orderId, success) {
        let sql = "select *\n" +
          "from Sykkel\n" +
          "inner join Bestilling_Sykkel BS on Sykkel.sykkel_id = BS.sykkel_id\n" +
          "where bestilling_id = ?";
        connection.query(sql, [orderId], (error, results) => {
            if (error) console.error(error);

            success(results);
        });
    }

    /**
     * Get equipment from specific order
     * @param {number} orderId Id of order
     * @param success Callback returns all rows
     */
    getEquipment(orderId, success) {
        let sql = "select *\n" +
          "from Utstyr\n" +
          "inner join Bestilling_Utstyr BU on Utstyr.utstyr_id = BU.utstyr_id\n" +
          "where bestilling_id = ?";
        connection.query(sql, [orderId], (error, results) => {
            if (error) console.error(error);

            success(results);
        });
    }

    /**
     * Gets customer from a specific order
     * @param {number} orderId Id of order
     * @param success Callback returns one row
     */
    getCustomerInfo(orderId, success) {
        let sql = "select *\n" +
          "from Kunde\n" +
          "inner join Bestilling B on Kunde.kunde_id = B.kunde_id\n" +
          "where bestilling_id = ?";
        connection.query(sql, [orderId], (error, results) => {
            if (error) console.error(error);

            success(results[0]);
        });
    }

    /**
     * Updates order status to be '1' - 'Delivered'
     * @param {number} orderId Id of order
     * @param success Callback returns nothing
     */
    updateOrderStatusDelivered(orderId, success) {
        let sql = "update Bestilling set levert = 1 where bestilling_id = ?";
        connection.query(sql, [orderId], (error, results) => {
            if (error) console.error(error);

            success();
        });
    }

    /**
     * Updates status and location of bike. Used when marking bike as delivered
     * @param {number} bikeId Id of bike
     * @param {string} statusMessage New status of bike
     * @param {number} locationId Id of location
     * @param success Callback returns nothing
     */
    updateBikeStatus(bikeId, statusMessage, locationId, success) {
        let sql = "update Sykkel set status = ?, sted = ? where sykkel_id = ?";
        connection.query(sql, [statusMessage, locationId, bikeId], (error, results) => {
           if (error) console.error(error);

           success();
        });
    }

    /**
     * Updates status and location of equipment. Used when marking equipment as delivered
     * @param {number} equipId Id of equipment
     * @param {string} statusMessage New status of equipment
     * @param {number} locationId Id of location
     * @param success Callback returns nothing
     */
    updateEquipStatus(equipId, statusMessage, locationId, success) {
        let sql = "update Utstyr set status = ?, sted = ? where utstyr_id = ?";
        connection.query(sql, [statusMessage, locationId, equipId], (error, results) => {
            if (error) console.error(error);

            success();
        });
    }

    /**
     * Gets number of available bikes of a specific type from a specific location
     * @param {number} location Id of location
     * @param {string} type Type of bike
     * @param success Callback returns one row
     */
    getAvailableBikesFromLocationType(location, type, success) {
        let sql ="select count(*) as total\n" +
          "from Sykkel\n" +
          "where status = 'Ledig'\n" +
          "and sted = ? and type = ?";
        connection.query(sql, [location, type], (error, results) => {
            if (error) return console.error(error);

            success(results[0]);
        });
    }

    /**
     * Gets number of available equipment of a specific type from a specific location
     * @param {number} location Id of location
     * @param {string} type Type of equipment
     * @param success Callback returns one row
     */
    getAvailableEquipFromLocationType(location, type, success) {
        let sql ="select count(*) as total\n" +
          "from Utstyr\n" +
          "where status = 'Ledig'\n" +
          "and sted = ? and type = ?";
        connection.query(sql, [location, type], (error, results) => {
            if (error) return console.error(error);

            success(results[0]);
        });
    }

    /**
     * Gets first available bike(s) matching specific location and type. Limits on the amount specified
     * @param {number} location Id of location where bike is currently at
     * @param {string} type Type of bike
     * @param {number} amount Number of specific bike(s) selected
     * @param success Callback returns all rows
     */
    getBikesForOrder(location, type, amount, success) {
        let sql = "select *\n" +
          "from Sykkel\n" +
          "where status = 'Ledig'\n" +
          "and sted = ?\n" +
          "and type = ?\n" +
          "limit ?";
        connection.query(sql, [location, type, amount], (error, results) => {
            if (error) console.error(error);

           success(results);
        });
    }

    /**
     * Gets first available equipment matching specific location and type. Limits on the amount specified
     * @param {number} location Id of location where equipment is currently at
     * @param {string} type Type of equipment
     * @param {number} amount Number specified equipment selected
     * @param success Callback returns all rows
     */
    getEquipForOrder(location, type, amount, success) {
        let sql = "select *\n" +
          "from Utstyr\n" +
          "where status = 'Ledig'\n" +
          "and sted = ?\n" +
          "and type = ?\n" +
          "limit ?";
        connection.query(sql, [location, type, amount], (error, results) => {
            if (error) console.error(error);

            success(results);
        });
    }

    /**
     * Creates a new customer in db
     * @param {object} customer Object containing all info about the customer
     * @param success Callback returns nothing
     */
    addCustomer(customer, success) {
        let sql = "insert into Kunde (navn, epost, tlf) VALUES (?, ?, ?)";
        connection.query(sql, [customer.navn, customer.epost, customer.telefon], (error, results) => {
           if (error) console.error(error);

           success();
        });
    }

    /**
     * Gets all customers from db
     * @param success Callback returns all rows
     */
    getCustomers(success) {
        let sql = "select * from Kunde";
        connection.query(sql, (error, results) => {
            if (error) console.error(error);

            success(results);
        });
    }

    /**
     * Gets specific customer by email
     * @param {string} email Customer's email
     * @param success Callback returns one row
     */
    getCustomerByEmail(email, success) {
        let sql = "select * from Kunde where epost = ?";
        connection.query(sql, [email], (error, results) => {
            if (error) console.error(error);

            success(results[0]);
        });
    }

    /**
     * Adds a new order to the db
     * @param {date} from Start-date of rental
     * @param {date} to End-date of rental
     * @param {number} hours Number of hours renting the gear
     * @param {number} customerId Id of the customer ordering
     * @param {number} employeeId Id of the employee processing the order
     * @param {number} price Price of the order
     * @param success Callback returns nothing
     */
    addOrder(from, to, hours, customerId, employeeId, price,  success) {
        let sql = "insert into Bestilling (fra, til, timer, kunde_id, ansatt_id, pris) VALUES (?, ?, ?, ?, ?, ?)";
        connection.query(sql, [from, to, hours, customerId, employeeId, price], (error, results) => {
            if (error) console.error(error);

            success();
        });
    }

    /**
     * Returns the max id-value of a specific table. This is the most recent added row
     * @param {string} tableName Name of table to get value from
     * @param success Callback returns one row
     */
    getLatestFromTable(tableName, success) {
        let sql = "SELECT AUTO_INCREMENT-1 as antall\n" +
          "FROM  INFORMATION_SCHEMA.TABLES\n" +
          "WHERE TABLE_SCHEMA = 'g_idri1005_08'\n" +
          "AND   TABLE_NAME = ?";
        connection.query(sql, [tableName], (error, results) => {
            if (error) console.error(error);

            success(results[0]);
        });
    }

    /**
     * Add bike to order
     * @param {number} orderId Id of order
     * @param {number} bikeId Id of bike
     * @param success Callback returns nothing
     */
    addBikeOrder(orderId, bikeId, success) {
        let sql = "insert into Bestilling_Sykkel values (?, ?)";
        connection.query(sql, [orderId, bikeId], (error, results) => {
            if (error) console.error(error);

           success();
        });
    }

    /**
     * Add equipment to order
     * @param {number} orderId Id of order
     * @param {number} equipId Id of equipment
     * @param success Callback returns nothing
     */
    addEquipOrder(orderId, equipId, success) {
        let sql = "insert into Bestilling_Utstyr values (?, ?)";
        connection.query(sql, [orderId, equipId], (error, results) => {
            if (error) console.error(error);

            success();
        });
    }

    /**
     * Removes an order from the db
     * @param {number} orderId Id of order
     * @param success Callback returns nothing
     */
    removeOrder(orderId, success) {
        let sql = "delete from Bestilling where bestilling_id = ?";
        connection.query(sql, [orderId], (error, results) => {
            if (error) console.error(error);

            success();
        });
    }
}

export let orderService = new OrderService();