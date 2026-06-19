import express from "express";
import packages from "../model/destinovaModel.js";
import httpError from "../middlewares/httpError.js";
import cloudinary from "../config/cloudinary.js";

const add = async function (req, res, next) {
  try {
    const { packageName, Date, PackageType, packagePrice } = req.body;

    if (!packageName || !Date || !PackageType || !packagePrice) {
      return next(new httpError("all field are required", 400));
    }

    const Newpackage = new packages({
      packageName,
      Date,
      PackageType,
      packagePrice,
      image: req.file?.path,
      cloudinaryid: req.file.filename,
    });

    await Newpackage.save();

    res.status(201).json({
      success: true,
      message: "Package added successfully",
      data: Newpackage,
    });
  } catch (error) {
    next(new httpError(error.message));
  }
};

const getAll = async function (req, res, next) {
  try {
    const find = await packages.find();

    if (find.length === 0) {
      return next(new httpError("no package found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "package found", Data: find });
  } catch (error) {
    next(new httpError(error.message));
  }
};

const getById = async function (req, res, next) {
  try {
    const id = req.params.id;
    const find = await packages.findById(id);

    if (!find) {
      return next(new httpError("no package found", 404));
    }

    res
      .status(200)
      .json({ success: true, message: "package found", Data: find });
  } catch (error) {
    next(new httpError(error.message));
  }
};

const deletepackage = async function (req, res, next) {
  try {
    const { id } = req.params;

    const find = await packages.findById(id);

    if (!find) {
      return next(new httpError("No package found", 404));
    }
    await cloudinary.uploader.destroy(find.cloudinaryid);
    await find.deleteOne();

    res.status(200).json({
      success: true,
      message: "Package deleted successfully",
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

const updatePackage = async function (req, res, next) {
  try {
    const { id } = req.params;

    const updatePackages = await packages.findById(id);

    if (!updatePackages) {
      return next(new httpError("No package found", 404));
    }

    const update = Object.keys(req.body);

    const allowedField = [
      "packageName",
      "Date",
      "PackageType",
      "packagePrice",
      "image",
    ];
    const isAllowed = update.every((field) => allowedField.includes(field));

    if (!isAllowed) {
      return next(new httpError("only allowed field can be updated", 400));
    }

    update.forEach((update) => {
      updatePackages[update] = req.body[update];
    });

    if (req.file) {
      await cloudinary.uploader.destroy(updatePackages.cloudinaryid);

      updatePackages.image = req.file?.path;
      updatePackages.cloudinaryid = req.file.filename;
    }

    await updatePackages.save();

    res.status(200).json({
      success: true,
      message: "package updated succesfully",
      date: updatePackages,
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

export default { add, getAll, getById, deletepackage, updatePackage };
