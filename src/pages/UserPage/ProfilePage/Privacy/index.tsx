import { Card, Switch } from "antd";

const Privacy: React.FC = () => {
  return (
    <Card title="Quyền riêng tư & Chia sẻ" className="shadow-md">
      <div className="flex justify-between">
        <p>Hiển thị hồ sơ công khai</p>
        <Switch defaultChecked />
      </div>
      <div className="flex justify-between mt-4">
        <p>Cho phép đánh giá phòng</p>
        <Switch />
      </div>
    </Card>
  );
};

export default Privacy;
