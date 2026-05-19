import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signInSchema, type SignInFormValues } from "../schemas/SignInSchema";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

export function SigninForm({ className, ...props }: React.ComponentProps<"div">) {
    const { signIn } = useAuthStore();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: SignInFormValues) => {
        const { username, password } = data;
        await signIn(username, password);
        navigate("/");
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={cn("flex flex-col gap-6 ", className)} {...props}>
            <Card className="p-0 overflow-hidden shadow-lg">
                <CardContent className="grid p-0 md:grid-cols-2 ">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-3">
                            {/* header - logo */}
                            <div className="space-y-3">
                                <a href="/" className="block mx-auto w-fit">
                                    <img src="/logo.svg" alt="logo" className="h-10" />
                                </a>
                                <h1>Chào mừng bạn quay lại</h1>
                                <p className="text-muted-foreground text-balance text-center">
                                    Đăng nhập tài khoản ChatApp
                                </p>
                            </div>

                            {/* username */}
                            <div className="grid grid-cols-1 space-y-2">
                                <Label htmlFor="username">Tên đăng nhập</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Ronaldo"
                                    {...register("username")}
                                />

                                <p
                                    className={cn(
                                        "text-destructive text-sm text-left transition-all",
                                        errors.username ? "opacity-100" : "opacity-0",
                                    )}
                                >
                                    {errors.username?.message || "place"}
                                </p>
                            </div>

                            {/* password */}
                            <div className="relative grid grid-cols-1 space-y-2">
                                <Label htmlFor="password">Mật khẩu</Label>
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    {...register("password")}
                                />

                                {/* show password button */}
                                <Button
                                    className="absolute right-3 top-5 mt-0.5 transition-all"
                                    variant="trailing"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </Button>

                                <p
                                    className={cn(
                                        "text-destructive text-sm text-left transition-all",
                                        errors.password ? "opacity-100" : "opacity-0",
                                    )}
                                >
                                    {errors.password?.message || "place"}
                                </p>
                            </div>

                            {/* signin button */}
                            <Button
                                type="submit"
                                className="flex items-center cursor-pointer"
                                disabled={isSubmitting}
                            >
                                Đăng nhập
                            </Button>

                            <div className="">
                                Bạn chưa có tài khoản?{" "}
                                <a
                                    href="/signup"
                                    className="underline underline-offset-5 hover:text-blue-800 font-bold"
                                >
                                    Đăng ký
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="/signin_signup.svg"
                            alt="Image"
                            className="top-1/2 -translate-y-1/2 absolute object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-muted-foreground px-6 text-sm text-center text-balance *:[a]:hover:text-blue-700 *:[a]:underline underline-offset-4">
                Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
                <a href="#">Chính sách bảo mật</a> của chúng tôi
            </div>
        </div>
    );
}
