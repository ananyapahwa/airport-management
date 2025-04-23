CREATE TABLE passengersgoing (
  passengersgoingid INT PRIMARY KEY,
  passengerid INT NOT NULL,
  flightid INT NOT NULL,
  FOREIGN KEY (passengerid) REFERENCES passengers(passengersid),
  FOREIGN KEY (flightid) REFERENCES flightsgoing(flightsgoingid)
);
