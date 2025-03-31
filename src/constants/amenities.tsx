import { JSX } from "react";
import {
  TbAirConditioning,
  TbDeviceTv,
  TbIroning3,
  TbIroningSteam,
  TbParkingCircle,
  TbSwimming,
  TbToolsKitchen2,
  TbWashMachine,
  TbWifi,
} from "react-icons/tb";
import { Room } from "../models/Room";

export const amenities: {
  name: string;
  field: keyof Room;
  icon: JSX.Element;
}[] = [
  { name: "Wi-Fi", field: "wifi", icon: <TbWifi /> },
  { name: "Nhà bếp", field: "bep", icon: <TbToolsKitchen2 /> },
  { name: "Điều hoà", field: "dieuHoa", icon: <TbAirConditioning /> },
  { name: "Hồ bơi", field: "hoBoi", icon: <TbSwimming /> },
  { name: "Đỗ xe", field: "doXe", icon: <TbParkingCircle /> },
  { name: "Bàn ủi", field: "banUi", icon: <TbIroning3 /> },
  { name: "Ti-Vi", field: "tivi", icon: <TbDeviceTv /> },
  { name: "Bàn là", field: "banLa", icon: <TbIroningSteam /> },
  { name: "Máy giặt", field: "mayGiat", icon: <TbWashMachine /> },
];
