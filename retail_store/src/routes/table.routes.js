import express from "express";
import db from "../config/db.js";

const router = express.Router();

// 1- Create the required tables for the retail store database:
router.post("/create", async (req, res) => {
  try {
    await db.execute(`
      CREATE TABLE Suppliers (
        SupplierID INT AUTO_INCREMENT PRIMARY KEY,
        SupplierName VARCHAR(255),
        ContactNumber VARCHAR(50)
      )
    `);

    await db.execute(`
      CREATE TABLE Products (
        ProductID INT AUTO_INCREMENT PRIMARY KEY,
        ProductName VARCHAR(255),
        Price DECIMAL(10,2),
        StockQuantity INT,
        SupplierID INT,
        FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
      )
    `);

    await db.execute(`
      CREATE TABLE Sales (
        SaleID INT AUTO_INCREMENT PRIMARY KEY,
        ProductID INT,
        QuantitySold INT,
        SaleDate DATE,
        FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
      )
    `);

    res.send("Tables created");
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2- Add Category
router.put("/add-category", async (req, res) => {
  await db.execute(`ALTER TABLE Products ADD Category VARCHAR(100)`);
  res.send("Category added");
});

// 3- Remove Category
router.put("/remove-category", async (req, res) => {
  await db.execute(`ALTER TABLE Products DROP COLUMN Category`);
  res.send("Category removed");
});

// 4- Modify ContactNumber
router.put("/modify-contact", async (req, res) => {
  await db.execute(`
    ALTER TABLE Suppliers MODIFY ContactNumber VARCHAR(15)
  `);
  res.send("ContactNumber modified");
});

// 5- NOT NULL ProductName
router.put("/product-not-null", async (req, res) => {
  await db.execute(`
    ALTER TABLE Products MODIFY ProductName VARCHAR(255) NOT NULL
  `);
  res.send("NOT NULL added");
});

export default router;
