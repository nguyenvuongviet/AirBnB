import { Outlet } from "react-router-dom";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const UserPage = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserPage;
