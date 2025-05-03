CREATE OR REPLACE PROCEDURE get_sorted_tickets_by_price (
  p_source IN VARCHAR2,
  p_destination IN VARCHAR2,
  sorted_cursor OUT SYS_REFCURSOR
) AS
BEGIN
  OPEN sorted_cursor FOR
    SELECT * 
    FROM ticket_details
    WHERE UPPER(SOURCE) = UPPER(TRIM(p_source))
      AND UPPER(DESTINATION) = UPPER(TRIM(p_destination))
    ORDER BY PRICE;
END;
/
