import {
  Button,
  Card,
  Divider,
  Image,
  Radio,
  Rate,
  Space,
  Typography,
  message,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Booking } from "../../../models/Booking";
import { Room } from "../../../models/Room";

const { Title, Paragraph, Text } = Typography;

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { booking, room } = (location.state || {}) as {
    booking: Booking;
    room: Room;
  };

  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    if (!booking || !room) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng chọn phòng",
      });
      navigate("/");
    }
  }, [booking, room, navigate]);

  if (!booking || !room) return null;

  const handlePayment = () => {
    message.success(`Thanh toán bằng ${paymentMethod} thành công!`);
    navigate("/");
  };

  return (
    <div className="flex justify-center py-12 px-4 bg-gray-50 min-h-screen">
      <Card className="w-full max-w-5xl rounded-2xl shadow-2xl border border-gray-200">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Room Info */}
          <div>
            <Image
              src={room.hinhAnh}
              alt={room.tenPhong}
              className="rounded-2xl aspect-video object-cover"
            />
            <Title level={4} className="mt-4">
              {room.tenPhong}
            </Title>
            <div className="flex items-center gap-2">
              <Rate allowHalf disabled defaultValue={4.5} />
              <Text className="text-gray-500 text-sm underline hover:text-blue-600 cursor-pointer">
                (120 đánh giá)
              </Text>
            </div>
            <Paragraph className="mt-2 text-sm text-gray-600">
              {room.moTa?.substring(0, 100)}...
            </Paragraph>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <Title level={4} className="text-blue-600 mb-4">
              Chi tiết đặt phòng
            </Title>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <Text strong>Nhận phòng:</Text>
                <Text>{booking.ngayDen}</Text>
              </div>
              <div className="flex justify-between">
                <Text strong>Trả phòng:</Text>
                <Text>{booking.ngayDi}</Text>
              </div>
              <div className="flex justify-between">
                <Text strong>Khách:</Text>
                <Text>{booking.soLuongKhach}</Text>
              </div>
            </div>
            <Divider className="my-4" />
            <div className="flex justify-between items-center">
              <Text strong className="text-lg">Tổng cộng:</Text>
              <Text className="text-xl font-bold text-red-500">
                {booking.tongTien?.toLocaleString()} USD
              </Text>
            </div>
            <Divider className="my-6" />

            <Title level={5} className="mb-3">
              Phương thức thanh toán
            </Title>
            <Radio.Group
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                <Radio value="card">💳 Thẻ tín dụng / ghi nợ</Radio>
                <Radio value="momo">🟣 Ví MoMo</Radio>
                <Radio value="zalo">💬 Ví ZaloPay</Radio>
                <Radio value="paypal">🌐 PayPal</Radio>
                <Radio value="cod">💵 Thanh toán khi đến nơi</Radio>
              </Space>
            </Radio.Group>

            <Button
              type="primary"
              size="large"
              block
              className="mt-6 rounded-xl"
              onClick={handlePayment}
            >
              Xác nhận thanh toán
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Payment;
