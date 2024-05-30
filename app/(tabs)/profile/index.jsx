import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import profile from "../../../assets/images/profile.png";
import DropDownPicker from "react-native-dropdown-picker";
import CountryPicker from "react-native-country-picker-modal";

import { setDoc, doc } from "firebase/firestore";

import { auth, db } from "../../../firebase/config";
import { signOut } from "firebase/auth";
import { router } from "expo-router";
import { getUser } from "../../api/users";

export default function Profile() {
  const [loading, setLoading] = useState(true);

  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
  };

  const [gender, setGender] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (auth.currentUser) {
          const user = await getUser(auth.currentUser.uid);
          setEmail(user.email);
          setDisplayName(user.displayName);
          setCountryCode(user.countryCode);
          setPhoneNumber(user.phoneNumber);
          setGender(user.gender);
        } else {
          console.error("No authenticated user found.");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const userData = { email, displayName, countryCode, phoneNumber, gender };
      await setDoc(doc(db, "users", auth.currentUser.uid), userData);
      console.log("User data updated successfully");
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.replace("/welcome");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#5B1F15" />
      </View>
    );
  }
  
  return (
    <View className="justify-center flex-1 gap-4 px-6 bg-white font-poppins">
      <View className="items-center justify-center gap-4 ">
        <Text className="text-base font-semibold">Profile</Text>
        <Image
          source={profile}
          className="object-cover rounded-full w-[138px] h-[138px]"
        />
        <Text className="text-xl font-normal text-[#5A5A5A] font-poppins mb-4">
          {displayName}
        </Text>
        <View className="w-full">
          <Text className="mb-1 ml-1 font-bold text-black font-poppins">
            Email
          </Text>
          <TextInput
            placeholder={email}
            placeholderTextColor={"#5A5A5A"}
            caretHidden
            className="w-full px-4 py-3 text-black border border-gray-300 rounded-md focus:caret-black placeholder:text-gray-200 focus:text-black focus:border-black"
          />
        </View>
        <View className="w-full">
          <Text className="mb-1 ml-1 font-bold text-black mb-">Phone Number</Text>
          <View className="flex flex-row items-center w-full px-4 py-1.5 space-x-2 text-black border border-gray-300 rounded-md focus:caret-black placeholder:text-gray-200 focus:text-black focus:border-blacK">
            <CountryPicker
              withCallingCode
              withFilter
              withCallingCodeButton
              withAlphaFilter
              countryCode={countryCode}
              onSelect={onSelectCountry}
            />
            <View className="pt-1.5">
              <TextInput
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                className="w-full font-poppins"
              />
            </View>
          </View>
        </View>
        <View className="w-full">
          <Text className="mb-1 ml-1 font-bold text-black mb-">Gender</Text>
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
            className="w-full px-4 py-3"
          />
        </View>
      </View>
      <View className="items-center justify-center gap-4">
        <TouchableOpacity
          href="/"
          onPress={handleUpdate}
          className="items-center w-full py-3 border rounded-md border-primary bg-primary"
        >
          <Text className="text-white font-poppins">Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          href="/"
          onPress={handleSignOut}
          className="items-center w-full py-3 border rounded-md border-secondary bg-secondary"
        >
          <Text className="text-white font-poppins">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 4,
    fontFamily: "Poppins-Regular",
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
});
