import {
  AppstoreOutlined,
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import { UserInfo } from "../../../../../models/UserInfo";

interface MenuItemsProps {
  user: UserInfo | null;
  handleLogout: () => void;
}

const MenuItems = ({
  user,
  handleLogout,
}: MenuItemsProps): MenuProps["items"] => {
  return user
    ? [
        {
          key: "1",
          label: (
            <NavLink
              to={`/profile/${user.id}`}
              className="flex items-center space-x-2"
            >
              <UserOutlined className="text-lg" />
              <span>Hồ sơ</span>
            </NavLink>
          ),
        },
        {
          key: "2",
          label: (
            <NavLink to="/cms-admin" className="flex items-center space-x-2">
              <AppstoreOutlined className="text-lg" />
              <span>CMS Admin</span>
            </NavLink>
          ),
        },
        {
          key: "3",
          label: (
            <NavLink to="/settings" className="flex items-center space-x-2">
              <SettingOutlined className="text-lg" />
              <span>Cài đặt</span>
            </NavLink>
          ),
        },
        { type: "divider" as const },
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
            <NavLink to="/sign-in" className="flex items-center space-x-2">
              <LoginOutlined className="text-lg" />
              <span>Đăng nhập</span>
            </NavLink>
          ),
        },
        {
          key: "2",
          label: (
            <NavLink to="/sign-up" className="flex items-center space-x-2">
              <UserAddOutlined className="text-lg" />
              <span>Đăng ký</span>
            </NavLink>
          ),
        },
        { type: "divider" as const },
        {
          key: "3",
          label: (
            <NavLink to="/settings" className="flex items-center space-x-2">
              <SettingOutlined className="text-lg" />
              <span>Cài đặt</span>
            </NavLink>
          ),
        },
      ];
};

export default MenuItems;
