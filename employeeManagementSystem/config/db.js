import mongoose from "mongoose";

async function connectdb() {
  try {
    const connect = await mongoose.connect("mongodb://127.0.0.1:27017/employee");

    console.log("db is conect");

    return connect;
  } catch (error) {
    throw new Error(error.message);
  }
}



export default connectdb;

