import express from "express";
import db from "../config/db.js";

const router = express.Router();
//6- c)Record a sale of 2 units of 'Milk' on '2025-05-20'.  
router.post("/", async (req, res) => {
  await db.execute(`
    INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
    VALUES (4,2,'2025-05-20')
  `);
  res.send("Sale inserted");
});
// 9- Retrieve the total quantity sold for each product.
router.get("/total-sold", async (req, res) => {
  const [rows] = await db.execute(`
    SELECT p.ProductName, SUM(s.QuantitySold) AS TotalSold
    FROM Products p
    JOIN Sales s ON p.ProductID = s.ProductID
    GROUP BY p.ProductName
  `);
  res.json(rows);
});
//13- Get all sales along with product name and sale date.
router.get("/details", async (req, res) => {
  const [rows] = await db.execute(`
    SELECT p.ProductName, s.SaleDate
    FROM Sales s
    JOIN Products p ON s.ProductID = p.ProductID
  `);
  res.json(rows);
});

export default router;
