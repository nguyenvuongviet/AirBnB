import { Col, Pagination, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import { fetchRoomsByLocation } from "../../../store/slices/rooms";
import Weather from "../Weather/index.tsx";
import FilterBar from "./FilterBar.tsx";
import RoomCard from "./RoomCard";
import { fetchLocationById } from "../../../store/slices/locations.ts";
import { getCoordinatesWithNominatim } from "../../../store/slices/coordinates.ts";

const PAGE_SIZE = 3;

const ListRoom: React.FC = () => {
  const { maViTri } = useParams<{ maViTri: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { rooms, loading } = useSelector((state: RootState) => state.rooms);
  const { selectedLocation } = useSelector(
    (state: RootState) => state.location
  );
  const { latitude, longitude } = useSelector(
    (state: RootState) => state.coordinates
  );

  useEffect(() => {
    if (maViTri) {
      dispatch(fetchRoomsByLocation(Number(maViTri)));
      dispatch(fetchLocationById(Number(maViTri)));
    }
  }, [dispatch, maViTri]);

  useEffect(() => {
    if (
      selectedLocation &&
      selectedLocation.tenViTri &&
      selectedLocation.quocGia
    ) {
      dispatch(
        getCoordinatesWithNominatim(
          `${selectedLocation.tenViTri}, ${selectedLocation.quocGia}`
        )
      );
    }
  }, [selectedLocation]);

  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedRooms = rooms.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 min-h-screen relative">
      <div className="lg:w-3/4">
        <FilterBar />
      </div>

      <div className="absolute top-0 right-0 lg:w-1/5 lg:block hidden">
        {selectedLocation && (
          <Weather
            selectedLocation={selectedLocation}
            coordinates={{ latitude, longitude }}
          />
        )}
      </div>

      <Row gutter={[24, 24]} className="mt-5 flex flex-col-reverse lg:flex-row">
        <Col xs={24} lg={12}>
          <div className="space-y-6">
            {loading ? (
              Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <Skeleton active key={index} />
              ))
            ) : rooms.length === 0 ? (
              <div className="text-center text-gray-500 text-lg">
                Không có phòng nào phù hợp với tìm kiếm của bạn.
              </div>
            ) : (
              paginatedRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))
            )}
          </div>

          {rooms.length > 0 && (
            <div className="flex justify-center mt-6">
              <Pagination
                current={currentPage}
                pageSize={PAGE_SIZE}
                total={rooms.length}
                onChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </Col>

        <Col xs={24} lg={12}>
          <div className="rounded-lg h-full flex">
            <iframe
              key={`${latitude}-${longitude}`}
              src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
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
