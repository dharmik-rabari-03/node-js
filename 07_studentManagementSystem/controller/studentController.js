import express from "express";
import httpError from "../middlewares/httpError.js";
import student from "../model/student.js";

async function AddStudent(req, res, next) {
  try {
    const { name, GRid, course, MobileNumber } = req.body;

    const NewStudent = await new student({
      name,
      GRid,
      course,
      MobileNumber,
    });

    await NewStudent.save();

    res
      .status(201)
      .json({ success: true, message: "student added", NewStudent });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
}

async function getAllStudent(req, res, next) {
  try {
    const AllStudentsData = await student.find();

    if (AllStudentsData.length <= 0) {
      res
        .status(404)
        .json({ success: true, message: "no students data found" });
    }

    res.status(200).json({
      success: true,
      message: "student data found",
      total: AllStudentsData.length,
      AllStudentsData,
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
}

async function StudentFind(req, res, next) {
  try {
    const id = req.params.id;

    const studentWithId = await student.findById(id);

    if (!studentWithId) {
      res
        .status(404)
        .json({ success: false, message: "no student found with this id" });
    }

    res
      .status(200)
      .json({ succces: true, message: "student found", studentWithId });
  } catch (error) {
    next(new httpError("invalid id", 404));
  }
}

async function Delete(req, res, next) {
  try {
    const id = req.params.id;

    const find = await student.findByIdAndDelete(id);

    if (!find) {
      return res
        .status(404)
        .json({ succces: false, message: "student not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "student delated succesfully" });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
}

async function updateManually(req, res, next) {
  try {
    const { id } = req.params;

    const studentFind = await student.findById(id);

    if (!studentFind) {
  return next(new httpError("student not found", 404));
}

    const updates = Object.keys(req.body);

    const allowedField = ["name", "MobileNumber"];

    const isValidUpdate = updates.every((field) => {
      return allowedField.includes(field);
    });

    if (!isValidUpdate) {
      return next(new httpError("only allowed field can be change", 400));
    }

    updates.forEach((update) => {
      studentFind[update]= req.body[update];
    });

    await studentFind.save();

    res.status(200).json({
      message: "student data updated successfully",
      studentFind,
    });
  } catch (error) {
    next(new httpError(error.message, 400));
  }
}

async function updateById(req, res, next) {
  const id = req.params.id;

  const findStudent = await student.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!findStudent) {
    return next(new httpError("no student found with this id", 404));
  }

  res.status(200).json({
    succces: true,
    message: "student data update successfully",
    findStudent,
  });
}

async function DeleteAll(req, res, next) {
  try {
    const deleteAllStudent = await student.deleteMany({});

    res
      .status(200)
      .json({ succces: true, message: "all student delete successfully" });
  } catch (error) {
    next(new httpError(error.message));
  }
}

export default {
  AddStudent,
  getAllStudent,
  Delete,
  StudentFind,
  updateById,
  DeleteAll,
  updateManually,
};
