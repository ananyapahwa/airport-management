const oracledb = require('oracledb');

// 1. Passengers who have traveled with multiple airlines
async function passengersWithMultipleAirlines(req, res) {
    let connection;
    try {
        connection = await oracledb.getConnection();

        const result = await connection.execute(`
            SELECT p.FNAME, p.LNAME, p.PASSPORTNO, COUNT(DISTINCT a.AIRLINEID) AS airline_count
            FROM PASSENGER2 p
            JOIN PASSENGER_RELATIONSHIP pr ON p.PASSPORTNO = pr.PASSPORTNO
            JOIN PASSENGER_BOOKINGS pb ON pr.PID = pb.PID
            JOIN FLIGHT f ON pb.FLIGHT_CODE = f.FLIGHT_CODE
            JOIN AIRLINE a ON f.AIRLINEID = a.AIRLINEID
            GROUP BY p.FNAME, p.LNAME, p.PASSPORTNO
            HAVING COUNT(DISTINCT a.AIRLINEID) > 1
        `);

        const passengers = result.rows.map(row => ({
            first_name: row[0],
            last_name: row[1],
            passport_no: row[2],
            airline_count: row[3]
        }));

        res.json({ passenger_count: passengers.length, passengers });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to fetch passengers', details: err.message });
    } finally {
        if (connection) await connection.close();
    }
}

// 2. Airports with most employees and flight count
async function airportsWithMostEmployees(req, res) {
    let connection;
    try {
        connection = await oracledb.getConnection();

        const result = await connection.execute(`
            SELECT a.AP_NAME,
                   COUNT(DISTINCT e.SSN) AS employee_count,
                   (SELECT COUNT(DISTINCT f.FLIGHT_CODE)
                    FROM FLIGHT f
                    JOIN CONTAINS c ON f.AIRLINEID = c.AIRLINEID
                    WHERE c.AP_NAME = a.AP_NAME) AS flight_count
            FROM AIRPORT a
            JOIN EMPLOYEE_DETAILS e ON a.AP_NAME = e.AP_NAME
            GROUP BY a.AP_NAME
            ORDER BY employee_count DESC
        `);

        const airports = result.rows.map(row => ({
            airport_name: row[0],
            employee_count: row[1],
            flight_count: row[2]
        }));

        res.json({ total_airports: airports.length, airports });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to fetch airports', details: err.message });
    } finally {
        if (connection) await connection.close();
    }
}

// 3. Passengers traveling in Business class
async function businessClassPassengers(req, res) {
    let connection;
    try {
        connection = await oracledb.getConnection();

        const result = await connection.execute(`
            SELECT DISTINCT p.FNAME, p.LNAME
            FROM PASSENGER2 p
            JOIN FLIGHT_TICKETS ft ON p.PASSPORTNO = ft.PASSPORTNO
            WHERE ft.CLASS = 'BUSINESS'
        `);

        const passengers = result.rows.map(row => ({
            first_name: row[0],
            last_name: row[1]
        }));

        res.json({ class: 'Business', total_passengers: passengers.length, passengers });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to fetch business class passengers', details: err.message });
    } finally {
        if (connection) await connection.close();
    }
}

// 4. Average ticket price per class
async function averageTicketPricePerClass(req, res) {
    let connection;
    try {
        connection = await oracledb.getConnection();

        const result = await connection.execute(`
            SELECT CLASS, AVG(PRICE) AS avg_price
            FROM TICKET_DETAILS
            GROUP BY CLASS
            ORDER BY avg_price DESC
        `);

        const data = result.rows.map(row => ({
            class: row[0],
            average_price: Number(row[1].toFixed(2))
        }));

        res.json({ class_stats: data });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to fetch average prices', details: err.message });
    } finally {
        if (connection) await connection.close();
    }
}

// 5. Airlines operating in the US
async function airlinesInUS(req, res) {
    let connection;
    try {
        connection = await oracledb.getConnection();

        const result = await connection.execute(`
            SELECT DISTINCT a.AL_NAME
            FROM AIRLINE a
            JOIN CONTAINS c ON a.AIRLINEID = c.AIRLINEID
            JOIN AIRPORT ap ON c.AP_NAME = ap.AP_NAME
            WHERE ap.COUNTRY = 'United States'
        `);

        const airlines = result.rows.map(row => ({
            airline_name: row[0]
        }));

        res.json({ country: 'United States', total_airlines: airlines.length, airlines });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to fetch US airlines', details: err.message });
    } finally {
        if (connection) await connection.close();
    }
}

// 6. Employees who served first-class passengers
async function employeesServingVIP(req, res) {
    let connection;
    try {
        connection = await oracledb.getConnection();

        const result = await connection.execute(`
            SELECT DISTINCT e.FNAME, e.LNAME, e.POSITION
            FROM EMPLOYEE_DETAILS e
            JOIN SERVES s ON e.SSN = s.SSN
            JOIN FLIGHT_TICKETS ft ON s.PID = ft.PID AND s.PASSPORTNO = ft.PASSPORTNO
            WHERE ft.CLASS = 'First'
        `);

        const employees = result.rows.map(row => ({
            first_name: row[0],
            last_name: row[1],
            position: row[2]
        }));

        res.json({ class: 'First', employee_count: employees.length, employees });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to fetch VIP-serving employees', details: err.message });
    } finally {
        if (connection) await connection.close();
    }
}

// 7. Airlines with no delayed flights
async function airlinesWithoutDelayedFlights(req, res) {
    let connection;
    try {
        connection = await oracledb.getConnection();

        const result = await connection.execute(`
            SELECT a.AIRLINEID, a.AL_NAME, COUNT(f.FLIGHT_CODE) AS total_flights
            FROM AIRLINE a
            JOIN FLIGHT f ON a.AIRLINEID = f.AIRLINEID
            WHERE a.AIRLINEID NOT IN (
                SELECT DISTINCT AIRLINEID FROM FLIGHT WHERE STATUS = 'Delayed'
            )
            GROUP BY a.AIRLINEID, a.AL_NAME
            HAVING COUNT(f.FLIGHT_CODE) > 0
        `);

        const airlines = result.rows.map(row => ({
            airline_id: row[0],
            airline_name: row[1],
            total_flights: row[2]
        }));

        res.json({ airlines_count: airlines.length, airlines });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to fetch airlines without delays', details: err.message });
    } finally {
        if (connection) await connection.close();
    }
}

module.exports = {
    passengersWithMultipleAirlines,
    airportsWithMostEmployees,
    businessClassPassengers,
    averageTicketPricePerClass,
    airlinesInUS,
    employeesServingVIP,
    airlinesWithoutDelayedFlights
};
