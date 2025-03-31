import { Card, Divider, Image, List, Rate, Typography } from "antd";
import { useEffect } from "react";
import { TbBath, TbBed, TbHome, TbUser } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { amenities } from "../../../constants/amenities";
import { AppDispatch, RootState } from "../../../store";
import { fetchRoomById } from "../../../store/slices/room";
import BookingForm from "./BookingForm";
import CommentSection from "./CommentSection";

const { Title, Text } = Typography;

const DetailRoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { room, loading, error } = useSelector(
    (state: RootState) => state.room
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchRoomById(Number(id)));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl">
        Đang tải thông tin phòng...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">Lỗi: {error}</div>;
  }

  if (!room) {
    return <div className="text-center mt-20">Không tìm thấy phòng.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative w-full flex justify-center my-4">
        <Image
          src={room.hinhAnh}
          alt={room.tenPhong}
          className="object-cover h-full w-full rounded-2xl shadow-lg"
          preview={false}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <Card className="lg:w-2/3 shadow-md rounded-lg p-6">
            <Title
              level={4}
              className="text-gray-800"
              style={{ fontSize: "2rem" }}
            >
              {room.tenPhong}
            </Title>
            <div className="flex items-center gap-2 my-2 text-sm">
              <Rate allowHalf disabled defaultValue={4.5} className="text-lg" />
              <span className="text-gray-600 text-sm underline hover:text-blue-600 hover:cursor-pointer">
                (120 đánh giá)
              </span>
            </div>
            <Divider className="my-6" />

            <Title
              level={5}
              className="text-gray-800 mb-4"
              style={{ fontSize: "1.5rem" }}
            >
              Toàn bộ căn hộ
            </Title>
            <div className="flex items-center text-gray-600">
              <Text>
                <p className="text-gray-600 flex gap-5 text-lg">
                  <span className="flex items-center gap-1">
                    <TbUser />· {room.khach}
                  </span>
                  <span className="flex items-center gap-1">
                    <TbHome />· {room.phongNgu}
                  </span>
                  <span className="flex items-center gap-1">
                    <TbBed />· {room.giuong}
                  </span>
                  <span className="flex items-center gap-1">
                    <TbBath />· {room.phongTam}
                  </span>
                </p>
              </Text>
            </div>
            <Text className="text-gray-600 leading-relaxed text-lg">
              {room.moTa}
            </Text>
            <Divider className="my-6" />

            <Title
              level={5}
              className="text-gray-800 mb-4"
              style={{ fontSize: "1.5rem" }}
            >
              Tiện ích
            </Title>

            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={amenities.filter(({ field }) => room[field])}
              renderItem={({ name, icon }) => (
                <List.Item>
                  <div className="flex items-center text-lg gap-2">
                    {icon}
                    <span className="text-gray-700">{name}</span>
                  </div>
                </List.Item>
              )}
            />
          </Card>

          <Card className="lg:w-1/3 shadow-md rounded-lg p-6">
            <BookingForm />
          </Card>
        </div>

        <CommentSection roomId={room.id} />
      </div>
    </div>
  );
};

export default DetailRoomPage;
