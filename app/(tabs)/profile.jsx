import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";

import profile from "../../assets/images/profile.png";

export default function Profile() {
    return (
    <View className="justify-center flex-1 gap-4 bg-white font-poppins px-6">
        <View className=" items-center justify-center gap-4">
            <Text className="text-base font-semibold">Profile</Text>
            <Image
                source={profile}
                className="object-cover rounded-full w-[138px] h-[138px]"
            />
            <Text className="text-xl font-normal text-[#5A5A5A] font-poppins mb-4">Syahrial Alzaidan</Text>
            <TextInput
                placeholder="musanghandal@gmail.com"
                placeholderTextColor={"#5A5A5A"}
                caretHidden
                className="w-full px-4 py-3 h-12 text-black border border-gray-300 rounded-md focus:caret-black placeholder:text-gray-200 focus:text-black focus:border-black"
            />
            <TextInput
                placeholder="Phone Number"
                placeholderTextColor={"#5A5A5A"}
                keyboardType="phone-pad"
                className="w-full px-4 py-3 h-12 text-black border border-gray-300 rounded-md focus:caret-black placeholder:text-gray-200 focus:text-black focus:border-black"
            />
            <TextInput
                placeholder="Male"
                placeholderTextColor={"#5A5A5A"}
                caretHidden
                className="w-full px-4 py-3 h-12 text-black border border-gray-300 rounded-md focus:caret-black placeholder:text-gray-200 focus:text-black focus:border-black"
            />
            <TextInput
                placeholder="Jl.Cisitu"
                placeholderTextColor={"#5A5A5A"}
                caretHidden
                className="w-full px-4 py-3 h-12 text-black border border-gray-300 rounded-md focus:caret-black placeholder:text-gray-200 focus:text-black focus:border-black"
            />
        </View>
        <View className="items-center justify-center gap-4">
            <TouchableOpacity href="/" className="w-full py-3 items-center border border-primary rounded-md bg-primary">
                <Text className="text-white font-poppins">Update</Text>
            </TouchableOpacity>

            <TouchableOpacity href="/" className="w-full py-3 items-center border border-secondary rounded-md bg-secondary">
                <Text className="text-white font-poppins">Sign Out</Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}