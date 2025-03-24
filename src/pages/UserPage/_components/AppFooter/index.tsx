import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Footer className="text-center bg-gray-900 text-white py-6">
      <p className="text-sm">
        © {new Date().getFullYear()} AirBnB Clone. All rights reserved.
      </p>
    </Footer>
  );
};

export default AppFooter;
