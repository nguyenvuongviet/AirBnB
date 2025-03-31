import { Button, Form, Input } from "antd";

const BookingForm: React.FC = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="Ngày nhận phòng">
        <Input type="date" />
      </Form.Item>
      <Form.Item label="Ngày trả phòng">
        <Input type="date" />
      </Form.Item>
      <Button type="primary" className="mt-4 w-full">
        Xác nhận đặt phòng
      </Button>
    </Form>
  );
};

export default BookingForm;
