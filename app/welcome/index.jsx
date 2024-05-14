import { StatusBar } from "expo-status-bar";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import welcome from "../../assets/images/welcome.png";
import { Link } from "expo-router";

export default function Welcome() {
  return (
    <View className="items-center justify-center flex-1 gap-20 bg-white font-poppins">
      <View className="flex items-center gap-3">
        <Image
          source={welcome}
          className="object-cover w-[357px] h-[276px] mb-2"
        />
        <Text className="text-2xl font-semibold font-poppins">Welcome</Text>
        <Text className="text-gray-400 font-poppins">
          Have a better sharing experience
        </Text>
      </View>
      <View className="flex items-center w-full gap-3">
        <TouchableOpacity className="flex items-center w-3/4 py-3 rounded-md bg-primary">
          <Text className="text-white font-poppins">Create an account</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center w-3/4 py-3 border rounded-md border-primary">
          <Text className="text-primary font-poppins">Log In</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
