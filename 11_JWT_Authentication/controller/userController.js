import httpError from "../middleware/httpError.js";
import userModel from "../model/userModel.js";

//user add 

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

//get all user

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

//loggin user

const loggin = async (req, res, next) => {
  try {
    const { Email, password } = req.body;

    const user = await userModel.findByCredentials(Email, password);

    const token = await user.generateAuthToken();

    res.status(200).json({
      success: true,
      message: "user login successful",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    next(new httpError(error.message, 500));
  }
};

const AuthLoggin = async function (req, res, next) {
  try {
    const user = req.user;

    if (!user) {
      return next(new httpError("unable to login", 401));
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(new httpError(error.message));
  }
};

//logout user

const logout = async function (req, res, next) {
  try {
    req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);

    await req.user.save();

    // console.log("logout 1 - ", req.user);
    // console.log("logout 2 - ", req.user.tokens);
    // console.log("logout 3 - ", req.user.token);

    res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

//logout from all device

const logutAll = async function (req, res, next) {
  try {
    req.user.tokens = [];

    await req.user.save();

    res
      .status(200)
      .json({ success: true, message: "logout from all Successfully" });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

//update user data

const UpdateUser = async function (req, res, next) {
  try {
    const user = req.user;

    if (!user) {
      return next(new httpError("No user found", 400));
    }

    const updates = Object.keys(req.body);

    // console.log("1 updates ",updates)

    const AllowedField = ["name", "password"];

    // console.log("2 allowedfield",AllowedField)

    const isValid = updates.every((fields) => AllowedField.includes(fields));

    // console.log("3 isvalid ",isValid)

    if (!isValid) {
      return next(new httpError("Only allowed fields can be updated", 400));
    }

    updates.forEach((update) => {
      return (user[update] = req.body[update]);
    });

    // console.log("4 updates",updates)

    await user.save();

    res.status(200).json({ success: true, message: "user data updated", user });
  } catch (error) {
    next(new httpError(error.message, 500));
  }
};

//delete user

const DeleteUser = async function (req, res, next) {
  try {
    const user = req.user;

    // console.log("delete 1 - ",user)

    await user.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "user deleted successfully" });
  } catch (error) {
    next(new httpError(error.message));
  }
};

export default {
  Add,
  GetAllUser,
  loggin,
  AuthLoggin,
  logout,
  logutAll,
  UpdateUser,
  DeleteUser,
};
