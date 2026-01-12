import HomePage from "@/views/home/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "หน้าแรก",
  description: "แสดงภาพรวมของระบบ",
};

const Home = async () => {
  return <HomePage />;
};

export default Home;
