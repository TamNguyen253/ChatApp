import { z } from "zod";

export const signInSchema = z.object({
    username: z.string().trim().min(1, "Vui lòng nhập tên đăng nhập"),

    password: z.string().min(1, "Vui lòng nhập mật khẩu"),
});
export type SignInFormValues = z.infer<typeof signInSchema>;
