import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, notification, Tabs } from "antd";
import Upload from "antd/es/upload";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import { logout } from "../../../store/slices/Auth/sign-in";
import { fetchUser, updateAvatar } from "../../../store/slices/user";
import { getMenuItems } from "./MenuItems";

const useTabPosition = () => {
  const [tabPosition, setTabPosition] = useState<"left" | "top">(
    window.innerWidth < 1024 ? "top" : "left"
  );

  useEffect(() => {
    const updateTabPosition = () =>
      setTabPosition(window.innerWidth < 1024 ? "top" : "left");

    window.addEventListener("resize", updateTabPosition);
    return () => window.removeEventListener("resize", updateTabPosition);
  }, []);

  return tabPosition;
};

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const currentUserString = localStorage.getItem("CURRENT_USER") || "{}";
  const currentUser = JSON.parse(currentUserString);
  const userId = currentUser?.user?.id;
  const user = useSelector((state: RootState) => state.user.user);
  const tabPosition = useTabPosition();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (!userId) {
      showNotification("error", "Lỗi", "Vui lòng đăng nhập!");
      navigate("/sign-in");
    } else {
      dispatch(fetchUser(Number(userId)));
    }
  }, [dispatch, navigate, userId]);

  const showNotification = (
    type: "success" | "error",
    message: string,
    description: string
  ) => {
    notification[type]({ message, description, placement: "topRight" });
  };

  const handleLogout = () => {
    dispatch(logout());
    showNotification("success", "Đăng xuất", "Bạn đã đăng xuất khỏi hệ thống.");
    navigate("/");
  };

  const handleAvatarChange = async (info: any) => {
    const file = info.file?.originFileObj || info.file;
    if (!file) {
      return showNotification(
        "error",
        "Lỗi",
        "Không tìm thấy file để tải lên!"
      );
    }

    const response = await dispatch(updateAvatar(file));

    if (updateAvatar.fulfilled.match(response)) {
      dispatch(fetchUser(user?.id || 0));
      showNotification(
        "success",
        "Thành công",
        "Ảnh đại diện cập nhật thành công!"
      );
    } else {
      showNotification("error", "Lỗi cập nhật", String(response.payload));
    }
  };

  const menuItems = getMenuItems(user, handleLogout);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50">
      <div
        className={`bg-white shadow-md rounded-lg p-4 flex ${
          tabPosition === "left" ? "lg:flex-row flex-col" : "flex-col"
        }`}
      >
        <div
          className={`w-full ${
            tabPosition === "left"
              ? "lg:w-1/4 lg:border-r border-gray-200"
              : "w-full"
          }`}
        >
          <div
            className={`sticky ${
              tabPosition === "left" ? "top-24" : "top-0"
            } bg-white z-10`}
          >
            <div className="mb-5 text-center">
              <Upload
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleAvatarChange}
              >
                <div className="relative w-fit mx-auto group cursor-pointer">
                  <Avatar
                    size={100}
                    src={user?.avatar || undefined}
                    icon={!user?.avatar ? <UserOutlined /> : undefined}
                    className="mx-auto shadow-lg border border-gray-300 transition-opacity duration-300 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <CameraOutlined className="text-white text-2xl bg-black bg-opacity-50 p-2 rounded-full" />
                  </div>
                </div>
              </Upload>

              <p className="text-gray-500">{user?.email || "Không có email"}</p>
              <h2 className="text-2xl font-semibold mt-3 text-gray-800">
                Xin chào, {user?.name || "Khách"}
              </h2>
            </div>

            <Tabs
              activeKey={activeTab}
              onChange={(key) => {
                const selectedTab = menuItems.find((item) => item.id === key);
                if (selectedTab?.onClick) {
                  selectedTab.onClick();
                } else {
                  setActiveTab(key);
                }
              }}
              tabPosition={tabPosition}
              className="w-full pt-2"
              items={menuItems.map((item) => ({
                key: item.id,
                label: (
                  <div
                    className={`flex items-center gap-2 text-xs sm:text-sm md:text-base transition-colors duration-200 ${
                      activeTab === item.id
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-500"
                    }`}
                  >
                    {item.icon}
                    <span className="hidden sm:inline font-medium">
                      {item.title}
                    </span>
                  </div>
                ),
              }))}
              style={{ overflowX: "auto" }}
              type="line"
            />
          </div>
        </div>
        <div className="flex-1 bg-white px-4 rounded-lg">
          {menuItems.map(
            (item) =>
              item.id === activeTab && <div key={item.id}>{item.content}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
