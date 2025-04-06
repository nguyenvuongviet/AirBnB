import { DatePicker, Divider, notification, Popover } from "antd";
// import locale from "antd/es/date-picker/locale/vi_VN";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Room } from "../../../../models/Room";
import DropdownBooking from "./DropdownBooking";

const { RangePicker } = DatePicker;

export interface BookingProps {
  room: Room;
}

const Booking: React.FC<BookingProps> = ({ room }) => {
  const navigate = useNavigate();
  const currentUserString = localStorage.getItem("CURRENT_USER") || "{}";
  const currentUser = JSON.parse(currentUserString);
  const userId = currentUser?.user?.id;
  const [guestCount, setGuestCount] = useState(room.khach);
  const [dates, setDates] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ]);

  const handleBooking = () => {
    if (!currentUser || !currentUser.user) {
      notification.warning({
        message: "Bạn chưa đăng nhập",
        description: "Vui lòng đăng nhập để thực hiện đặt phòng!",
        placement: "topRight",
      });
      return;
    }

    if (!dates[0] || !dates[1]) {
      notification.error({
        message: "Lỗi đặt phòng",
        description: "Vui lòng chọn ngày nhận và trả phòng!",
        placement: "topRight",
      });
      return;
    }

    const bookingData = {
      id: Date.now(),
      maPhong: room.id,
      ngayDen: dates[0].format("YYYY-MM-DD"),
      ngayDi: dates[1].format("YYYY-MM-DD"),
      soLuongKhach: guestCount,
      maNguoiDung: userId,
    };

    navigate("/payment", { state: bookingData });
  };

  const handleGuestChange = (newCount: number) => {
    setGuestCount(newCount);
  };

  const disabledDate = (current: dayjs.Dayjs) =>
    current && current < dayjs().startOf("day");

  const totalDays = useMemo(() => {
    if (dates[0] && dates[1]) {
      return dates[1].diff(dates[0], "day");
    }
    return 1;
  }, [dates]);

  const totalPrice = totalDays * room.giaTien;

  const priceDetail = (
    <div className="text-gray-700 space-y-3">
      <div className="flex justify-between items-center text-base">
        <span className="text-gray-600">
          ${room.giaTien} x {totalDays || 1} đêm
        </span>
        <span className="font-medium">${totalPrice || room.giaTien}</span>
      </div>

      <Divider className="my-2 border-gray-300" />

      <div className="flex justify-between items-center text-lg font-semibold">
        <span className="text-gray-900">Tổng cộng</span>
        <span className="text-red-500">${totalPrice || room.giaTien}</span>
      </div>
    </div>
  );

  return (
    <div className="p-6 border rounded-2xl shadow-xl max-w-md bg-white">
      <div className="flex items-center mb-4 space-x-2">
        <Popover content={priceDetail} title="Chi tiết giá" trigger="click">
          <p className="text-2xl font-bold text-gray-800 cursor-pointer underline hover:text-rose-500">
            ${totalPrice}
          </p>
        </Popover>
        <p className="text-base text-gray-600">cho {totalDays} đêm</p>
      </div>

      <div className="mb-6">
        <div className="border rounded-lg overflow-hidden mb-4">
          <div className="flex bg-gray-100 p-4 items-center text-sm font-semibold text-gray-700">
            <div className="flex-1 text-center border-r border-gray-300">
              Nhận phòng
            </div>
            <div className="flex-1 text-center">Trả phòng</div>
          </div>

          <RangePicker
            // locale={locale}
            disabledDate={disabledDate}
            size="large"
            placeholder={["Chọn ngày", "Chọn ngày"]}
            // separator={null}
            variant="borderless"
            className="w-full px-4 py-2"
            onChange={(dates) => {
              if (dates && dates.length === 2) {
                setDates(dates as [Dayjs, Dayjs]);
              } else {
                setDates([null, null]);
              }
            }}
          />
        </div>

        <DropdownBooking
          totalOfGuest={room.khach}
          onGuestChange={handleGuestChange}
        />
      </div>

      <button
        onClick={handleBooking}
        className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition duration-300 shadow-md"
      >
        Đặt phòng
      </button>
    </div>
  );
};

export default Booking;
