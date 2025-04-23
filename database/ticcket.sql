CREATE TABLE Tickets (
    TicketID INT PRIMARY KEY,
    PassengerID INT,
    FlightID INT,
    SeatNumber VARCHAR(10),
    BookingDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(20) DEFAULT 'Booked',
    FOREIGN KEY (PassengerID) REFERENCES Passengers(PassengerID) ON DELETE CASCADE,
    FOREIGN KEY (FlightID) REFERENCES Flights(FlightID) ON DELETE CASCADE
);
