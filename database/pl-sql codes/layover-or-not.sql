CREATE OR REPLACE PROCEDURE GET_FLIGHTS_BY_LAYOVER(
    has_layover IN VARCHAR2,
    flight_cursor OUT SYS_REFCURSOR
)
AS
BEGIN
    IF UPPER(has_layover) = 'YES' THEN
        OPEN flight_cursor FOR
        SELECT * FROM FLIGHT WHERE NO_OF_STOPS > 0;
    ELSIF UPPER(has_layover) = 'NO' THEN
        OPEN flight_cursor FOR
        SELECT * FROM FLIGHT WHERE NO_OF_STOPS = 0;
    ELSE
        OPEN flight_cursor FOR
        SELECT * FROM FLIGHT; -- default
    END IF;
END;
