import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="items-center justify-center flex-1 bg-white">
      <Text className="font-bold font-poppins">Welcome to TebengInss!</Text>
      <Link href="/ordersummary">Welcome</Link>
      <StatusBar style="auto" />
    </View>
  );
}
