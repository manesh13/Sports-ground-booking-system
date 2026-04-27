INSERT INTO FACILITY (name, sport_type, lighting, hourly_rate)
VALUES
    ('Football Ground', 'Football', TRUE, 500),
    ('Cricket Ground', 'Cricket', TRUE, 400),
    ('Tennis Court', 'Tennis', FALSE, 300),
    ('Badminton Court', 'Badminton', FALSE, 250);

INSERT INTO users (email, password, role)
VALUES ('citizen', 'pass', 'CITIZEN');
INSERT INTO users (email, password, role)
VALUES ('manager', 'pass', 'MANAGER');
INSERT INTO users (email, password, role)
VALUES ('admin', 'pass', 'ADMIN');