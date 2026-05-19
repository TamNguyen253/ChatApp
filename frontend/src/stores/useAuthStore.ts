import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    clearState: () => {
        set({ accessToken: null, user: null, loading: false });
    },

    signUp: async (username, password, email, firstname, lastname) => {
        try {
            set({ loading: true });

            // gọi api
            await authService.signUp(username, password, email, firstname, lastname);

            toast.success("Đăng ký tài khoản thành công!");
        } catch (error) {
            console.error(error);
            toast.error("Đăng ký không thành công");
        } finally {
            set({ loading: false });
        }
    },

    signIn: async (username, password) => {
        try {
            set({ loading: true });

            const { accessToken } = await authService.signIn(username, password);
            set({ accessToken });

            toast.success("Đăng nhập thành công");
        } catch (error) {
            console.error(error);
            toast.error("Tên đăng nhập hoặc mật khẩu không chính xác");
        }
    },

    signOut: async () => {
        try {
            get().clearState();
            await authService.signOut();
            toast.success("Đăng xuất thành công");
        } catch (error) {
            console.error(error);
            toast.error("Lỗi xảy ra khi đăng xuất. Hãy thử lại");
        }
    },
}));
