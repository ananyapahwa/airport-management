CREATE OR REPLACE PROCEDURE get_passenger_tickets_sorted (
    p_cursor OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_cursor FOR
    SELECT 
        t1.TICKET_NUMBER,
        t1.SOURCE,
        t1.DESTINATION,
        t1.DATE_OF_BOOKING,
        t1.DATE_OF_TRAVEL,
        t1.SEATNO,
        t1.CLASS,
        t1.DATE_OF_CANCELLATION,
        t1.PID,
        t1.PASSPORTNO,
        p2.FNAME,
        p2.LNAME,
        p3.FLIGHT_CODE,
        t2.PRICE
    FROM 
        TICKET1 t1
        JOIN PASSENGER_DETAILS p2 ON t1.PASSPORTNO = p2.PASSPORTNO
        LEFT JOIN PASSENGER_BOOKINGS p3 ON t1.PID = p3.PID
        LEFT JOIN TICKET_DETAILS t2 ON t1.DATE_OF_BOOKING = t2.DATE_OF_BOOKING 
            AND t1.SOURCE = t2.SOURCE 
            AND t1.DESTINATION = t2.DESTINATION 
            AND t1.CLASS = t2.CLASS
    ORDER BY 
        t1.DATE_OF_TRAVEL;
END;
/