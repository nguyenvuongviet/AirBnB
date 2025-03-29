import {
  CreditCardOutlined,
  HomeOutlined,
  LockOutlined,
  LogoutOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import { UserInfo } from "../../../../models/UserInfo";
import BookedRooms from "../BookedRooms";
import Payment from "../Payment";
import Privacy from "../Privacy";
import Profile from "../Profile";
import Security from "../Security";

export interface MenuItem {
  id: string;
  title: string;
  icon: ReactNode;
  content?: ReactNode;
  onClick?: () => void;
}

export const getMenuItems = (
  user: UserInfo | null,
  handleLogout: () => void
): MenuItem[] => [
  {
    id: "profile",
    title: "Thông tin cá nhân",
    icon: <UserOutlined />,
    content: <Profile user={user} />,
  },
  {
    id: "bookedRooms",
    title: "Phòng đã thuê",
    icon: <HomeOutlined />,
    content: <BookedRooms user={user} />,
  },
  {
    id: "security",
    title: "Đăng nhập & Bảo mật",
    icon: <LockOutlined />,
    content: <Security />,
  },
  {
    id: "payment",
    title: "Thanh toán & Giao dịch",
    icon: <CreditCardOutlined />,
    content: <Payment />,
  },
  {
    id: "privacy",
    title: "Quyền riêng tư & Chia sẻ",
    icon: <ShareAltOutlined />,
    content: <Privacy />,
  },
  {
    id: "logout",
    title: "Đăng xuất",
    icon: <LogoutOutlined className="text-red-500" />,
    onClick: handleLogout,
  },
];
