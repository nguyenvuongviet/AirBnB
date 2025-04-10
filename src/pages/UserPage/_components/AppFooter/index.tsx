import Icon, { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Layout, Typography } from "antd";
import { FaAirbnb } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter: React.FC = () => {
  return (
    <Footer className="bg-white text-gray-800 px-12 pt-12 border-t border-gray-300 shadow-md">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        <div className="flex flex-col items-start">
          <NavLink to="/" className="flex items-center gap-4">
            <Icon className="text-5xl text-red-500" component={FaAirbnb} />
            <span className="text-3xl font-medium text-red-500">Airbnb</span>
          </NavLink>
          <Text className="text-gray-500 mt-4">
            Airbnb giúp bạn khám phá những điểm đến tuyệt vời trên thế giới.
          </Text>
        </div>

        <div>
          <Title level={5} className="text-gray-700">
            Company
          </Title>
          <ul className="text-gray-600 text-sm space-y-2 mt-4">
            <li>
              <a href="#" className="hover:text-red-500">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Title level={5} className="text-gray-700">
            Support
          </Title>
          <ul className="text-gray-600 text-sm space-y-2 mt-4">
            <li>
              <a href="#" className="hover:text-red-500">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <Title level={5} className="text-gray-700">
            Get in Touch
          </Title>
          <Text className="text-gray-600 flex items-center gap-2 mt-4">
            <MailOutlined /> support@airbnb.com
          </Text>
          <Text className="text-gray-600 flex items-center gap-2 mt-2">
            <PhoneOutlined /> +1-800-123-4567
          </Text>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-12 border-t border-gray-300 pt-4">
        &copy; 2024 Airbnb, Inc. All rights reserved.
      </div>
    </Footer>
  );
};

export default AppFooter;
