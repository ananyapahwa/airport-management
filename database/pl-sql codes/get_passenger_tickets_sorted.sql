CREATE OR REPLACE PROCEDURE get_passenger_tickets_sorted (
    p_cursor OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_cursor FOR
    SELECT
        ft.TICKET_NUMBER,
        ft.SOURCE,
        ft.DESTINATION,
        ft.DATE_OF_BOOKING,
        ft.DATE_OF_TRAVEL,
        ft.SEATNO,
        ft.CLASS,
        ft.DATE_OF_CANCELLATION,
        ft.PID,
        ft.PASSPORTNO,
        p2.FNAME,
        p2.LNAME,
        pb.FLIGHT_CODE,
        td.PRICE
    FROM
        FLIGHT_TICKETS ft
        JOIN PASSENGER_RELATIONSHIP pr 
            ON ft.PID = pr.PID AND ft.PASSPORTNO = pr.PASSPORTNO
        JOIN PASSENGER2 p2 
            ON pr.PASSPORTNO = p2.PASSPORTNO
        LEFT JOIN PASSENGER_BOOKINGS pb 
            ON ft.PID = pb.PID
        LEFT JOIN TICKET_DETAILS td 
            ON ft.DATE_OF_BOOKING = td.DATE_OF_BOOKING
            AND ft.SOURCE = td.SOURCE
            AND ft.DESTINATION = td.DESTINATION
            AND ft.CLASS = td.CLASS
    ORDER BY
        ft.DATE_OF_TRAVEL;
END;
/
