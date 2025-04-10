import {
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Card, Col, Image, Row, Tag, Tooltip } from "antd";
import { useState } from "react";
import { TbBath, TbBed, TbHome, TbUser } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { amenities } from "../../../../constants/amenities";
import { Room } from "../../../../models/Room";

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card
      className="shadow-md hover:shadow-xl transition-all cursor-pointer rounded-lg overflow-hidden"
      styles={{ body: { padding: "16px" } }}
      onClick={() => navigate(`/detail-room/${room.id}`)}
    >
      <Row gutter={[16, 16]} className="h-full flex flex-col md:flex-row">
        <Col xs={24} md={10}>
          <Image
            src={room.hinhAnh || "/default-room.jpg"}
            alt={room.tenPhong}
            className="rounded-lg object-cover w-full h-[200px] md:h-[180px]"
          />
        </Col>

        <Col xs={24} md={14} className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <Tooltip title={room.tenPhong} placement="top">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {room.tenPhong}
                </h3>
              </Tooltip>
              <div
                className="cursor-pointer transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
              >
                {isLiked ? (
                  <HeartFilled className="text-red-500 text-xl" />
                ) : (
                  <HeartOutlined className="text-gray-500 text-xl hover:text-red-500 transition" />
                )}
              </div>
            </div>

            <p className="text-gray-600 flex gap-5 text-base border-b pb-1">
              <span className="flex items-center gap-1">
                <TbUser className="text-base" />· {room.khach}
              </span>
              <span className="flex items-center gap-1">
                <TbHome className="text-base" />· {room.phongNgu}
              </span>
              <span className="flex items-center gap-1">
                <TbBed className="text-base" />· {room.giuong}
              </span>
              <span className="flex items-center gap-1">
                <TbBath className="text-base" />· {room.phongTam}
              </span>
            </p>

            <div className="flex flex-wrap gap-1 mt-2">
              {amenities
                .filter(({ field }) => room[field])
                .map(({ name, field }) => (
                  <Tag key={field} className="text-gray-500">
                    {name}
                  </Tag>
                ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
            <span className="text-sm text-gray-500 flex items-center">
              <EnvironmentOutlined className="mr-1" />
              Không có địa chỉ
            </span>
            <span className="text-xl font-semibold mt-2 md:mt-0">
              {room.giaTien}$
              <span className="text-gray-500 font-medium"> /đêm</span>
            </span>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default RoomCard;
