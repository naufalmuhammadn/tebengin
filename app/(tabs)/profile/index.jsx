import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import profile from "../../../assets/images/profile.png";

import { auth } from "../../../firebase/config";
import { signOut } from "firebase/auth";
import { router } from "expo-router";
import { getUser } from "../../api/users/indes";

export default function Profile() {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (auth.currentUser) {
                    const user = await getUser(auth.currentUser.uid);
                    setUserData(user);
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

    const handleSignOut = () => {
        signOut(auth).then(() => {
            console.log("Sign out success");
            router.replace("/welcome");
          }).catch((error) => {
            console.log(error);
          });
    }

    return (
    <View className="justify-center flex-1 gap-4 px-6 bg-white font-poppins">
        <View className="items-center justify-center gap-4 ">
            <Text className="text-base font-semibold">Profile</Text>
            <Image
                source={profile}
                className="object-cover rounded-full w-[138px] h-[138px]"
            />
            <Text className="text-xl font-normal text-[#5A5A5A] font-poppins mb-4">Syahrial Alzaidan</Text>
            <TextInput
                placeholder={userData.displayName}
                placeholderTextColor={"#5A5A5A"}
                caretHidden
                className="w-full h-12 px-4 py-3 text-black border border-gray-300 rounded-md focus:caret-black placeholder:text-gray-200 focus:text-black focus:border-black"
            />
            <TextInput
                placeholder={userData.phoneNumber}
                placeholderTextColor={"#5A5A5A"}
                keyboardType="phone-pad"
                className="w-full h-12 px-4 py-3 text-black border border-gray-300 rounded-md focus:caret-black placeholder:text-gray-200 focus:text-black focus:border-black"
            />
            <TextInput
                placeholder={userData.gender}
                placeholderTextColor={"#5A5A5A"}
                caretHidden
                className="w-full h-12 px-4 py-3 text-black border border-gray-300 rounded-md focus:caret-black placeholder:text-gray-200 focus:text-black focus:border-black"
            />
            <TextInput
                placeholder="Jl.Cisitu"
                placeholderTextColor={"#5A5A5A"}
                caretHidden
                className="w-full h-12 px-4 py-3 text-black border border-gray-300 rounded-md focus:caret-black placeholder:text-gray-200 focus:text-black focus:border-black"
            />
        </View>
        <View className="items-center justify-center gap-4">
            <TouchableOpacity href="/" className="items-center w-full py-3 border rounded-md border-primary bg-primary">
                <Text className="text-white font-poppins">Update</Text>
            </TouchableOpacity>

            <TouchableOpacity href="/" onPress={handleSignOut} className="items-center w-full py-3 border rounded-md border-secondary bg-secondary">
                <Text className="text-white font-poppins">Sign Out</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}