// import React, { useEffect, useRef } from "react";
// import { Button, Card, Radio, Typography } from "antd";

// const { Title } = Typography;

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
  //   const paypalRef = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     if (paymentMethod === "paypal" && window.paypal && paypalRef.current) {
  //       window.paypal
  //         .Buttons({
  //           createOrder: (data: any, actions: any) => {
  //             return actions.order.create({
  //               purchase_units: [
  //                 {
  //                   amount: {
  //                     value: totalAmount.toString(), // Đơn vị là USD
  //                   },
  //                 },
  //               ],
  //             });
  //           },
  //           onApprove: async (data: any, actions: any) => {
  //             await actions.order.capture();
  //             handlePayment();
  //           },
  //           onError: (err: any) => {
  //             console.error("PayPal error:", err);
  //           },
  //         })
  //         .render(paypalRef.current);
  //     }
  //   }, [paymentMethod, totalAmount, handlePayment]);

  return (
    <h1>Thanh toán</h1>
    //     <Card title="Phương thức thanh toán" className="rounded-2xl shadow">
    //       <Radio.Group
    //         onChange={(e) => setPaymentMethod(e.target.value)}
    //         value={paymentMethod}
    //         className="mb-4"
    //       >
    //         <Radio value="card">Thẻ tín dụng/Ghi nợ</Radio>
    //         <Radio value="paypal">Thanh toán bằng PayPal</Radio>
    //       </Radio.Group>

    //       {paymentMethod === "card" && (
    //         <div className="space-y-4">
    //           {/* Mô phỏng thanh toán bằng thẻ */}
    //           <p>Chức năng thanh toán thẻ đang được phát triển.</p>
    //           <Button type="primary" onClick={handlePayment}>
    //             Thanh toán
    //           </Button>
    //         </div>
    //       )}

    //       {paymentMethod === "paypal" && (
    //         <div>
    //           <Title level={5}>Thanh toán qua PayPal</Title>
    //           <div ref={paypalRef} />
    //         </div>
    //       )}
    //     </Card>
  );
};

export default PaymentMethod;
