import httpError from "../middleware/httpError.js";
import userModel from "../model/userModel.js";

const Add = async (req, res, next) => {
  try {
    const { name, Email, password } = req.body;

    if (!name || !Email || !password) {
      return next(new httpError("all field are required", 400));
    }

    const newUser = new userModel({
      name,
      Email,
      password,
    });

    await newUser.save();

    res.status(200).json({ success: true, message: "new user added", newUser });
  } catch (error) {
    return next(new httpError(error.message, 500));
  }
};

const GetAllUser = async (req, res, next) => {
  try {
    const findUser = await userModel.find();

    if (findUser.length === 0) {
      return next(new httpError("no user found", 404));
    }

    res.status(200).json({
      success: true,
      message: "user data found",
      total: findUser.length,
      findUser,
    });
  } catch (error) {
    next(new httpError(error.message));
  }
};

const loggin = async (req, res, next) => {
  try {
    const { Email, password } = req.body;
    const users = await userModel.findByCredentials(Email, password);

    if (!users) {
      next(new httpError("unable to loggin", 400));
    }

    res
      .status(200)
      .json({ success: true, message: "user login succesfull", users });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

export default { Add, GetAllUser,loggin };
