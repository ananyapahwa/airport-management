CREATE TABLE airlinesaeroplanes (
  airlinesaeroplanesid INT PRIMARY KEY,
  airlineid INT NOT NULL,
  aeroplaneid INT NOT NULL,
  FOREIGN KEY (airlineid) REFERENCES airlines(airlineid),
  FOREIGN KEY (aeroplaneid) REFERENCES aeroplanes(aeroplanesid)
);
