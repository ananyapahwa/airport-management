const oracledb = require('oracledb');
async function getSortedTicketsByPrice (req, res) {
    let connection;
    const { source, destination } = req.params;
  
    try {
      connection = await oracledb.getConnection();
  
      const result = await connection.execute(
        `BEGIN 
           get_sorted_tickets_by_price(:p_source, :p_destination, :sorted_cursor); 
         END;`,
        {
          p_source: source.trim(),
          p_destination: destination.trim(),
          sorted_cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
        }
      );
  
      const resultSet = result.outBinds.sorted_cursor;
      const rows = await resultSet.getRows();
      await resultSet.close();
  
      const formattedData = rows.map(row => ({
        DATE_OF_BOOKING: row[0],
        SOURCE: row[1],
        DESTINATION: row[2],
        CLASS: row[3],
        PRICE: row[4]
      }));
  
      res.json({
        success: true,
        data: formattedData
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: 'Error retrieving sorted ticket data',
        message: err.message
      });
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  };
  module.exports = { getSortedTicketsByPrice };