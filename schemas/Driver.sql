--Table for Drivers
CREATE TABLE IF NOT EXISTS drivers (
    driver_id SERIAL PRIMARY KEY,
    phone_number VARCHAR(20) NOT NULL UNIQUE,
    bus_id INT REFERENCES buses(bus_id) ON DELETE SET NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    number_plate_url VARCHAR(255)
);  