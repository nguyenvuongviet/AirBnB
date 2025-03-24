import {
  AppstoreOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { UserInfo } from "../../../../../models/UserInfo";

interface MenuItemsProps {
  user: UserInfo;
  handleLogout: () => void;
}

const MenuItems = ({ user, handleLogout }: MenuItemsProps) => {
  const menuItems = user
    ? [
        {
          key: "1",
          label: (
            <NavLink
              to="/profile"
              className="flex items-center text-blue-600 hover:text-blue-800 space-x-2"
            >
              <UserOutlined className="text-lg" />
              <span>Hồ sơ</span>
            </NavLink>
          ),
        },
        {
          key: "2",
          label: (
            <NavLink
              to="/cms-admin"
              className="flex items-center text-blue-600 hover:text-blue-800 space-x-2"
            >
              <AppstoreOutlined className="text-lg" />
              <span>CMS Admin</span>
            </NavLink>
          ),
        },
        {
          key: "3",
          label: (
            <NavLink
              to="/settings"
              className="flex items-center text-blue-600 hover:text-blue-800 space-x-2"
            >
              <SettingOutlined className="text-lg" />
              <span>Cài đặt</span>
            </NavLink>
          ),
        },
        {
          key: "divider1",
          type: "divider",
        },
        {
          key: "4",
          label: (
            <span
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-800 space-x-2 cursor-pointer"
            >
              <LogoutOutlined className="text-lg" />
              <span>Đăng xuất</span>
            </span>
          ),
        },
      ]
    : [
        {
          key: "1",
          label: (
            <NavLink
              to="/sign-in"
              className="flex items-center text-blue-600 hover:text-blue-800 space-x-2"
            >
              <LoginOutlined className="text-lg" />
              <span>Đăng nhập</span>
            </NavLink>
          ),
        },
        {
          key: "2",
          label: (
            <NavLink
              to="/sign-up"
              className="flex items-center text-blue-600 hover:text-blue-800 space-x-2"
            >
              <UserAddOutlined className="text-lg" />
              <span>Đăng ký</span>
            </NavLink>
          ),
        },
        {
          key: "divider2",
          type: "divider",
        },
        {
          key: "3",
          label: (
            <NavLink
              to="/settings"
              className="flex items-center text-blue-600 hover:text-blue-800 space-x-2"
            >
              <SettingOutlined className="text-lg" />
              <span>Cài đặt</span>
            </NavLink>
          ),
        },
      ];

  return menuItems; // Trả về danh sách menu items
};

export default MenuItems;
