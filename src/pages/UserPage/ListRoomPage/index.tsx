import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton, Pagination, Row, Col } from "antd";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import { fetchRoomsByLocation } from "../../../store/slices/rooms";
import FilterBar from "./FilterBar.tsx";
import RoomCard from "./RoomCard";

const PAGE_SIZE = 3;

const ListRoom = () => {
  const { maViTri } = useParams<{ maViTri: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, loading } = useSelector((state: RootState) => state.rooms);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (maViTri) {
      dispatch(fetchRoomsByLocation(Number(maViTri)));
    }
  }, [dispatch, maViTri]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedRooms = rooms.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 min-h-screen">
      <FilterBar />

      <Row gutter={[24, 24]} className="mt-5 flex flex-col-reverse lg:flex-row">
        <Col xs={24} lg={12}>
          <div className="space-y-6">
            {loading
              ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                  <Skeleton active key={index} />
                ))
              : paginatedRooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
          </div>

          <div className="flex justify-center mt-6">
            <Pagination
              current={currentPage}
              pageSize={PAGE_SIZE}
              total={rooms.length}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </Col>

        <Col xs={24} lg={12}>
          <div className="rounded-lg h-full flex">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d80438.54930345368!2d106.74527731568199!3d10.812506504355568!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f385570472f%3A0x1787491df0ed8d6a!2zRGluaCDEkOG7mWMgTOG6rXA!5e0!3m2!1svi!2s!4v1743099076331!5m2!1svi!2s"
              className="w-full h-5/6 rounded-lg"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ListRoom;
