import { z } from "zod";

export const signUpSchema = z
    .object({
        firstname: z
            .string()
            .trim()
            .min(1, "Tên phải có ít nhất 2 ký tự")
            .max(50, "Tên không được vượt quá 50 ký tự")
            .regex(/^[A-Za-zÀ-ỹ\s]+$/, "Tên chỉ được chứa chữ cái và khoảng trắng"),

        lastname: z
            .string()
            .trim()
            .min(1, "Họ phải có ít nhất 2 ký tự")
            .max(50, "Họ không được vượt quá 50 ký tự")
            .regex(/^[A-Za-zÀ-ỹ\s]+$/, "Họ chỉ được chứa chữ cái và khoảng trắng"),

        username: z
            .string()
            .trim()
            .min(3, "Tên đăng nhập phải có ít nhất 5 ký tự")
            .max(20, "Tên đăng nhập không được vượt quá 20 ký tự")
            .regex(/^[a-zA-Z0-9_]+$/, "Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới (_)"),

        email: z
            .email({
                message: "Email không hợp lệ",
            })
            .trim()
            .toLowerCase(),

        password: z
            .string()
            .min(6, "Mật khẩu phải có ít nhất 8 ký tự")
            .max(100, "Mật khẩu không được vượt quá 100 ký tự")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
                "Mật khẩu phải chứa chữ hoa, chữ thường, số và ký tự đặc biệt",
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Mật khẩu xác nhận không khớp",
    });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
