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
}

export let orderService = new OrderService();