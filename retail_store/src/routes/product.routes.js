import express from "express";
import db from "../config/db.js";

const router = express.Router();

//6- b)Insert products
router.post("/", async (req, res) => {
  await db.execute(`
    INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID)
    VALUES
    ('Milk',15,50,1),
    ('Bread',10,30,1),
    ('Eggs',20,40,1)
  `);
  res.send("Products inserted");
});

// 7- Update the price of 'Bread' to 25.00.
router.put("/update-bread", async (req, res) => {
  await db.execute(`
    UPDATE Products SET Price = 25 WHERE ProductName = 'Bread'
  `);
  res.send("Bread updated");
});

// 8- Delete the product 'Eggs'.
router.delete("/delete-eggs", async (req, res) => {
  await db.execute(`
    DELETE FROM Products WHERE ProductName = 'Eggs'
  `);
  res.send("Eggs deleted");
});

// 10- Get the product with the highest stock.
router.get("/highest-stock", async (req, res) => {
  const [rows] = await db.execute(`
    SELECT * FROM Products ORDER BY StockQuantity DESC LIMIT 1
  `);
  res.json(rows);
});

// 12- Show all products that have never been sold.
router.get("/never-sold", async (req, res) => {
  const [rows] = await db.execute(`
    SELECT p.*
    FROM Products p
    LEFT JOIN Sales s ON p.ProductID = s.ProductID
    WHERE s.ProductID IS NULL
  `);
  res.json(rows);
});

export default router;
