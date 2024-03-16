import { AvatarImageSource } from "react-native-paper/lib/typescript/components/Avatar/AvatarImage";

export default interface Announcement {
  id: number;
  carMake: string;
  carModel: string;
  carModelYear: number;
  price: string;
  avatar: string;
  saler: string;
  phone: string;
  country: string;
  city: string;
  description: string;
}
