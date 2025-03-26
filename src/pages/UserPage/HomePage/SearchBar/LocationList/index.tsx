import React from "react";
import ReactDOM from "react-dom";
import { List } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Location } from "../../../../../models/Location";

interface LocationListProps {
  filteredLocations: Location[];
  onSelect: (location: Location) => void;
  targetRef: React.RefObject<HTMLDivElement | null>;
}

const LocationList: React.FC<LocationListProps> = ({
  filteredLocations,
  onSelect,
  targetRef,
}) => {
  if (!targetRef.current) return null;

  const { bottom, left, width } = targetRef.current.getBoundingClientRect();

  return ReactDOM.createPortal(
    <div
      className="absolute bg-white shadow-lg rounded-xl z-50 max-h-72 overflow-y-auto border border-gray-300 p-2"
      style={{
        top: bottom + window.scrollY + 5,
        left: left + window.scrollX,
        width: width < 400 ? "90%" : width * 0.5, 
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      {filteredLocations.length > 0 ? (
        <List
          dataSource={filteredLocations}
          renderItem={(item) => (
            <List.Item
              className="cursor-pointer flex gap-4 rounded-lg transition-all duration-200 hover:bg-gray-100 shadow-sm"
              style={{
                justifyContent: "flex-start",
                paddingLeft: "0.5rem",
              }}
              onClick={() => onSelect(item)}
            >
              {/* Icon với màu nền */}
              <span
                className="flex items-center justify-center bg-gray-200 text-gray-600 text-xl w-10 h-10 rounded-full"
              >
                <EnvironmentOutlined />
              </span>

              {/* Nội dung địa điểm */}
              <div className="flex flex-col justify-center min-w-0">
                <div className="text-base font-semibold text-gray-900 truncate w-[150px] sm:w-[200px]">
                  {item.tenViTri}
                </div>
                <div className="text-sm text-gray-500 truncate w-[150px] sm:w-[200px]">
                  {item.tinhThanh}, {item.quocGia}
                </div>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <div className="text-gray-500 text-center py-4 text-sm">
          Không tìm thấy kết quả
        </div>
      )}
    </div>,
    document.body
  );
};

export default LocationList;
