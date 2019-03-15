import { connection } from '../mysql_connection';

class OrderService {

    getOrders(success) {
        let sql = "select *\n" +
            "from Bestilling\n" +
            "inner join Ansatte A on Bestilling.ansatt_id = A.ansatt_id\n" +
            "order by bestilling_id desc";
        connection.query(sql, (error, results) => {
            if (error) return console.error(error);

            success(results);
        });
    }

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

    updateOrderStatusDelivered(orderId, success) {
        let sql = "update Bestilling set levert = 1 where bestilling_id = ?";
        connection.query(sql, [orderId], (error, results) => {
            if (error) console.error(error);

            success();
        });
    }

    updateBikeStatus(bikeId, statusMessage, locationId, success) {
        let sql = "update Sykkel set status = ?, sted = ? where sykkel_id = ?";
        connection.query(sql, [statusMessage, locationId, bikeId], (error, results) => {
           if (error) console.error(error);

           success();
        });
    }

    updateEquipStatus(equipId, statusMessage, locationId, success) {
        let sql = "update Utstyr set status = ?, sted = ? where utstyr_id = ?";
        connection.query(sql, [statusMessage, locationId, equipId], (error, results) => {
            if (error) console.error(error);

            success();
        });
    }


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

    addCustomer(customer, success) {
        let sql = "insert into Kunde (navn, epost, tlf) VALUES (?, ?, ?)";
        connection.query(sql, [customer.navn, customer.epost, customer.telefon], (error, results) => {
           if (error) console.error(error);

           success();
        });
    }

    getCustomers(success) {
        let sql = "select * from Kunde";
        connection.query(sql, (error, results) => {
            if (error) console.error(error);

            success(results);
        })
    }
}

export let orderService = new OrderService();