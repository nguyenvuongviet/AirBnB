import { DownOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Popover, notification } from "antd";
import { useEffect, useState } from "react";
import { dataMenuDropdown } from "../DropdownItem";

interface DropdownBookingProps {
  totalOfGuest: number;
  onGuestChange: (guests: number) => void;
}

const DropdownBooking: React.FC<DropdownBookingProps> = ({
  totalOfGuest,
  onGuestChange,
}) => {
  const [data, setData] = useState(dataMenuDropdown);
  const [open, setOpen] = useState(false);

  const newTotalGuests = data
    .filter((item) => item.id === 1 || item.id === 2)
    .reduce((sum, item) => sum + item.numberOfGuest, 0);

  useEffect(() => {
    onGuestChange(newTotalGuests);
  }, [newTotalGuests, onGuestChange]);

  const togglePopover = (status: boolean) => setOpen(status);

  const showNotification = (message: string, description: string) => {
    notification.warning({ message, description, placement: "topRight" });
  };

  const updateGuestCount = (id: number, isAdding: boolean) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        const newCount = item.numberOfGuest + (isAdding ? 1 : -1);
        return { ...item, numberOfGuest: Math.max(0, newCount) };
      }
      return item;
    });

    if (newTotalGuests > totalOfGuest) {
      showNotification("Thông báo", `Số khách tối đa là ${totalOfGuest}`);
    } else {
      setData(updatedData);
    }
  };

  const renderContent = () => (
    <div className="space-y-4 py-4 max-w-[330px]">
      {data.map(({ id, title, description, numberOfGuest }) => (
        <div key={id} className="flex justify-between items-center">
          <div className="w-2/3">
            <h4 className="text-lg font-medium">{title}</h4>
            <p className={id === 4 ? "underline font-medium" : ""}>
              {description}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="small"
              shape="circle"
              icon={<MinusOutlined />}
              onClick={() => updateGuestCount(id, false)}
              disabled={
                numberOfGuest === 0 || (id === 1 && numberOfGuest === 1)
              }
            />
            <span className="text-lg font-medium">{numberOfGuest}</span>
            <Button
              size="small"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={() => updateGuestCount(id, true)}
              disabled={
                id === 4 ||
                ((id === 1 || id === 2) && newTotalGuests >= totalOfGuest)
              }
            />
          </div>
        </div>
      ))}
      <p className="text-[13px]">
        Chỗ ở này cho phép tối đa <strong>{totalOfGuest}</strong> khách, không
        tính em bé. Không được mang theo thú cưng.
      </p>
      <div className="flex justify-end">
        <Button onClick={() => togglePopover(false)}>Đóng</Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={renderContent}
      trigger="click"
      open={open}
      onOpenChange={togglePopover}
    >
      <div className="flex justify-between p-4 border border-gray-300 rounded-xl hover:border-black">
        <div className="leading-snug">
          <p className="font-bold text-xs uppercase">Khách</p>
          <p className="text-sm">{newTotalGuests} khách</p>
        </div>
        <DownOutlined />
      </div>
    </Popover>
  );
};

export default DropdownBooking;
