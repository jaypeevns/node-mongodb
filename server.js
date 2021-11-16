import express from "express";
import connectMongoDB from "./modules/mongoConfig/mongodb.client.js"
import employeeRoutes from "./modules/routes/employee.routes.js"

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connecting Mongo
connectMongoDB();

app.use("/", employeeRoutes);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});