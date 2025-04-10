import { Button, Card } from "antd";

const Security: React.FC = () => {
  return (
    <Card title="Bảo mật & Đăng nhập" className="shadow-md">
      <p>
        <strong>Mật khẩu:</strong> *********
      </p>
      <p>
        <strong>Đăng nhập hai bước:</strong> Đã bật
      </p>
      <p>
        <strong>Thiết bị đã đăng nhập:</strong> iPhone, MacBook
      </p>
      <Button type="primary" className="mt-4">
        Cập nhật bảo mật
      </Button>
    </Card>
  );
};

export default Security;
