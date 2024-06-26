import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import welcome from "../assets/images/welcome.png";
import { Link, Redirect } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";

export default function Welcome() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;
  
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
        <Link href="/register" className="w-3/4 py-3 text-center rounded-md bg-primary">
          <Text className="text-white font-poppins">Create an account</Text>
        </Link>
        <Link href="/login" className="w-3/4 py-3 text-center border rounded-md border-primary">
          <Text className="text-primary font-poppins">Log In</Text>
        </Link>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}