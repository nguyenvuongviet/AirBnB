import { Button, Card } from "antd";
import { UserInfo } from "../../../../models/UserInfo";

interface ProfileProps {
  user: UserInfo | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <Card
      title={
        <h2 className="text-xl font-bold text-gray-800">Thông tin cá nhân</h2>
      }
      className="shadow-lg rounded-xl border border-gray-200"
    >
      <div className="space-y-4">
        {[
          { label: "ID", value: user?.id ?? "Không có ID" },
          { label: "Họ và Tên", value: user?.name || "Chưa cập nhật" },
          { label: "Email", value: user?.email || "Chưa có email" },
          {
            label: "Số điện thoại",
            value: user?.phone || "Chưa có số điện thoại",
          },
          {
            label: "Ngày sinh",
            value: user?.birthday
              ? new Date(user.birthday).toLocaleDateString()
              : "Chưa cập nhật",
          },
          { label: "Giới tính", value: user?.gender ? "Nam" : "Nữ" },
          { label: "Vai trò", value: user?.role || "Người dùng" },
        ].map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-3 bg-gray-50 text-gray-700"
          >
            <strong className="text-gray-900">{item.label}:</strong>{" "}
            {item.value}
          </div>
        ))}
      </div>

      <Button className="mt-6 float-end text-lg p-5 rounded-xl">
        Chỉnh sửa hồ sơ
      </Button>
    </Card>
  );
};

export default Profile;
