import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Typography,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "../../../models/UserInfo";
import { AppDispatch, RootState } from "../../../store";
import {
  actSignUp,
  resetSignUpState,
} from "../../../store/slices/Auth/sign-up";

const { Option } = Select;
const { Title, Text } = Typography;

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector(
    (state: RootState) => state.signUp
  );

  const [role, setRole] = useState<string>("USER");
  const [adminKey, setAdminKey] = useState<string>("");

  useEffect(() => {
    if (success) {
      notification.success({
        message: "Đăng ký thành công! Vui lòng đăng nhập.",
        placement: "topRight",
      });
      dispatch(resetSignUpState());
      navigate("/sign-in");
    }
  }, [success, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      notification.error({ message: error, placement: "topRight" });
    }
  }, [error]);

  const onFinish = async (values: UserInfo) => {
    if (role === "ADMIN" && adminKey !== "ADMIN") {
      notification.error({
        message: "Đăng ký thất bại! Vui lòng nhập lại khóa quản trị!",
        placement: "bottomRight",
      });
      return;
    }

    dispatch(actSignUp(values));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="w-full max-w-3xl p-6 shadow-xl rounded-2xl bg-white">
        <Title level={2} className="text-center text-blue-600 mb-4">
          Đăng ký tài khoản
        </Title>
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ gender: true, role: "USER" }}
        >
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input placeholder="Nhập họ và tên" size="large" />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="Nhập email" size="large" />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" size="large" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu" size="large" />
            </Form.Item>
            <Form.Item
              label="Ngày sinh"
              name="birthday"
              rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                className="w-full"
                placeholder="Chọn ngày sinh"
                size="large"
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Giới tính" name="gender">
              <Select size="large">
                <Option value={true}>Nam</Option>
                <Option value={false}>Nữ</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Vai trò" name="role">
              <Select
                size="large"
                onChange={(value) => setRole(value)}
                value={role}
              >
                <Option value="USER">Người dùng</Option>
                <Option value="ADMIN">Quản trị viên</Option>
              </Select>
            </Form.Item>
          </div>

          {role === "ADMIN" && (
            <Form.Item
              label="Nhập key Admin"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập key để xác nhận quyền Admin!",
                },
              ]}
            >
              <Input
                placeholder="Nhập key Admin"
                size="large"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
              />
            </Form.Item>
          )}

          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300 py-5 text-lg"
            loading={loading}
          >
            Đăng ký
          </Button>

          <div className="text-center mt-4">
            <Text className="text-gray-600">Bạn đã có tài khoản? </Text>
            <Text
              className="text-blue-500 cursor-pointer hover:underline font-medium"
              onClick={() => navigate("/sign-in")}
            >
              Đăng nhập ngay
            </Text>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
