--Table for Buses
CREATE TABLE IF NOT EXISTS buses (
    bus_id SERIAL PRIMARY KEY,
    bus_number VARCHAR(50) NOT NULL UNIQUE,
    route_name VARCHAR(100),
    number_plate_url VARCHAR(255),
    number_plate VARCHAR(20)
);