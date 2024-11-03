# Movie Rental System

## Overview

This CLI application serves as a management tool for a movie rental system. It allows users to interact with a PostgreSQL database containing information about movies, customers, and movie rentals

## Features

- **Create Database Tables**: Automatically creates `Movies`, `Customers`, and `Rentals` tables if they don't exist.
- **Insert New Movies**: Add new movies to the database with details like title, release year, genre, and director.
- **Update Customer Email**: Modify a customer's email address.
- **Remove Customer**: Delete a customer from the database along with their rental history.
- **Display All Movies**: View a list of all movies available in the database.

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v22 is recommended)
- **PostgreSQL** server running
- **pgAdmin4** installed (optional but recommended for database management)

## How to Use this Repo

This repository is set up as a completed midterm sprint

**Movie Rental System**.

### Steps to Create Your Own Repository

1. **Clone Your Repository**

   Use the provided command to clone the repo:

   ```bash
   git clone https://github.com/StevenScript/Database-Midterm-SN.git
   ```

   Navigate to the project directory:

   ```bash
   cd Database-Midterm-SN
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Database Connection**

   - Open `index.js` in your preferred code editor (e.g., VSCode).
   - Update the PostgreSQL connection details to match your setup:

     ```javascript
     const pool = new Pool({
       user: "postgres",
       host: "localhost",
       database: "movie_rental_db",
       password: "postgres",
       port: 5432,
     });
     ```

   ```

   ```

By using this template, you'll have the project structure and initial setup ready to go, so you can focus on building the functionality!

## Usage

Run the application with the following commands:

### Insert a Movie

To insert a new movie, use:

```bash
node index.js insert "<title>" <year> "<genre>" "<director>"
```

Example:

```bash
node index.js insert "Inception" 2010 "Science Fiction" "Christopher Nolan"
```

### Show All Movies

To display all movies in the database, use:

```bash
node index.js show
```

### Update Customer Email

To update a customer's email address, use:

```bash
node index.js update <customer_id> "<new_email>"
```

Example:

```bash
node index.js update 1 "newemail@example.com"
```

### Remove a Customer

To remove a customer from the database, use:

```bash
node index.js remove <customer_id>
```

Example:

```bash
node index.js remove 1
```

### Help Command

To view all available commands, use:

```bash
node index.js
```

## Notes

- Make sure your PostgreSQL server is running and that you have created a database for the application to connect to.
- Modify the database connection details in the code to match your PostgreSQL setup.

## PostgreSQL Queries

All required PostgreSQL queries are provided in the `queries.sql` file. These queries perform various operations such as retrieving rental histories, listing customers who rented specific movies, and more.

### Example Queries

#### 1. Find All Movies Rented by a Specific Customer

```sql
SELECT m.title
FROM Movies m
JOIN Rentals r ON m.movie_id = r.movie_id
JOIN Customers c ON r.customer_id = c.customer_id
WHERE c.email_address = 'Abed.Nadir@communitymail.com';
```

#### 2. List All Currently Rented Out Movies

```sql
SELECT m.title, r.rental_date, c.first_name, c.last_name
FROM Rentals r
JOIN Movies m ON r.movie_id = m.movie_id
JOIN Customers c ON r.customer_id = c.customer_id
WHERE r.return_date IS NULL;
```

## Normalization Explanation

Ensuring that the database schema adheres to the Third Normal Form (3NF) is crucial for eliminating redundancy and ensuring data integrity. Here's how each table in the **Movie Rental System** meets the requirements of 3NF:

## Movies Table

- **First Normal Form (1NF)**:

  - All fields contain atomic values.
  - Each record is unique via the `movie_id` primary key.

- **Second Normal Form (2NF)**:

  - The table has a single-field primary key (`movie_id`).
  - All non-key attributes (`title`, `release_year`, `genre`, `director_name`) are fully functionally dependent on `movie_id`.

- **Third Normal Form (3NF)**:
  - No transitive dependencies exist.
  - Attributes like `genre` and `director_name` depend solely on `movie_id`.

## Customers Table

- **First Normal Form (1NF)**:

  - Atomic values in each field.
  - Unique records via `customer_id`.

- **Second Normal Form (2NF)**:

  - Single-field primary key (`customer_id`).
  - All other attributes depend entirely on `customer_id`.

- **Third Normal Form (3NF)**:
  - No transitive dependencies.
  - Attributes like `email_address` and `phone_number` are directly related to `customer_id`.

## Rentals Table

- **First Normal Form (1NF)**:

  - Atomic values.
  - Unique `rental_id` primary key.

- **Second Normal Form (2NF)**:

  - All non-key attributes (`customer_id`, `movie_id`, `rental_date`, `return_date`) depend on `rental_id`.

- **Third Normal Form (3NF)**:
  - No transitive dependencies.
  - Foreign keys (`customer_id`, `movie_id`) relate to primary keys in other tables but do not cause transitive dependencies within the Rentals table.
