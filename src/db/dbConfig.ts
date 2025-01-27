import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongodb connected ");
    });
    connection.on("error", (err) => {
      console.log("error in connecting mongo connection:" + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong to connect db connection");
    console.log(error);
  }
}
