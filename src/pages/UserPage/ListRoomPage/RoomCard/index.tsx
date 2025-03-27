import {
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
} from "@ant-design/icons";
import { Card, Col, Image, Row, Tag, Tooltip } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

        <Col
          xs={24}
          md={14}
          className="flex flex-col justify-between h-full mt-3 md:mt-0"
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <Tooltip title={room.tenPhong} placement="top">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {room.tenPhong}
                </h3>
              </Tooltip>

              <div
                className="p-2 cursor-pointer transition-all"
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

            <p className="text-gray-500 text-sm">
              {room.khach} khách · {room.phongNgu} phòng ngủ · {room.giuong}{" "}
              giường · {room.phongTam} phòng tắm
            </p>

            <div className="flex flex-wrap gap-1 mt-2">
              {room.wifi && <Tag className="text-gray-500">WiFi</Tag>}
              {room.bep && <Tag className="text-gray-500">Bếp</Tag>}
              {room.dieuHoa && <Tag className="text-gray-500">Điều hòa</Tag>}
              {room.hoBoi && <Tag className="text-gray-500">Hồ bơi</Tag>}
              {room.doXe && <Tag className="text-gray-500">Đỗ xe</Tag>}
              {room.banUi && <Tag className="text-gray-500">Bàn ủi</Tag>}
              {room.tivi && <Tag className="text-gray-500">Tivi</Tag>}
              {room.banLa && <Tag className="text-gray-500">Bàn là</Tag>}
              {room.mayGiat && <Tag className="text-gray-500">Máy giặt</Tag>}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
            <span className="text-sm text-gray-500 flex items-center">
              <EnvironmentOutlined className="mr-1" />
              Không có địa chỉ
            </span>
            <span className="text-xl font-semibold mt-2 md:mt-0">
              {room.giaTien}$
              <span className="text-gray-500 font-medium">/tháng</span>
            </span>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default RoomCard;
