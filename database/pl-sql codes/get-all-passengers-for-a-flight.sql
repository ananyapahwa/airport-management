CREATE OR REPLACE PROCEDURE get_passengers_for_flight(
    p_flight_code IN VARCHAR2,
    p_result OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN p_result FOR
        SELECT 
            pb.PID,
            p2.PASSPORTNO,
            p2.FNAME,
            p2.M,
            p2.LNAME,
            p2.ADDRESS,
            p2.PHONE,
            p2.AGE,
            p2.SEX
        FROM 
            PASSENGER_BOOKINGS pb
            JOIN PASSENGER_RELATIONSHIP pr ON pb.PID = pr.PID
            JOIN PASSENGER2 p2 ON pr.PASSPORTNO = p2.PASSPORTNO
        WHERE 
            pb.FLIGHT_CODE = p_flight_code;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error in get_passengers_for_flight: ' || SQLERRM);
        RAISE;
END;
/