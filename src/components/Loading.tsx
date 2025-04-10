import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen text-2xl">
      <div className="flex flex-col items-center">
        <Spin size="large" />
        <p className="mt-2 text-gray-600">Đang tải dữ liệu...</p>
      </div>
    </div>
  );
};

export default Loading;
