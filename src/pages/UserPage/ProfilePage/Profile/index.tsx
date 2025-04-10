import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  notification,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UserInfo } from "../../../../models/UserInfo";
import { AppDispatch } from "../../../../store";
import { updateUser } from "../../../../store/slices/user";

interface ProfileProps {
  user: UserInfo | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    if (user) {
      form.setFieldsValue({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birthday: user.birthday ? dayjs(user.birthday) : null,
        gender: user.gender,
        role: user.role,
      });
    }
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();

      const formattedData = {
        ...values,
        birthday: values.birthday?.format("YYYY-MM-DD"),
      };

      await dispatch(
        updateUser({ userId: user!.id, data: formattedData })
      ).unwrap();

      notification.success({
        message: "Cập nhật thành công",
        description: "Thông tin cá nhân của bạn đã được cập nhật.",
        placement: "topRight",
      });

      setIsModalOpen(false);
    } catch (error) {
      notification.error({
        message: "Cập nhật thất bại",
        description:
          typeof error === "string"
            ? error
            : "Vui lòng kiểm tra lại thông tin.",
        placement: "topRight",
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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

        <Button
          className="mt-6 float-end text-base p-4 rounded-xl"
          onClick={handleEdit}
        >
          Chỉnh sửa hồ sơ
        </Button>
      </Card>

      <Modal
        title="Chỉnh sửa thông tin cá nhân"
        open={isModalOpen}
        onOk={handleUpdate}
        onCancel={handleCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "Email không hợp lệ" },
              { required: true, message: "Vui lòng nhập email" },
            ]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Họ và Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Ngày sinh" name="birthday">
            <DatePicker format="DD/MM/YYYY" className="w-full" />
          </Form.Item>

          <Form.Item label="Giới tính" name="gender">
            <Radio.Group>
              <Radio value={true}>Nam</Radio>
              <Radio value={false}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Vai trò" name="role">
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Profile;
