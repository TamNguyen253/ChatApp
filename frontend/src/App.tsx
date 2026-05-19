import { BrowserRouter, Routes, Route } from "react-router";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ChatAppPage from "./pages/ChatAppPage";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
    return (
        <>
            <Toaster richColors />
            <BrowserRouter>
                <Routes>
                    {/* public routes */}
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage />} />

                    {/* protected routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<ChatAppPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
