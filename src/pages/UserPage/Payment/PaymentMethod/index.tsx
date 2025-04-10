import React from "react";
import { Button, Card, Radio, Typography } from "antd";
import PayPalButton from "./PayPalButton";

const { Title } = Typography;

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  handlePayment: () => void;
  totalAmount: number;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMethod,
  setPaymentMethod,
  handlePayment,
  totalAmount,
}) => {
  return (
    <Card title="Phương thức thanh toán" className="rounded-2xl shadow">
      <Radio.Group
        onChange={(e) => setPaymentMethod(e.target.value)}
        value={paymentMethod}
        className="mb-4"
      >
        <Radio value="card">Thẻ tín dụng</Radio>
        <Radio value="paypal">Thanh toán PayPal</Radio>
      </Radio.Group>

      {paymentMethod === "card" && (
        <div className="space-y-4">
          <p>Chức năng thanh toán thẻ đang được phát triển.</p>
          <Button type="primary" onClick={handlePayment}>
            Thanh toán
          </Button>
        </div>
      )}

      {paymentMethod === "paypal" && (
        <div>
          <Title level={5}>Thanh toán qua PayPal</Title>
          <PayPalButton totalAmount={totalAmount} onSuccess={handlePayment} />
        </div>
      )}
    </Card>
  );
};

export default PaymentMethod;
