import express from "express";
import employee from "../model/employeeModel.js";
import httpError from "../middleware/httpError.js";

const add = async function (req, res, next) {
  try {
    const { name, salary, EmployeeId, email, field, phoneNumber } = req.body;

    const newEmployee = new employee({
      name,
      salary,
      EmployeeId,
      email,
      field,
      phoneNumber,
    });

    await newEmployee.save();

    res.status(201).json({
      success: true,
      message: "new employee added successfully",
      newEmployee,
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const AllEmployee = async function (req, res, next) {
  try {
    const { id } = req.params;

    const employeeFind = await employee.find(id);

    res.status(200).json({
      success: true,
      total: employeeFind.length,
      message: "employee found",
      employeeFind,
    });
  } catch (error) {
    next(new httpError(error.message));
  }
};

const EmployeeById = async function (req, res, next) {
  try {
    const { id } = req.params;

    const employeeFind = await employee.findById(id);

    if (employeeFind.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "employee not found" });
    }

    res.status(200).json({
      success: true,
      total: employeeFind.length,
      message: "employee found",
      employeeFind,
    });
  } catch (error) {
    next(new httpError(error.message));
  }
};

const Delete = async function (req, res, next) {
  try {
    const { id } = req.params;

    const employeeFind = await employee.findByIdAndDelete(id);

    if (!employeeFind) {
      return res
        .status(404)
        .json({ success: false, message: "employee not found with this id" });
    }

    res.status(200).json({
      success: true,
      message: "employee deleted successfully",

    });
  } catch (error) {
    next(new httpError(error.message));
  }
};

const updates = async function (req, res, next) {
  try {
    const { id } = req.params;

    const updateEmployee = await employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateEmployee) {
      return res
        .success(404)
        .json({ success: false, message: "no found with this id" });
    }

    res
      .status(200)
      .json({ success: true, message: "updated succefully", updateEmployee });
  } catch (error) {
    next(new httpError(error.message));
  }
};

export default { add, AllEmployee, EmployeeById, Delete, updates };
