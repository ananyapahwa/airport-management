CREATE OR REPLACE PROCEDURE airline_data AS
    CURSOR airline_cursor IS SELECT * FROM airline;
BEGIN
    FOR rec IN airline_cursor LOOP
        DBMS_OUTPUT.PUT_LINE(rec.airlineid || ' ' || rec.airlinename);
    END LOOP;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error: ' || SQLERRM);
END;
/

CREATE OR REPLACE PROCEDURE show_data (p_choice IN NUMBER) AS
BEGIN
    IF p_choice = 1 THEN
        airline_data();
    ELSIF p_choice = 2 THEN
        airline_data();
    ELSE
        DBMS_OUTPUT.PUT_LINE('Invalid choice');
    END IF;
END;
/