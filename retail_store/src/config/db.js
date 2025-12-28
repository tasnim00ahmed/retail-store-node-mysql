import mysql from "mysql2/promise";

const db = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'RetailStoreDB'
});
console.log("Database Connected");

export default db;