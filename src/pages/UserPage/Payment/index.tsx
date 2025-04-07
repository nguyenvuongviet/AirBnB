import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Descriptions, message } from "antd";
import { Booking } from "../../../models/Booking";

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData: Booking = location.state;

  if (!bookingData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Không có dữ liệu đặt phòng!</p>
      </div>
    );
  }

  const handlePayment = () => {
    // Giả lập thanh toán thành công
    message.success("Thanh toán thành công!");
    navigate("/"); // hoặc điều hướng tới trang xác nhận thanh toán
  };

  return (
    <div className="flex justify-center py-10">
      <Card
        title="Thông tin thanh toán"
        className="w-full max-w-2xl shadow-xl rounded-2xl"
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Phòng">
            {bookingData.maPhong}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày nhận phòng">
            {bookingData.ngayDen}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày trả phòng">
            {bookingData.ngayDi}
          </Descriptions.Item>
          <Descriptions.Item label="Số khách">
            {bookingData.soLuongKhach}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">
            {bookingData.tongTien} USD
          </Descriptions.Item>
        </Descriptions>

        <div className="text-center mt-6">
          <Button
            type="primary"
            size="large"
            onClick={handlePayment}
            className="rounded-xl"
          >
            Thanh toán
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Payment;
