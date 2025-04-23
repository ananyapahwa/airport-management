CREATE TABLE airlinecrewphonenumber (
  airlinecrewphonenumberid INT PRIMARY KEY,
  airlinecrewid INT NOT NULL,
  phonenumber VARCHAR(20) NOT NULL,
  FOREIGN KEY (airlinecrewid) REFERENCES airlinecrew(crewid)
);
