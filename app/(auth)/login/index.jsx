import { StatusBar } from "expo-status-bar";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";
import { SocialIcon } from "../../../constant/SocialIcon";
import { useGlobalContext } from "../../../context/GlobalProvider";

export default function Login() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;
  return (
    <View className="justify-center gap-3 px-6 py-16 bg-white font-poppins">
      <Link href="/welcome" className="mb-4">
        <View className="flex flex-row items-center">
          <Ionicons name="chevron-back" size={26} color="black" />
          <Text className="text-lg text-gray-600 font-poppins">Back</Text>
        </View>
      </Link>
      <Text className="text-2xl font-semibold font-poppins">
        Sign in
      </Text>
      <TextInput
        placeholder="Email or Phone Number"
        className="w-full px-4 py-3 text-black border border-gray-200 rounded-md font-poppins focus:caret-black placeholder:text-gray-200 focus:text-black focus:border-black"
      />
      <TextInput
        placeholder="Enter Your Password"
        secureTextEntry
        className="w-full px-4 py-3 text-black border border-gray-200 rounded-md font-poppins focus:caret-black placeholder:text-gray-200 focus:text-black focus:border-black"
      />
      <Text className="font-semibold text-right text-secondary font-poppins">Forget Password?</Text>
      <TouchableOpacity className="items-center w-full py-3 rounded bg-primary">
        <Text className="font-semibold text-white font-poppins">Sign In</Text>
      </TouchableOpacity>
      <View className="flex flex-row items-center space-x-2">
        <View className="flex-1 h-0.5 bg-gray-200" />
        <Text className="text-gray-400 font-poppins">or</Text>
        <View className="flex-1 h-0.5 bg-gray-200" />
      </View>
      <View className="flex flex-row items-center justify-center w-full px-4 py-3 space-x-4 rounded-md">
        {SocialIcon.map((icon) => (
          <TouchableOpacity
            key={icon.name}
            className="p-4 bg-white border border-gray-200 rounded-md"
          >
            {icon.icon}
          </TouchableOpacity>
        ))}
      </View>
      <Text className="text-sm text-center text-gray-500 font-poppins">
        Don't have an account?{" "}
        <Link href="/register" className="text-secondary">
          Sign Up
        </Link>
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    fontFamily: "Poppins-Regular",
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
});
