import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  List,
  notification,
  Pagination,
  Rate,
  Select,
  Spin,
} from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommentPost } from "../../../../models/Comment";
import { AppDispatch, RootState } from "../../../../store";
import {
  fetchCommentsByRoom,
  postComment,
} from "../../../../store/slices/comments";

dayjs.extend(relativeTime);
dayjs.locale("vi");

interface CommentSectionProps {
  roomId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ roomId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const currentUserString = localStorage.getItem("CURRENT_USER") || "{}";
  const currentUser = JSON.parse(currentUserString);
  const userId = currentUser?.user?.id;

  const [currentPage, setCurrentPage] = useState(1);
  const [filterStar, setFilterStar] = useState<number | null>(6);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const pageSize = 5;

  const { comments, loading, error } = useSelector(
    (state: RootState) => state.comments
  );

  let filteredComments = [...comments].sort((a, b) => {
    const isValidISODate = (date: string) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate.getTime()) && date === parsedDate.toISOString();
    };

    const dateA =
      a.ngayBinhLuan instanceof Date
        ? a.ngayBinhLuan.toISOString()
        : a.ngayBinhLuan;

    const dateB =
      b.ngayBinhLuan instanceof Date
        ? b.ngayBinhLuan.toISOString()
        : b.ngayBinhLuan;

    const isValidDateA = isValidISODate(dateA);
    const isValidDateB = isValidISODate(dateB);

    if (isValidDateA && isValidDateB)
      return new Date(dateB).getTime() - new Date(dateA).getTime();

    if (!isValidDateA && isValidDateB) return 1;

    if (isValidDateA && !isValidDateB) return -1;

    return 0;
  });

  if (filterStar !== 6) {
    filteredComments = filteredComments.filter(
      (c) => c.saoBinhLuan === filterStar
    );
  }

  const paginatedComments = filteredComments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSubmit = async (values: {
    noiDung: string;
    saoBinhLuan: number;
  }) => {
    if (
      !values.noiDung ||
      typeof values.noiDung !== "string" ||
      values.noiDung.trim() === ""
    ) {
      notification.error({
        message: "Lỗi",
        description: "Nội dung bình luận không được để trống!",
      });
      return;
    }

    const newComment: CommentPost = {
      maPhong: roomId,
      maNguoiBinhLuan: userId,
      ngayBinhLuan: new Date().toISOString(),
      noiDung: values.noiDung,
      saoBinhLuan: values.saoBinhLuan || 5,
    };

    setSubmitting(true);
    try {
      await dispatch(postComment(newComment)).unwrap();
      notification.success({
        message: "Thành công",
        description: "Bình luận đã được gửi!",
      });
      await dispatch(fetchCommentsByRoom(roomId));
      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: error as string,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg rounded-lg p-6 mt-8 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Bình luận</h2>
        <Select
          value={filterStar}
          onChange={(value) => {
            setFilterStar(value);
            setCurrentPage(1);
          }}
          className="w-40"
        >
          {[6, 5, 4, 3, 2, 1, 0].map((star) => (
            <Select.Option key={star} value={star}>
              {star === 6 ? "Tất cả" : `${star} Sao`}
            </Select.Option>
          ))}
        </Select>
      </div>
      {loading ? (
        <div className="flex justify-center mt-4">
          <Spin size="large" />
        </div>
      ) : error ? (
        <div className="flex justify-center mt-4">
          <p className="text-red-500 font-bold mt-2">
            Đã xảy ra lỗi: {error}. Vui lòng thử lại!
          </p>
        </div>
      ) : (
        <List
          dataSource={paginatedComments}
          renderItem={(item) => (
            <List.Item key={item.id} className="border-b pb-3">
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.avatar || undefined}
                    alt="Avatar"
                    size={45}
                    className="flex items-center justify-center"
                    icon={<UserOutlined className="text-2xl" />}
                  />
                }
                title={
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="font-bold text-gray-800">
                      {item.tenNguoiBinhLuan}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {dayjs(item.ngayBinhLuan).fromNow()}
                    </span>
                  </div>
                }
                description={
                  <div>
                    <Rate
                      disabled
                      defaultValue={item.saoBinhLuan}
                      className="text-yellow-500 text-sm mb-1"
                    />
                    <p className="text-gray-700">{item.noiDung}</p>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredComments.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>

      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        className="mt-6"
      >
        <Form.Item label="Đánh giá của bạn" name="saoBinhLuan" initialValue={5}>
          <Rate />
        </Form.Item>
        <Form.Item
          label="Viết bình luận của bạn"
          name="noiDung"
          initialValue=""
        >
          <Input.TextArea rows={3} placeholder="Nhập bình luận..." />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={submitting}>
          Gửi bình luận
        </Button>
      </Form>
    </Card>
  );
};

export default CommentSection;
