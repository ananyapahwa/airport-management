CREATE TABLE terminals (
  terminalsid INT PRIMARY KEY,
  terminalno INT NOT NULL,
  terminalname VARCHAR(20) NOT NULL,
  airportid INT NOT NULL,
  FOREIGN KEY (airportid) REFERENCES airports(airportid)
);
