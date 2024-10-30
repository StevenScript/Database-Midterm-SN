-- Insert Movies
INSERT INTO Movies (title, release_year, genre, director_name) VALUES
('The Raid: Redemption', 2011, 'Action', 'Gareth Evans'),
('Dredd', 2012, 'Action', 'Pete Travis'),
('Rust and Bone', 2012, 'Romance', 'Jacques Audiard'),
('Like Crazy', 2011, 'Romance', 'Drake Doremus'),
('Jin-Roh: The Wolf Brigade', 1999, 'Action', 'Hiroyuki Okiura'),
('Repo Man', 1984, 'Action', 'Alex Cox'),
('Come and See', 1985, 'Drama', 'Elem Klimov'),
('Here Before', 2021, 'Drama', 'Stacey Gregg'),
('Coherence', 2013, 'Thriller', 'James Ward Byrkit'),
('10 Cloverfield Lane', 2016, 'Thriller', 'Dan Trachtenberg');

-- Insert Customers
INSERT INTO Customers (first_name, last_name, email_address, phone_number) VALUES
('Abed', 'Nadir', 'Abed.Nadir@communitymail.com', '111-466-7890'),
('Randy', 'Meeks', 'Meeks.Screams@gmail.com', '709-920-9911'),
('Duke', 'Nukem', 'Kingduke@protonmail.com', '333-686-0121'),
('Casper', 'DeGhost', 'Friendly@gmail.com', '466-709-1557'),
('Jack', 'OLantern', 'greatpumpkin@gmail.com', '404-502-1337');

-- Insert Rentals
INSERT INTO Rentals (customer_id, movie_id, rental_date, return_date) VALUES
(1, 2, '2024-10-10', '2024-10-14'),
(2, 3, '2024-10-12', '2024-10-16'),
(3, 1, '2024-10-15', '2024-10-19'),
(4, 4, '2024-10-18', '2024-10-22' ),
(5, 5, '2024-10-20', '2024-10-24'),
(1, 3, '2024-10-23', '2024-10-27'),
(2, 1, '2024-10-23', '2024-10-27'),
(3, 2, '2024-10-27', NULL),
(4, 5, '2024-10-28', NULL),
(5, 4, '2024-10-29', NULL);