import { Button, Card, Form, Input, notification, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../../../models/Login";
import { AppDispatch, RootState } from "../../../store/index";
import { actLogin } from "../../../store/slices/Auth/sign-in";
import { fetchUser } from "../../../store/slices/user";

const { Title, Text } = Typography;

const SignInPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.signIn);

  const onFinish = async (values: Login) => {
    const resultAction = await dispatch(actLogin(values));

    if (actLogin.fulfilled.match(resultAction)) {
      dispatch(fetchUser(resultAction.payload.user.id));
      notification.success({
        message: "Thành công",
        description: "Đăng nhập thành công!",
        placement: "topRight",
      });
      navigate("/");
    } else {
      notification.error({
        message: "Thất bại",
        description: (resultAction.payload as string) || "Đăng nhập thất bại!",
        placement: "topRight",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <Card className="w-full max-w-md p-6 shadow-xl rounded-2xl bg-white">
        <div className="text-center mb-6">
          <Title level={2} className="text-blue-600">
            Đăng nhập
          </Title>
          <Text type="secondary">Chào mừng bạn đến với Airbnb</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email của bạn" size="large" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" size="large" />
          </Form.Item>

          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className="bg-blue-500 hover:bg-blue-600 transition-all duration-300"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Text className="text-gray-600">Chưa có tài khoản? </Text>
          <Link
            to="/sign-up"
            className="text-blue-500 hover:underline font-medium"
          >
            Đăng ký ngay
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;
