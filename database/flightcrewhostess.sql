CREATE TABLE flightcrewhostess (
  flightcrewhostessid INT PRIMARY KEY,
  flightcrewid INT NOT NULL,
  airelinecrewid INT NOT NULL,
  FOREIGN KEY (flightcrewid) REFERENCES flightcrew(flightcrewid),
  FOREIGN KEY (airelinecrewid) REFERENCES airlinecrew(crewid)
);
