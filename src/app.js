const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const connectDB = require("./config/db");
const swaggerDocs = require("./config/swagger");
const cors = require("cors");
const morgan = require("morgan");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors()); // Thêm middleware CORS
app.use(morgan("dev"));

// Kết nối MongoDB
connectDB();

// Swagger setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Định tuyến cơ bản
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Import routes
const userRoutes = require("./routes/user.routes");
const tagRoutes = require("./routes/tag.routes");
const typeRoutes = require("./routes/type.routes");
const productRoutes = require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");

// Sử dụng routes
app.use("/api/users", userRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/types", typeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
