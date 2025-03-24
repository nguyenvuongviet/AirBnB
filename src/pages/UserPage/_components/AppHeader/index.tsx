import {
  MenuOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Image, Layout } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../../store";
import { logout } from "../../../../store/slices/sign-in";
import MenuItems from "./MenuItems";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const user = useSelector((state: any) => state.signIn.data);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Header className="bg-white shadow-lg px-6 md:px-16 flex items-center justify-between fixed w-full z-50 h-20">
      <NavLink to="/" className="flex items-center gap-4">
        <Image
          src="src/assets/images/logo.png"
          alt="Logo"
          preview={false}
          width={130}
        />
      </NavLink>

      <nav className="hidden md:flex space-x-8">
        <NavLink
          to="/"
          className="text-blue-600 text-lg font-semibold hover:text-blue-800"
        >
          Trang Chủ
        </NavLink>
      </nav>

      <Dropdown
        menu={{ items: MenuItems({ user, handleLogout }) }}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Button className="flex items-center gap-2 bg-gray-100 px-4 py-5 rounded-full hover:bg-gray-200 shadow-lg">
          <MenuOutlined style={{ fontSize: "1.1rem" }} />
          {user ? (
            <Avatar icon={<UserOutlined style={{ fontSize: "1.2rem" }} />} />
          ) : (
            <UserOutlined style={{ fontSize: "1.2rem" }} />
          )}
        </Button>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
