const mysql = require("mysql2");
const DB_NAME = "posts";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3307,
  password: "example",
  database: "posts",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }

  console.log("Connected to MySQL server");

  // Create the database if it doesn't exist
  // const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${DB_NAME};`;
  // connection.query(createDatabaseQuery, (createDatabaseError) => {
  //   if (createDatabaseError) {
  //     console.error("Error creating database:", createDatabaseError);
  //     connection.end();
  //     return;
  //   }

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
          post_id INT AUTO_INCREMENT PRIMARY KEY,
          image_url VARCHAR(255) NOT NULL,
          title VARCHAR(255) NOT NULL,
          context TEXT NOT NULL
        )
        `;

    createTable("posts", createPostsTableQuery);

    const createCommentsTableQuery = `
        CREATE TABLE IF NOT EXISTS comments (
            comment_id INT AUTO_INCREMENT PRIMARY KEY,
            author_name VARCHAR(255) NOT NULL,
            comment_context TEXT NOT NULL,
            post_id INT NOT NULL,
            FOREIGN KEY (post_id) REFERENCES posts(post_id)
        )
        `;

    createTable("comments", createCommentsTableQuery);

    const createTagsTableQuery = `
        CREATE TABLE IF NOT EXISTS tags (
            tag_id INT AUTO_INCREMENT PRIMARY KEY,
            tags_name VARCHAR(255) NOT NULL
        )
        `;

    createTable("tags", createTagsTableQuery);

    const createPostTagsTableQuery = `
        CREATE TABLE IF NOT EXISTS post_tags (
            post_id INT,
            tag_id INT,
            PRIMARY KEY (post_id, tag_id),
            FOREIGN KEY (post_id) REFERENCES posts(post_id),
            FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
        )
        `;

    createTable("post_tags", createPostTagsTableQuery);

    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            login_email VARCHAR(255),
            password VARCHAR(255)
        )
        `;

    createTable("users", createUsersTableQuery);

    // Execute the query to create the table
    // connection.query(
    //   createPostsTableQuery,
    //   (createTableError, createTableResults) => {
    //     if (createTableError) {
    //       console.error("Error creating table:", createTableError);
    //       connection.end();
    //       return;
    //     }
    //
    //     console.log('Table "posts" created or already exists');

    // Define the SQL query to insert data into the table
    // const insertDataQuery = `
    //   INSERT INTO movies (name, email) VALUES
    //     ('John Doe', 'john@example.com'),
    //     ('Jane Doe', 'jane@example.com'),
    //     ('Bob Smith', 'bob@example.com')
    // `;
    //
    // // Execute the query to insert data
    // connection.query(insertDataQuery, (insertDataError, insertDataResults) => {
    //   if (insertDataError) {
    //     console.error('Error inserting data:', insertDataError);
    //   } else {
    //     console.log('Data inserted or already exists');
    //   }
    //
    //   // Close the connection
    //   connection.end();
    // });
  });
});
// });
