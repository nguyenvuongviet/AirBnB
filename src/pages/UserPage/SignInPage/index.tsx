import { Button, Card, Form, Input, notification, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/index";
import { actLogin } from "../../../store/slices/sign-in";

const { Title, Text } = Typography;

const SignInPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.signIn);

  const onFinish = async (values: { email: string; password: string }) => {
    const resultAction = await dispatch(actLogin(values));

    if (actLogin.fulfilled.match(resultAction)) {
      notification.success({
        message: "Thành công",
        description: "Đăng nhập thành công!",
        placement: "bottomRight",
      });
      navigate("/");
    } else {
      notification.error({
        message: "Thất bại",
        description: (resultAction.payload as string) || "Đăng nhập thất bại!",
        placement: "bottomRight",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg" variant="outlined">
        <div className="text-center mb-6">
          <Title level={2}>Đăng nhập</Title>
          <Text type="secondary">Chào mừng bạn quay trở lại!</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <Text>
            Chưa có tài khoản? <Link to="/sign-up">Đăng ký ngay</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default SignInPage;
