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
} from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Booking } from "../../../models/Booking";
import { Room } from "../../../models/Room";

const { Title, Paragraph } = Typography;

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { booking, room } = location.state as { booking: Booking; room: Room };
  const [paymentMethod, setPaymentMethod] = useState("card");

  if (!booking || !room) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Không có dữ liệu đặt phòng!</p>
      </div>
    );
  }

  const handlePayment = () => {
    message.success(`Thanh toán bằng ${paymentMethod} thành công!`);
    navigate("/");
  };

  return (
    <div className="flex justify-center py-10">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Thông tin phòng */}
          <div className="md:w-2/5">
            <Image
              src={room.hinhAnh}
              alt={room.tenPhong}
              className="rounded-xl aspect-video object-cover"
            />
            <Title level={5} className="mt-2">
              {room.tenPhong}
            </Title>
            <div className="flex items-center">
              <Rate allowHalf disabled defaultValue={4.5} className="text-lg" />
              <span className="text-gray-600 text-xs ml-1 underline hover:text-blue-600 hover:cursor-pointer">
                (120 đánh giá)
              </span>
            </div>
            <Paragraph className="text-sm text-gray-700">
              {room.moTa?.substring(0, 100)}...
            </Paragraph>
          </div>

          {/* Thông tin thanh toán */}
          <div className="md:w-3/5">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
              <Title level={4} className="mb-4 text-blue-600">
                Chi tiết đặt phòng
              </Title>
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-gray-700">Nhận phòng:</span>
                <span className="text-gray-800">{booking.ngayDen}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-gray-700">Trả phòng:</span>
                <span className="text-gray-800">{booking.ngayDi}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="font-semibold text-gray-700">Khách:</span>
                <span className="text-gray-800">{booking.soLuongKhach}</span>
              </div>
              <Divider className="my-4" />
              <div className="flex justify-between">
                <span className="font-semibold text-lg text-black">
                  Tổng cộng:
                </span>
                <span className="text-xl font-bold text-red-500">
                  {booking.tongTien?.toLocaleString()} USD
                </span>
              </div>
            </div>

            <Divider className="my-6" />

            {/* Chọn phương thức thanh toán */}
            <Title level={4} className="mb-3">
              Chọn phương thức thanh toán
            </Title>
            <Radio.Group
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
            >
              <Space direction="vertical">
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
              onClick={handlePayment}
              className="rounded-xl w-full mt-6"
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
