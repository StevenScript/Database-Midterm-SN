-- Query 1: Movies rented by a specific customer
-- Finds all movies rented by a specific customer, given their email.
SELECT m.title
FROM Movies m
JOIN Rentals r ON m.movie_id = r.movie_id
JOIN Customers c ON r.customer_id = c.customer_id
WHERE c.email_address = 'Abed.Nadir@communitymail.com';


-- Query 2: Customers who have rented a specific movie
-- Given a movie title, list all customers who have rented the movie.
SELECT c.first_name, c.last_name
FROM Customers c
JOIN Rentals r ON c.customer_id = r.customer_id
JOIN Movies m ON r.movie_id = m.movie_id
WHERE m.title = 'Dredd';


-- Query 3: Rental history for a specific movie
-- Gets the rental history for a specific movie title.
SELECT c.first_name, c.last_name, r.rental_date, r.return_date
FROM Rentals r
JOIN Customers c ON r.customer_id = c.customer_id
JOIN Movies m ON r.movie_id = m.movie_id
WHERE m.title = 'The Raid: Redemption';

-- Query 4: Rentals of movies by a specific director
-- Lists all renteal information( customer name, movie title, and rental date) by a specific movie director:
SELECT c.first_name, c.last_name, r.rental_date, m.title
FROM Rentals r
JOIN Customers c ON r.customer_id = c.customer_id
JOIN Movies m ON r.movie_id = m.movie_id
WHERE m.director_name = 'Gareth Evans';


-- Query 5: Currently rented out movies
-- List all currently rented out movies (movies whose return dates haven't been met).
SELECT m.title, r.rental_date, c.first_name, c.last_name
FROM Rentals r
JOIN Movies m ON r.movie_id = m.movie_id
JOIN Customers c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL;
