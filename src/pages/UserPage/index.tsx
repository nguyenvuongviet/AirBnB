import { Outlet } from "react-router-dom";
import Header from "./_components/AppHeader";
import Footer from "./_components/AppFooter";

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
