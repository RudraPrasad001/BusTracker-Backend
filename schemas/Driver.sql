--Table for Drivers
CREATE TABLE IF NOT EXISTS drivers (
    driver_id SERIAL PRIMARY KEY,
    phone_number BIGINT NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    bus_id INT REFERENCES buses(bus_id) ON DELETE SET NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    number_plate_url VARCHAR(255)
);  