import LoginPage from "@/views/login/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

const Login = () => {
  return <LoginPage />;
};

export default Login;
