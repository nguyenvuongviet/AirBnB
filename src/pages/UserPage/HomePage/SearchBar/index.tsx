import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, notification, Spin } from "antd";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Location } from "../../../../models/Location";
import LocationList from "./LocationList";

const { RangePicker } = DatePicker;

interface SearchBarProps {
  locations: Location[];
  loading: boolean;
  small?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ locations, loading }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    null
  );
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  const filteredLocations = useMemo(
    () =>
      searchTerm.trim()
        ? locations.filter((loc) =>
            `${loc.tenViTri} ${loc.tinhThanh} ${loc.quocGia}`
              .toLowerCase()
              .includes(searchTerm.trim().toLowerCase())
          )
        : locations,
    [searchTerm, locations]
  );

  const handleSearch = () => {
    if (selectedLocationId) {
      navigate(`/list-room/${selectedLocationId}`);
    } else {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng chọn địa điểm trước khi tìm kiếm!",
        placement: "topRight",
      });
    }
  };

  const handleSelectLocation = useCallback((location: Location) => {
    setSearchTerm(location.tenViTri);
    setSelectedLocationId(location.id);
    setIsInputFocused(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);

  const renderLocationList = () => {
    if (!isInputFocused) return null;
    return loading ? (
      <div className="absolute mt-2 w-full bg-white shadow-lg rounded-lg z-50 flex items-center justify-center py-4">
        <Spin />
      </div>
    ) : (
      <LocationList
        filteredLocations={filteredLocations}
        onSelect={handleSelectLocation}
        targetRef={searchBarRef}
      />
    );
  };

  return (
    <div
      className="flex items-center bg-white shadow-lg rounded-full overflow-hidden w-full sm:max-w-full md:max-w-3xl lg:max-w-5xl mx-auto transform transition-all hover:shadow-2xl hover:scale-105"
      ref={searchBarRef}
    >
      <div className="flex flex-col sm:px-1 md:px-3 lg:px-5 py-3 flex-[1.2] rounded-full hover:bg-gray-100 transition-all duration-300 cursor-pointer relative">
        <div className="flex px-3 items-start">
          <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">
            Địa điểm
          </span>
        </div>
        <Input
          placeholder="Bạn muốn đi đâu?"
          variant="borderless"
          className="text-sm sm:text-base px-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          suffix={
            <CloseOutlined
              className={`cursor-pointer text-gray-500 hover:text-gray-700 transition-all text-sm ${
                searchTerm ? "visible" : "invisible"
              }`}
              onClick={() => setSearchTerm("")}
            />
          }
        />
        {renderLocationList()}
      </div>

      <div className="border-l border-gray-300 h-10"></div>

      <div className="flex flex-col sm:px-1 md:px-3 lg:px-5 py-3 flex-[1.6] rounded-full hover:bg-gray-100 transition-all duration-300 cursor-pointer">
        <div className="flex px-3 items-start">
          <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">
            Nhận/Trả phòng
          </span>
        </div>
        <RangePicker
          className="w-full px-3 py-1 rounded-lg"
          size="large"
          placeholder={["Nhận phòng", "Trả phòng"]}
          variant="borderless"
        />
      </div>

      <div className="border-l border-gray-300 h-10"></div>

      <div className="flex flex-col sm:px-1 md:px-3 lg:px-5 py-3 flex-[0.8] rounded-full hover:bg-gray-100 transition-all duration-300 cursor-pointer">
        <div className="flex px-3 items-start">
          <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">
            Khách
          </span>
        </div>
        <Input
          placeholder="Thêm khách"
          variant="borderless"
          className="text-sm sm:text-base px-3"
        />
      </div>

      <Button
        type="primary"
        shape="circle"
        icon={<SearchOutlined className="!text-sm sm:!text-xl md:!text-2xl" />}
        className="!w-[2.5rem] sm:!w-[3rem] md:!w-[3.7rem] !h-[2.5rem] sm:!h-[3rem] md:!h-[3.7rem] !bg-[#FF385C] !mr-5 flex items-center justify-center"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
