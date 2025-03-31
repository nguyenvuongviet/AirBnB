import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Form, Input, List } from "antd";

interface CommentSectionProps {
  roomId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ roomId }) => {
  const comments = [
    {
      id: roomId,
      name: "Nguyễn Văn A",
      comment: "Phòng rất sạch sẽ và tiện nghi. Chủ nhà rất thân thiện.",
    },
    {
      id: 2,
      name: "Trần Thị B",
      comment: "Vị trí rất thuận tiện, gần các khu vui chơi.",
    },
  ];

  return (
    <Card className="shadow-lg rounded-lg p-6 mt-8 bg-gray-50">
      <h2 className="text-xl font-bold text-gray-800">Bình luận</h2>
      <List
        dataSource={comments}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={<p className="font-bold">{item.name}</p>}
              description={<p>{item.comment}</p>}
            />
          </List.Item>
        )}
      />
      <Form layout="vertical" className="mt-4">
        <Form.Item label="Viết bình luận của bạn">
          <Input.TextArea rows={3} placeholder="Nhập bình luận..." />
        </Form.Item>
        <Button type="primary">Gửi bình luận</Button>
      </Form>
    </Card>
  );
};

export default CommentSection;
