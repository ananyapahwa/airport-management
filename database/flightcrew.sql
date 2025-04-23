CREATE TABLE flightcrew (
  flightcrewid INT PRIMARY KEY,
  flightid INT NOT NULL,
  pilotid INT NOT NULL,
  copilotid INT NOT NULL,
  numberofairhostesses INT NOT NULL,
  headairhostessid INT NOT NULL,
  FOREIGN KEY (flightid) REFERENCES flightsgoing(flightsgoingid),
  FOREIGN KEY (pilotid) REFERENCES airlinecrew(crewid),
  FOREIGN KEY (copilotid) REFERENCES airlinecrew(crewid),
  FOREIGN KEY (headairhostessid) REFERENCES airlinecrew(crewid)
);
