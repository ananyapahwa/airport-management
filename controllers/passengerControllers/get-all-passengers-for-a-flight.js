const oracledb = require('oracledb');

async function getPassengersForFlight(req, res) {
    const { flight_code } = req.params;
    let connection;

    try {
        connection = await oracledb.getConnection();

        const result = await connection.execute(
            `BEGIN
                get_passengers_for_flight(:flight_code, :result);
            END;`,
            {
                flight_code: flight_code,
                result: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
            }
        );

        const resultSet = result.outBinds.result;
        const passengers = await resultSet.getRows(); // Get all rows

        await resultSet.close(); // Always close the result set

        if (passengers.length === 0) {
            return res.status(404).json({ 
                message: 'No passengers found for this flight' 
            });
        }

        res.json({
            flight_code: flight_code,
            passenger_count: passengers.length,
            passengers: passengers
        });

    } catch (error) {
        console.error('Error fetching passengers:', error);
        res.status(500).json({ 
            error: 'Failed to fetch passenger details',
            details: error.message 
        });
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
    }
}

module.exports = {
    getPassengersForFlight
};