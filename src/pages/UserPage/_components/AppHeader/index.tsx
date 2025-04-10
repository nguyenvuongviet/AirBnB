import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Image, Layout, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/logo.png";
import { AppDispatch, RootState } from "../../../../store";
import { logout } from "../../../../store/slices/Auth/sign-in";
import MenuItems from "./MenuItems";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.signIn.data?.user);
  const [avatar, setAvatar] = useState(user?.avatar);

  useEffect(() => {
    if (user?.avatar !== avatar) {
      setAvatar(user?.avatar);
    }
  }, [user?.avatar]);

  const handleLogout = () => {
    dispatch(logout());
    notification.success({
      message: "Đăng xuất",
      description: "Bạn đã đăng xuất khỏi hệ thống.",
      placement: "topRight",
    });
    navigate("/");
  };

  return (
    <Header className="bg-white shadow-lg px-6 md:px-16 flex items-center justify-between fixed w-full z-50 h-20">
      <NavLink to="/" className="flex items-center gap-4">
        <Image src={logo} alt="Logo" preview={false} width={130} />
      </NavLink>

      <nav className="hidden md:flex space-x-8">
        <NavLink
          to="/"
          className="text-black text-lg font-semibold hover:text-red-500"
        >
          Trang Chủ
        </NavLink>
      </nav>

      <Dropdown
        menu={{ items: MenuItems({ user, handleLogout }) }}
        trigger={["click"]}
        placement="bottomRight"
        className="hover:shadow-2xl hover:scale-105"
      >
        <Button className="flex items-center gap-2 bg-gray-100 px-4 py-6 rounded-full hover:bg-gray-200 shadow-lg">
          <MenuOutlined className="text-lg" />
          <Avatar
            src={user?.avatar || undefined}
            alt="Avatar"
            size={35}
            className="flex items-center justify-center"
            icon={<UserOutlined className="text-xl" />}
          />
        </Button>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
