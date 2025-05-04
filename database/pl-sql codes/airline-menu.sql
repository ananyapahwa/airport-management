CREATE OR REPLACE PROCEDURE airline_data AS
    CURSOR airline_cursor IS SELECT * FROM airline;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== AIRLINES ===');
    DBMS_OUTPUT.PUT_LINE('ID  AIRLINE NAME');
    DBMS_OUTPUT.PUT_LINE('----------------');
    FOR rec IN airline_cursor LOOP
        DBMS_OUTPUT.PUT_LINE(rec.airlineid || '  ' || rec.al_name);
    END LOOP;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error in airline_data: ' || SQLERRM);
END;
/

CREATE OR REPLACE PROCEDURE airport_data AS
    CURSOR airport_cursor IS SELECT * FROM airport;
BEGIN
    DBMS_OUTPUT.PUT_LINE('=== AIRPORTS ===');
    DBMS_OUTPUT.PUT_LINE('AIRPORT NAME         STATE      COUNTRY      CITY');
    DBMS_OUTPUT.PUT_LINE('----------------------------------------------');
    FOR rec IN airport_cursor LOOP
        DBMS_OUTPUT.PUT_LINE(
            RPAD(rec.ap_name, 20) || ' ' ||
            RPAD(NVL(rec.state, 'N/A'), 10) || ' ' ||
            RPAD(rec.country, 12) || ' ' ||
            rec.cname
        );
    END LOOP;
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error in airport_data: ' || SQLERRM);
END;
/

CREATE OR REPLACE PROCEDURE show_data (p_choice IN NUMBER) AS
BEGIN
    IF p_choice = 1 THEN
        airline_data();
    ELSIF p_choice = 2 THEN
        airport_data();
    ELSE
        DBMS_OUTPUT.PUT_LINE('Invalid choice. Please enter 1 (Airlines) or 2 (Airports)');
    END IF;
END;
/