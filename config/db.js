import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL);
    const url = `${db.connection.host} : ${db.connection.port}`;
    console.log("MongoDB conectado en:", url);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
