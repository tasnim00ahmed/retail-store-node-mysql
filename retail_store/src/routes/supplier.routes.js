import express from "express";
import db from "../config/db.js";

const router = express.Router();

//6- a)Add a supplier with the name 'FreshFoods' and contact number '01001234567'.:
router.post("/", async (req, res) => {
  await db.execute(`
    INSERT INTO Suppliers (SupplierName, ContactNumber)
    VALUES ('FreshFoods','01001234567')
  `);
  res.send("Supplier inserted");
});
//11- Find suppliers with names starting with 'F'.
router.get("/starts-with-f", async (req, res) => {
  const [rows] = await db.execute(`
    SELECT * FROM Suppliers WHERE SupplierName LIKE 'F%'
  `);
  res.json(rows);
});

export default router;
