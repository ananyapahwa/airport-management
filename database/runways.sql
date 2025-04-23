CREATE TABLE runways (
  runwaysid INT PRIMARY KEY,
  runwayno INT NOT NULL,
  runwayname VARCHAR(20) NOT NULL,
  airportid INT NOT NULL,
  FOREIGN KEY (airportid) REFERENCES airports(airportid)
);
