import { Image, Rate, Typography } from "antd";
import React from "react";
import { Room } from "../../../../models/Room";

const { Title, Paragraph, Text } = Typography;

interface RoomDetailsProps {
  room: Room;
}

const RoomDetails: React.FC<RoomDetailsProps> = ({ room }) => {
  return (
    <div>
      <Image
        src={room.hinhAnh}
        alt={room.tenPhong}
        className="rounded-2xl aspect-video object-cover shadow-md"
      />
      <Title level={4} className="mt-4 text-blue-600">
        {room.tenPhong}
      </Title>
      <div className="flex items-center gap-2">
        <Rate allowHalf disabled defaultValue={4.5} />
        <Text className="text-gray-500 text-sm underline hover:text-blue-600 cursor-pointer">
          (120 đánh giá)
        </Text>
      </div>
      <Paragraph className="mt-2 text-sm text-gray-600 leading-relaxed">
        {room.moTa?.substring(0, 100)}...
      </Paragraph>
    </div>
  );
};

export default RoomDetails;
