import { Divider, Typography } from "antd";
import React from "react";
import { Booking } from "../../../../models/Booking";

const { Title, Text } = Typography;

interface BookingDetailsProps {
  booking: Booking;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({ booking }) => {
  return (
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
        <Text strong className="text-lg text-gray-800">
          Tổng cộng:
        </Text>
        <Text className="text-2xl font-extrabold text-red-500">
          {booking.tongTien?.toLocaleString()} USD
        </Text>
      </div>
    </div>
  );
};

export default BookingDetails;
