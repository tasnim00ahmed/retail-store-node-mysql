import express from "express";

import tableRoutes from "./routes/table.routes.js";
import productRoutes from "./routes/product.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(express.json());

const port = 3000;

app.use("/tables", tableRoutes);
app.use("/products", productRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/sales", salesRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log("Server running on port " + port);
});

