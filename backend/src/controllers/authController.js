import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Session from "../models/Session.js";
import crypto from "crypto";

const ACCESS_TOKEN_TTL = "30m";
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000; // 14 ngày theo ms

export const signUp = async (req, res) => {
    try {
        const { username, password, email, firstname, lastname } = req.body;

        if (!username || !password || !email || !firstname || !lastname) {
            return res.status(400).json({
                message: "Không thể thiếu username, password, email, firstname, lastname",
            });
        }

        // kiểm tra username có tồn tại chưa
        const duplicate = await User.findOne({ username });

        if (duplicate) {
            return res.status(409).json({ message: "username đã tồn tại" });
        }

        // mã hóa password
        const hashedPassword = await bcrypt.hash(password, 10); // salt = 10

        // tạo user mới
        await User.create({
            username,
            hashedPassword,
            email,
            displayName: `${firstname} ${lastname}`,
        });

        //return
        return res.sendStatus(204);
    } catch (error) {
        console.error("Lỗi khi gọi signUp", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const signIn = async (req, res) => {
    try {
        // lấy data từ input client
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Thiếu username hoặc password" });
        }

        // tìm user bằng username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "username hoặc pass word không chính xác" });
        }

        // so sánh hashedPassword trong db vs password input
        const correctPassword = await bcrypt.compare(password, user.hashedPassword);

        if (!correctPassword) {
            return res.status(401).json({ message: "username hoặc password không chính xác" });
        }

        // nếu khớp -> tạo accessToken với JWT
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_TTL,
        });

        // tạo refreshToken
        const refreshToken = crypto.randomBytes(64).toString("hex");

        // tạo session mới để lưu refreshToken
        await Session.create({
            userId: user._id,
            refreshToken,
            expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL),
        });

        // trả refreshToken về client trong cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none", // frontend, backend deploy riêng
            maxAge: REFRESH_TOKEN_TTL,
        });

        // trả accessToken về client trong response
        return res.status(200).json({ message: `User ${user.username} đã logged in`, accessToken });
    } catch (error) {
        console.error("Lỗi khi gọi signIn", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const signOut = async (req, res) => {
    try {
        // lấy refresh token từ cookie
        const token = req.cookies?.refreshToken;

        if (token) {
            // xóa refresh token trong Session
            await Session.deleteOne({ refreshToken: token });

            // xóa cookie ở client
            res.clearCookie("refreshToken");
        }

        return res.sendStatus(204);
    } catch (error) {
        console.error("Lỗi khi gọi signOut", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};
