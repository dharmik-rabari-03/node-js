import Packages from "../model/package.js";
import HttpError from "../middlewares/HttpError.js";
import cloudinary from "../config/cloudinary.js"
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
      image: req.file?.path,
      cloudinary_id: req.file.filename
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
    const { id } = req.params
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

const DeletePackage = async (req, res, next) => {

  try {

    const id = req.params.id

    const PackageDelete = await Packages.findById(id)

    if (!PackageDelete) {
      return res.status(404).json({ succes: false, message: "no package found" })
    }

    await cloudinary.uploader.destroy(PackageDelete.cloudinary_id)
    await PackageDelete.deleteOne()

    res.status(200).json({ success: true, message: "package deleted successfully" })
  } catch (error) {
    next(new httpError(error.message))
  }

}

const UpdatePackage = async (req, res, next) => {
  try {


    const id = req.params.id

    const updatesPackage = await Packages.findById(id)

    if (!updatesPackage) {
      return res.status(404).json({ success: false, message: "failed to update" })

    }

    const update = Object.keys(req.body)

    const allowed = ["packageName", "packagePrice", "location", "description", "duration"]

    const isAllowed = update.every((field) => 
      allowed.includes(field)
    )

    if (!isAllowed) {
      return next(new httpError("only allowed field can be updated", 400))
    }

    update.forEach((update) => {
       updatesPackage[update] = req.body[update]
    })

   if(req.file){
     await cloudinary.uploader.destroy(updatesPackage.cloudinary_id);

    updatesPackage.image = req.file?.path;
    updatesPackage.cloudinary_id = req.file.filename;
   }


    await updatesPackage.save()

    res.status(200).json({ succes: true, message: "package updated successfully", updatesPackage })
  } catch (error) {
    next(new httpError(error.message, 500))
  }

}

export default { add, GetAllPackage, GetById, DeletePackage ,UpdatePackage};
