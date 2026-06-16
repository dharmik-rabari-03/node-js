import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userScema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: (value) => {
        if (value.toLowerCase() === "password") {
          throw new Error("password can't set as a password word");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

//for encryption the password

userScema.pre("save", async function () {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

//loggin

userScema.statics.findByCredentials = async function (Email, password) {
  try {
    const user = await this.findOne({ Email });

    if (!user) {
      throw new Error("unable to loggin");
    }

    const IsMatched = await bcrypt.compare(password, user.password);

    if (!IsMatched) {
      throw new Error("unable to loggin");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//auth Token

userScema.methods.generateAuthToken = async function () {
  try {
    const user = this;

    console.log("JWT_SECRET =", process.env.JWT_SECRET);

    const token = JWT.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    console.log("Generated token =", token);

    if (!token) {
      throw new Error("failed to generate token");
    }

    user.tokens = user.tokens.concat({ token });

    await user.save();

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};

const usermodel = mongoose.model("user", userScema);

export default usermodel;
