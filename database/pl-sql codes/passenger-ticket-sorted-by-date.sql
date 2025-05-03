CREATE OR REPLACE PROCEDURE get_passenger_bookings (
    p_passportno IN VARCHAR2,
    booking_cursor OUT SYS_REFCURSOR
)
AS
BEGIN
    OPEN booking_cursor FOR
        SELECT 
            t1.*,
            p2.FNAME,
            p2.LNAME,
            p3.FLIGHT_CODE,
            t2.PRICE
        FROM 
            FLIGHT_TICKETS t1
            JOIN PASSENGER2 p2 ON t1.PASSPORTNO = p2.PASSPORTNO
            LEFT JOIN PASSENGER_BOOKINGS p3 ON t1.PID = p3.PID
            LEFT JOIN TICKET_DETAILS t2 ON t1.DATE_OF_BOOKING = t2.DATE_OF_BOOKING 
               AND t1.SOURCE = t2.SOURCE 
               AND t1.DESTINATION = t2.DESTINATION 
               AND t1.CLASS = t2.CLASS
        WHERE 
            t1.PASSPORTNO = p_passportno
        ORDER BY 
            TO_DATE(t1.DATE_OF_TRAVEL, 'YYYY-MM-DD');
END;
/
