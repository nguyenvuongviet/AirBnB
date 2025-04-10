import { Button, Card } from "antd";

const Payment: React.FC = () => {
  return (
    <Card title="Thanh toán & Giao dịch" className="shadow-md">
      <p>
        <strong>Phương thức thanh toán:</strong> Thẻ Visa **** 1234
      </p>
      <p>
        <strong>Lịch sử thanh toán:</strong> 5 giao dịch gần nhất
      </p>
      <Button type="primary" className="mt-4">
        Quản lý thanh toán
      </Button>
    </Card>
  );
};

export default Payment;
