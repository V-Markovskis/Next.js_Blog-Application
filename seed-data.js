const mysql = require("mysql2");
const DB_NAME = "posts";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3307,
  password: "example",
  // database: "posts",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }

  console.log("Connected to MySQL server");

  // Create the database if it doesn't exist
  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${DB_NAME};`;
  connection.query(createDatabaseQuery, (createDatabaseError) => {
    if (createDatabaseError) {
      console.error("Error creating database:", createDatabaseError);
      connection.end();
      return;
    }
  });

  // Switch to the created database
  connection.changeUser({ database: DB_NAME }, (changeUserError) => {
    if (changeUserError) {
      console.error("Error switching to database:", changeUserError);
      connection.end();
      return;
    }

    console.log(`Switched to database "${DB_NAME}"`);

    // Execute the query to create the table
    const createTable = (tableName, createTableQuery) => {
      connection.query(createTableQuery, (err) => {
        if (err) {
          console.error(`Error creating '${tableName}' table:`, err);
          connection.end();
        } else {
          console.log(`'${tableName}' table created or already exists`);
        }
      });
    };

    // Define the SQL query to create a table if not exists
    const createPostsTableQuery = `
        CREATE TABLE IF NOT EXISTS posts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          image_url VARCHAR(255) NOT NULL,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL
        )
        `;

    createTable("posts", createPostsTableQuery);

    const createCommentsTableQuery = `
        CREATE TABLE IF NOT EXISTS comments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            author_name VARCHAR(255) NOT NULL,
            comment_context TEXT NOT NULL,
            post_id INT NOT NULL,
            FOREIGN KEY (post_id) REFERENCES posts(id)
        )
        `;

    createTable("comments", createCommentsTableQuery);

    const createTagsTableQuery = `
        CREATE TABLE IF NOT EXISTS tags (
            id INT AUTO_INCREMENT PRIMARY KEY,
            tag_name VARCHAR(255) NOT NULL
        )
        `;

    createTable("tags", createTagsTableQuery);

    const createPostTagsTableQuery = `
        CREATE TABLE IF NOT EXISTS post_tags (
            id INT AUTO_INCREMENT PRIMARY KEY,
            post_id INT,
            tag_id INT,
            FOREIGN KEY (post_id) REFERENCES posts(id),
            FOREIGN KEY (tag_id) REFERENCES tags(id)
        )
        `;

    createTable("post_tags", createPostTagsTableQuery);

    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255),
            password VARCHAR(255)
        )
        `;

    createTable("users", createUsersTableQuery);
  });
});
