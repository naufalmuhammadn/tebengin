import { StatusBar } from "expo-status-bar";
import { Image, Text, TextInput, View, StyleSheet } from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { Link } from "expo-router";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function Welcome() {
  const [countryCode, setCountryCode] = useState("ID");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
  };

  return (
    <View className="justify-center flex-1 px-6 bg-white font-poppins">
      <View className="gap-3">
        <Text className="text-2xl font-semibold font-poppins">
          Create an account
        </Text>
        <TextInput
          placeholder="Name"
          caretHidden
          className="w-full px-4 py-3 text-black border border-gray-200 rounded-md focus:caret-black placeholder:text-gray-200 focus:text-black focus:border-black"
        />
        <TextInput
          placeholder="Email"
          autoComplete="email"
          className="w-full px-4 py-3 text-black border border-gray-200 rounded-md focus:caret-black placeholder:text-gray-200 focus:text-black focus:border-black"
        />
        <View className="flex flex-row items-center w-full px-4 py-3 border border-gray-200 rounded-md">
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
            keyboardType="phone-pad"
            className="w-full pl-2"
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
          dropDownPosition={9}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    dropdown: {
      borderWidth: 1,
      borderColor: '#e5e7eb',
      borderRadius: 4,
      marginBottom: 16,
    },
    dropdownContainer: {
      borderWidth: 1,
      borderColor: '#e5e7eb',
    }
  });
