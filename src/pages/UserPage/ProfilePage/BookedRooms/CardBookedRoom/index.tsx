import { CalendarOutlined } from "@ant-design/icons";
import { Card, Spin, Typography, notification } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Booking } from "../../../../../models/Booking";
import { AppDispatch, RootState } from "../../../../../store";
import { fetchRoomById } from "../../../../../store/slices/room";
import RoomCard from "../../../ListRoomPage/RoomCard";

const { Text, Title } = Typography;

interface CardBookedRoomProps {
  bookedRoom: Booking;
}

const CardBookedRoom: React.FC<CardBookedRoomProps> = ({ bookedRoom }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { room: roomDetail, loading } = useSelector(
    (state: RootState) => state.room
  );

  useEffect(() => {
    if (bookedRoom.maPhong) {
      dispatch(fetchRoomById(bookedRoom.maPhong))
        .unwrap()
        .catch(() => {
          notification.error({
            message: "Lỗi khi tải phòng",
            description: "Không thể tải dữ liệu phòng. Vui lòng thử lại.",
            placement: "topRight",
          });
        });
    }
  }, [dispatch, bookedRoom.maPhong]);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Card className="shadow-lg border rounded-xl mb-6 bg-white max-w-3xl mx-auto">
      <Title level={5} className="text-blue-600 mb-4">
        <CalendarOutlined className="mr-2 text-blue-400" />
        Booking Details
      </Title>
      <div className="flex flex-wrap bg-gray-50 p-5 rounded-lg gap-6">
        {roomDetail && (
          <div className="flex-1 border-r pr-4">
            <RoomCard room={roomDetail} />
          </div>
        )}
        <div className="flex-shrink-0 w-full sm:w-1/5">
          <div className="mb-4 bg-green-100 p-3 rounded-lg">
            <Text strong className="text-gray-600 block mb-1">
              Check-In Date:
            </Text>
            <Text className="text-green-700 font-semibold">
              {new Date(bookedRoom.ngayDen).toLocaleDateString()}
            </Text>
          </div>
          <div className="bg-red-100 p-3 rounded-lg">
            <Text strong className="text-gray-600 block mb-1">
              Check-Out Date:
            </Text>
            <Text className="text-red-700 font-semibold">
              {new Date(bookedRoom.ngayDi).toLocaleDateString()}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardBookedRoom;
