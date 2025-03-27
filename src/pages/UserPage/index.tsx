import { Outlet } from "react-router-dom";
import Footer from "./_components/AppFooter";
import Header from "./_components/AppHeader";

const UserPage: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 pt-20">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default UserPage;
