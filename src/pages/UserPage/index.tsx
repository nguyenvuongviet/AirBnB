import { Outlet } from "react-router-dom";
import Footer from "./_components/AppFooter";
import Header from "./_components/AppHeader";

const UserPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserPage;
