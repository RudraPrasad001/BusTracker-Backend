--To store real time location
CREATE TABLE IF NOT EXISTS locations (
    location_id SERIAL PRIMARY KEY,
    bus_id INT REFERENCES buses(bus_id) ON DELETE CASCADE,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);