import mysql from "mysql2";
export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "example",
  database: "blogs",
});

connection.connect((err) => {
  if (err) {
    console.error("Connection failed to MySQL: ", err);
    return;
  }

  console.log("Successful connection to MySQL server");
});

// connection.query("SELECT * FROM posts;", (err, results) => {
//   if (err) {
//     console.error("Connection failed to MySQL: ", err);
//     return;
//   }
//   console.log(results);
//   connection.end((err) => {
//     if (err) {
//       console.error("Error closing connection: ", err);
//       return;
//     }
//     console.log("connection closed");
//   });
// });

// export async function getElements() {
//   connection.query("SELECT * FROM posts;", (err, results) => {
//     if (err) {
//       console.error("Connection failed to MySQL: ", err);
//       return;
//     }
//     console.log(results);
//     connection.end((err) => {
//       if (err) {
//         console.error("Error closing connection: ", err);
//         return;
//       }
//       console.log("connection closed");
//     });
//   });
// }
