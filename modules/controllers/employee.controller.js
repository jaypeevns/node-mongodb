import { employeeModel } from "../models/employee.model.js";
import httpStatus from "../utils/httpStatus.js";

const employeeController = {};

employeeController.addEmployee = async (req, res, next) => {
  employeeModel
    .find({ email: req.body.email })
    .exec()
    .then(async (employee) => {
      if (employee.length >= 1) {
        return res.status(httpStatus.CONFLICT).json({
          message: "Mail exists"
        });
      } else {
        const newUser = await employeeModel.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          employeeId: req.body.employeeId,
          email: req.body.email,
          country: req.body.country,
          phone: req.body.phone,
        });
        let {...employee } = newUser.toObject();
        return res.status(httpStatus.CREATED).json({ data: { employee } });
      }
    });
};

employeeController.allEmployess = async (req, res) => {
  try {
    let employees = await employeeModel.find();
    return res.json(employees);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

employeeController.findByEmployeeId = async (req, res) => {
  try {
    let employee = await employeeModel.findOne({employeeId: req.params.employeeId });
    if (!employee) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Employee not found" });
    }
    return res.json(employee);
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.toString() });
  }
};

employeeController.updateByEmployeeId = async (req, res) => {
  try {
    let employee = await employeeModel.findOneAndUpdate({employeeId: req.params.employeeId },
      { $set: { "email" : "jay@gmail.com"}});
    if (!employee) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Employee not found" });
    }
    Object.assign(employee, req.body);
    await employee.save();
    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

employeeController.deleteByEmployeeId = async (req, res) => {
  try {
    let employee = await employeeModel.findOneAndDelete({employeeId: req.params.employeeId });
    if (!employee) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Employee not found" });
    }
    return res.json({ message: "Employee deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
};

export default employeeController;
