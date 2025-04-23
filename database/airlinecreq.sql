CREATE TABLE airlinecrew (
  crewid INT PRIMARY KEY,
  crewfirstname VARCHAR(50) NOT NULL,
  crewlastname VARCHAR(50) NOT NULL,
  crewgender CHAR(1) NOT NULL,
  crewcountry VARCHAR(20) NOT NULL,
  airlineid INT NOT NULL,
  FOREIGN KEY (airlineid) REFERENCES airlines(airlineid)
);
