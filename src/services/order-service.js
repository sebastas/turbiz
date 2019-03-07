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

    // getBikes(orderId, success) {
    //     let sql = "select *\n" +
    //       "from Sykkel\n" +
    //       "inner join Bestilling B on Sykkel.bestilling_id = B.bestilling_id\n" +
    //       "where B.bestilling_id = ?";
    //     connection.query(sql, [orderId], (error, results) => {
    //         if (error) return console.error(error);
    //
    //         success(results);
    //     });
    // }
    //
    // getEquipment(orderId, success) {
    //     let sql = "select *\n" +
    //       "from Utstyr\n" +
    //       "inner join Bestilling B on Utstyr.bestilling_id = B.bestilling_id\n" +
    //       "where B.bestilling_id = ?";
    //     connection.query(sql, [orderId], (error, results) => {
    //         if (error) return console.error(error);
    //
    //         success(results);
    //     });
    // }

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
}

export let orderService = new OrderService();