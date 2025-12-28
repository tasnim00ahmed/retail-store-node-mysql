import express from "express";
import db from "../config/db.js";

const router = express.Router();

//14- Create a user “store_manager” and give them SELECT, INSERT, and UPDATE permissions on all tables
router.post("/create", async (req, res) => {
  await db.execute(`
    CREATE USER 'store_manager'@'localhost' IDENTIFIED BY '1234'
  `);
  await db.execute(`
    GRANT SELECT, INSERT, UPDATE ON RetailStoreDB.* TO 'store_manager'@'localhost'
  `);
  res.send("User created");
});

//15- Revoke UPDATE permission from “store_manager”.
router.put("/revoke-update", async (req, res) => {
  await db.execute(`
    REVOKE UPDATE ON RetailStoreDB.* FROM 'store_manager'@'localhost'
  `);
  res.send("UPDATE revoked");
});


//16- Grant DELETE permission to “store_manager” only on the Sales table.
router.put("/grant-delete-sales", async (req, res) => {
  await db.execute(`
    GRANT DELETE ON RetailStoreDB.Sales TO 'store_manager'@'localhost'
  `);
  res.send("DELETE granted");
});

export default router;
