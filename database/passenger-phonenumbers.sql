CREATE TABLE passengersphonenumber (
  passengersphonenumberid INT PRIMARY KEY,
  passengerid INT NOT NULL,
  phonenumber VARCHAR(20) NOT NULL,
  FOREIGN KEY (passengerid) REFERENCES passengers(passengersid)
);
