const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

// PostgreSQL connection
const pool = new Pool({
  user: "postgres", // Default username for DB(database)
  host: "localhost",
  database: "Movie-Store", // My DB name
  password: "postgres", // DB password
  port: 5432,
});

/**
 * Creates the database tables, if they do not already exist.
 */
async function createTable() {
  try {
    const createTableQuery = fs.readFileSync(
      path.join(__dirname, "sql", "create_tables.sql"),
      "utf-8"
    );
    await pool.query(createTableQuery);
    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}

/**
 * Inserts a new movie into the Movies table.
 *
 * @param {string} title Title of the movie
 * @param {number} year Year the movie was released
 * @param {string} genre Genre of the movie
 * @param {string} director Director of the movie
 */
async function insertMovie(title, year, genre, director) {
  try {
    await pool.query(
      "INSERT INTO Movies (title, release_year, genre, director_name) VALUES ($1, $2, $3, $4)",
      [title, year, genre, director]
    );
    console.log(`Movie "${title}" added successfully.`);
  } catch (err) {
    console.error("Error inserting movie:", err);
  }
}

/**
 * Prints all movies in the database to the console
 */
async function displayMovies() {
  try {
    const res = await pool.query("SELECT * FROM Movies");
    console.table(res.rows);
  } catch (err) {
    console.error("Error fetching movies:", err);
  }
}

/**
 * Updates a customer's email address.
 *
 * @param {number} customerId ID of the customer
 * @param {string} newEmail New email address of the customer
 */
async function updateCustomerEmail(customerId, newEmail) {
  try {
    await pool.query(
      "UPDATE Customers SET email_address = $1 WHERE customer_id = $2",
      [newEmail, customerId]
    );
    console.log(`Customer ${customerId}'s email updated to ${newEmail}.`);
  } catch (err) {
    console.error("Error updating email:", err);
  }
}

/**
 * Removes a customer from the database along with their rental history.
 *
 * @param {number} customerId ID of the customer to remove
 */
async function removeCustomer(customerId) {
  try {
    // Delete rentals associated with customer
    await pool.query("DELETE FROM Rentals WHERE customer_id = $1", [
      customerId,
    ]);
    // Delete customer
    await pool.query("DELETE FROM Customers WHERE customer_id = $1", [
      customerId,
    ]);
    console.log(`Customer ${customerId} and their rental history removed.`);
  } catch (err) {
    console.error("Error removing customer:", err);
  }
}

/**
 * Prints a help message to the console
 *
 * I tidied it up for ease of use :)
 */
function printHelp() {
  console.log("Steve`s Movie Rentals");
  console.log("------------------------");
  console.log("Usage:");
  console.log('   - Insert "<title>" <year> "<genre>" "<director>"');
  console.log("  -- This Inserts a new movie into the database.");
  console.log("");
  console.log("   - show");
  console.log("  -- This shows all movies in the database.");
  console.log("");
  console.log("   - update <customer_id> <new_email>");
  console.log("  -- Update the email address of a customer.");
  console.log("");
  console.log("   - remove <customer_id>");
  console.log("  -- Remove a customer and rental history from database.");
  console.log("");
}

/**
 * Runs our CLI app to manage the movie rentals database
 */
async function runCLI() {
  await createTable();

  const args = process.argv.slice(2);
  switch (args[0]) {
    case "insert":
      if (args.length !== 5) {
        printHelp();
        return;
      }
      await insertMovie(args[1], parseInt(args[2]), args[3], args[4]);
      break;
    case "show":
      await displayMovies();
      break;
    case "update":
      if (args.length !== 3) {
        printHelp();
        return;
      }
      await updateCustomerEmail(parseInt(args[1]), args[2]);
      break;
    case "remove":
      if (args.length !== 2) {
        printHelp();
        return;
      }
      await removeCustomer(parseInt(args[1]));
      break;
    default:
      printHelp();
      break;
  }
}

runCLI();
