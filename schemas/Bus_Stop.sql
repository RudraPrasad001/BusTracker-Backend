--Links the busses and the stops with the sequence of order
CREATE TABLE IF NOT EXISTS bus_stops (
    bus_id INT REFERENCES buses(bus_id) ON DELETE CASCADE,
    stop_id INT REFERENCES stops(stop_id) ON DELETE CASCADE,
    sequence_number INT NOT NULL,
    PRIMARY KEY (bus_id, stop_id)
);