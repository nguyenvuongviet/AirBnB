import { Button } from "antd";

const FilterBar: React.FC = () => {
  return (
    <div className="md:px-4  py-4">
      <p className="text-gray-500 text-sm">
        Hơn 300 chỗ ở · 16 thg 4 - 14 thg 5
      </p>
      <h2 className="text-2xl font-semibold mt-1">
        Chỗ ở tại khu vực bản đồ đã chọn
      </h2>
      <div className="flex gap-3 mt-3 flex-wrap">
        <Button className="border border-gray-300 px-4 py-2 rounded-full">
          Loại nơi ở
        </Button>
        <Button className="border border-gray-300 px-4 py-2 rounded-full">
          Giá
        </Button>
        <Button className="border border-gray-300 px-4 py-2 rounded-full">
          Đặt ngay
        </Button>
        <Button className="border border-gray-300 px-4 py-2 rounded-full">
          Phòng và phòng ngủ
        </Button>
        <Button className="border border-gray-300 px-4 py-2 rounded-full">
          Bộ lọc khác
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
