import express from "express";
import employeeController from "../controllers/employee.controller.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

const empRoutes = express.Router();
empRoutes.get("/", function(req, res, next) {
  res.json({ message: "from index api" });
});

// Create
empRoutes.post("/addEmployee", asyncWrapper(employeeController.addEmployee));

// GetAll Data
empRoutes.get("/employees", asyncWrapper(employeeController.allEmployess));

// Get By Employee ID
empRoutes.get("/employees/:employeeId", asyncWrapper(employeeController.findByEmployeeId));

// update by Employee ID
empRoutes.put("/employees/:employeeId", asyncWrapper(employeeController.updateByEmployeeId));

// Delete By Employee ID
empRoutes.delete("/employees/:employeeId", asyncWrapper(employeeController.deleteByEmployeeId));

export default empRoutes ;