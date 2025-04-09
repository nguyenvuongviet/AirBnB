import { Card, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Booking } from "../../../models/Booking";
import { Room } from "../../../models/Room";
import { AppDispatch } from "../../../store";
import { createBooking } from "../../../store/slices/booking";
import BookingDetails from "./BookingDetails";
import PaymentMethod from "./PaymentMethod";
import RoomDetails from "./RoomDetails";

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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
    dispatch(createBooking(booking))
      .then(() => {
        notification.success({
          message: "Đặt phòng thành công",
          description: "Bạn đã đặt phòng thành công!",
          placement: "topRight",
        });
      })
      .catch((error) => {
        notification.error({
          message: "Lỗi đặt phòng",
          description: error.message,
          placement: "topRight",
        });
      });
  };

  return (
    <div className="flex justify-center py-12 px-4 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <Card className="w-full max-w-6xl rounded-3xl shadow-2xl border border-gray-100 p-6">
        <div className="grid md:grid-cols-2 gap-10 p-6">
          <RoomDetails room={room} />

          <div className="space-y-6">
            <BookingDetails booking={booking} />
            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              handlePayment={handlePayment}
              totalAmount={booking.tongTien ?? 0}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Payment;
