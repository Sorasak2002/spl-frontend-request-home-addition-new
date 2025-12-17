import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { ChildrenType } from "@/utils/types";

const Layout = async ({ children }: ChildrenType) => {
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default Layout;
