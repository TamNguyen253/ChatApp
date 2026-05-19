import { SignupForm } from "@/components/auth/signup-form";

const SignUpPage = () => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-dot-pattern w-full">
            <div className="w-full max-w-sm md:max-w-4xl">
                <SignupForm />
            </div>
        </div>
    );
};

export default SignUpPage;
