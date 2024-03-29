import mysql from "mysql2/promise";
export const getConnection = async () =>
  await mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3307,
    password: "example",
    database: "posts",
  });

interface ExecuteQueryTypes {
  query: string;
  values?: any[];
}

export default async function executeQuery({
  query,
  values,
}: ExecuteQueryTypes) {
  try {
    const connection = await getConnection();
    const [rows, fields] = await connection.execute(query, values);
    await connection.end();
    return rows;
  } catch (error) {
    return { error };
  }
}
