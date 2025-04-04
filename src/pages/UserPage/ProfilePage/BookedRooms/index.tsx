import { Alert, Card, Spin } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserInfo } from "../../../../models/UserInfo";
import { AppDispatch, RootState } from "../../../../store";
import { fetchBookedRooms } from "../../../../store/slices/bookedRooms";
import CardBookedRoom from "./CardBookedRoom";

interface BookedRoomsProps {
  user: UserInfo | null;
}

const BookedRooms: React.FC<BookedRoomsProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { bookedRooms, loading, error } = useSelector(
    (state: RootState) => state.bookedRooms
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchBookedRooms(user.id));
    }
  }, [dispatch, user]);

  return (
    <Card title="Phòng đã thuê" className="shadow-md">
      {loading && <Spin className="block mx-auto my-4" />}
      {error && <Alert message={error} type="error" className="mb-4" />}
      {!loading && !error && bookedRooms.length === 0 && (
        <p className="text-gray-500">Bạn chưa đặt phòng nào.</p>
      )}
      <div className="space-y-4">
        {bookedRooms.map((room) => (
          <CardBookedRoom key={room.id} bookedRoom={room} />
        ))}
      </div>
    </Card>
  );
};

export default BookedRooms;
