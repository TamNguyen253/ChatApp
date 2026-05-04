import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log("Kết nối DB thành công");
    } catch (error) {
        console.log("Lỗi khi kết nối DB", error);
        process.exit(1); // dừng khi ko kết nối đc db
    }
};
