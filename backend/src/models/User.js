import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true, // có unique thì mongodb sẽ tạo index
            trim: true,
            lowercase: true,
        },
        hashedPassword: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        displayName: {
            type: String,
            required: true,
            trim: true,
        },
        avatarUrl: {
            type: String, // link CDN để hiển thị hình
        },
        avatarId: {
            type: String, // Cloudinary public_id để xóa hình
        },
        bio: {
            type: String,
            maxlength: 500, // giới hạn 500 ký tự
        },
        phone: {
            type: String,
            sparse: true, // cho phép null, nhưng nếu có giá trị thì ko đc trùng
        },
    },
    {
        // config
        timestamps: true, // mongo sẽ tự thêm createdAt và updatedAt
    },
);

const User = mongoose.model("User", userSchema);
export default User;
