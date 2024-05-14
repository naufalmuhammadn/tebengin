import { SocialIcon } from "../constant/SocialIcon";
import {
  View,
  TouchableOpacity,
} from "react-native";

export default function SocialMedia() {
  return (
    <View className="flex flex-row items-center justify-center w-full px-4 py-3 space-x-2 border border-gray-200 rounded-md">
      {SocialIcon.map((icon) => (
        <TouchableOpacity key={icon.name} className="p-2 bg-white rounded-full">
          {icon.icon}
        </TouchableOpacity>
      ))}
    </View>
  );
}
