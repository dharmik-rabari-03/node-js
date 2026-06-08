import Packages from "../model/package.js";
import HttpError from "../middlewares/HttpError.js";
import httpError from "../middlewares/HttpError.js";

const add = async (req, res, next) => {
  try {
    const { packageName, packagePrice, location, description, duration } =
      req.body;

    if (!packageName || !packagePrice || !location || !duration) {
      return next(new HttpError("all the fields are required", 400));
    }

    const newPackage = new Packages({
      packageName,
      packagePrice,
      location,
      description,
      duration,
      image: req.file?.path || "",
    });

    await newPackage.save();

    res.status(201).json({
      success: true,
      message: "new package added",
      newPackage,
    });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

const GetAllPackage = async (req, res, next) => {
  try {
    const Package = await Packages.find();

    if (Package.length <= 0) {
      return res
        .status(404)
        .json({ success: false, message: "no package found" });
    }

    res.status(200).json({ success: true, message: "package found", Package });
  } catch (error) {
    throw next(new httpError(error.message));
  }
};

const GetById = async (req, res, next) => {
  try {
    const {id}=req.params
    const Package = await Packages.findById(id);

    if (!Package) {
      return res
        .status(404)
        .json({ success: false, message: "package not found" });
    }

    res.status(200).json({ success: true, message: "package found", Package });
  } catch (error) {
    throw next(new httpError(error.message));
  }
};

export default { add ,GetAllPackage,GetById};
