import { StatusBar } from "expo-status-bar";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CountryPicker from "react-native-country-picker-modal";
import { Link, Redirect, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { SocialIcon } from "../../../constant/SocialIcon";

import { auth, db } from "../../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { count, doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

import { useGlobalContext } from "../../../context/GlobalProvider";

export default function Register() {
  const [countryCode, setCountryCode] = useState("ID");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);
  const [isChecked, setIsChecked] = useState(false);

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
  };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/orders" />;

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        return updateProfile(res.user, {
          displayName,
        });
      })
      .then(() => {
        const userData = {
          email,
          password,
          displayName,
          countryCode,
          phoneNumber,
          gender,
        };
        setDoc(doc(db, "users", auth.currentUser.uid), userData);
        router.replace("/orders");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View className="justify-center gap-3 px-6 py-16 bg-white font-poppins">
      <Link href="/welcome" className="mb-4">
        <View className="flex flex-row items-center">
          <Ionicons name="chevron-back" size={26} color="black" />
          <Text className="text-lg text-gray-600 font-poppins">Back</Text>
        </View>
      </Link>
      <Text className="text-2xl font-semibold font-poppins">
        Create an account
      </Text>
      <TextInput
        placeholder="Name"
        value={displayName}
        onChangeText={setDisplayName}
        className="w-full px-4 py-3 text-black border border-gray-200 rounded-md font-poppins focus:caret-black focus:text-black focus:border-black"
      />
      <TextInput
        placeholder="Email"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
        className="w-full px-4 py-3 text-black border border-gray-200 rounded-md font-poppins focus:caret-black focus:text-black focus:border-black"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="w-full px-4 py-3 text-black border border-gray-200 rounded-md font-poppins focus:caret-black focus:text-black focus:border-black"
      />
      <View className="flex flex-row items-center w-full px-4 py-3 space-x-2 border border-gray-200 rounded-md">
        <CountryPicker
          withCallingCode
          withFilter
          withCallingCodeButton
          withAlphaFilter
          countryCode={countryCode}
          onSelect={onSelectCountry}
        />
        <TextInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          className="w-full font-poppins"
        />
      </View>
      <DropDownPicker
        open={open}
        value={gender}
        items={items}
        setOpen={setOpen}
        setValue={setGender}
        setItems={setItems}
        placeholder="Gender"
        placeholderStyle={{ color: "#9ca3af" }}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
      <View className="flex flex-row items-center w-5/6 space-x-2 ">
        <TouchableWithoutFeedback onPress={toggleCheckbox}>
          {isChecked ? (
            <AntDesign name="checkcircle" size={20} color="green" />
          ) : (
            <View className="w-5 h-5 border border-gray-400 rounded-full" />
          )}
        </TouchableWithoutFeedback>
        <Text className="text-sm text-gray-400 font-poppins">
          By signing up. you agree to the{" "}
          <Text className="text-secondary">Terms of service</Text> and{" "}
          <Text className="text-secondary">Privacy policy.</Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleSignUp}
        className="items-center w-full py-3 rounded bg-primary"
      >
        <Text className="font-semibold text-white font-poppins">Sign Up</Text>
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
        Already have an account?{" "}
        <Link href="/login" className="text-secondary">
          Sign In
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
    marginTop: 10,
    marginLeft: 12,
    borderColor: "#e5e7eb",
  },
});
