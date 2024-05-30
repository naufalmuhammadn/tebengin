import React, { useState, useEffect } from "react";
import { Image, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import options1 from "../assets/images/tebengride.png";
import profilePic from "../assets/images/profile.png";
import { getRide, updateRideRating } from "../app/api/rides";

export default function OrderSummary() {
  const { id } = useLocalSearchParams();
    const navigation = useNavigation();

  const [rideData, setRideData] = useState({
    driverName: "",
    plat: "",
    userName: "",
    departureTime: "",
    pickUp: "",
    destination: "",
    pickupLocation: "",
    price: "",
    status: "",
    date: "",
  });
  const [rating, setRating] = useState(0);
  const [ulasan, setUlasan] = useState("");
  const [ratingStatus, setRatingStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRideData = async () => {
      try {
        const ride = await getRide(id);
        setRideData({
          driverName: ride.driver,
          plat: ride.plat,
          userName: ride.user,
          departureTime: ride.departureTime,
          pickUp: ride.pickUp,
          destination: ride.destination,
          pickupLocation: ride.pickUp,
          price: ride.price,
          status: ride.status,
          date: ride.date,
        });

        if (ride.ratingStatus === true) {
          setRating(ride.rating);
          setUlasan(ride.ulasan);
          setRatingStatus(ride.ratingStatus);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRideData();
  }, []);

  const handleRating = (index) => {
    setRating(index + 1);
  };

  const handleUlasanChange = (text) => {
    setUlasan(text);
  };

  const handleUpdateRating = async () => {
    try {
      setRatingStatus(true);
      await updateRideRating(id, rating, ulasan, true);
      console.log("Rating updated successfully.");
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1 flex py-6 bg-white w-full">
      <View className="mb-8">
        <View className="flex-row items-center px-4">
            <Ionicons name="chevron-back"  onPress={() => navigation.goBack()}  size={24} color="black" />
            <Text className="text-xl font-bold pl-2">Order Summary</Text>
        </View>
      </View>
      <View className="flex-row mb-2 px-4 items-center">
        <Image source={options1} className="w-12 h-12" />
        <View className="flex-1 ml-4">
          <Text className="text-lg text-black">TebengRide</Text>
          <Text className="text-xs text-gray-600 capitalize">Trip {rideData.status}</Text>
        </View>
        <View className="items-end">
          <Text className="text-xs text-gray-500">{rideData.date}</Text>
          <Text className="text-xs text-gray-500">Order {id}</Text>
        </View>
      </View>
      <View className="flex-row border-b px-4 border-gray-400 mb-2" />

      {rideData.status === "completed" && (
        <>
          <Text className="text-base font-bold text-center">
            Bagaimana {rideData.userName}?
          </Text>
          <View className="flex-row mb-4 justify-center">
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleRating(index)}
                disabled={ratingStatus === true}
              >
                <Ionicons
                  name={index < rating ? "star" : "star-outline"}
                  size={24}
                  color={index < rating ? "#FFD700" : "#E0E0E0"}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            className="border border-gray-400 rounded-lg p-2 mb-4 text-top"
            placeholder="Berikan ulasan untuk driver..."
            value={ulasan}
            onChangeText={handleUlasanChange}
            numberOfLines={4}
            editable={ratingStatus !== true}
          />
          <View className="flex-row border-b border-gray-400 mb-2" />
        </>
      )}

      <View className="flex-row items-center mb-4 px-4">
        <Image source={profilePic} className="w-12 h-12 rounded-full" />
        <View className="flex-1 ml-4">
          <Text className="text-base font-bold">{rideData.driverName}</Text>
          <Text className="text-xs text-gray-600">
            {rideData.plat}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-base">
            <Ionicons name="star" size={16} color="#FFD700" />
            4.9/5.0
          </Text>
        </View>
      </View>
      <View className="flex-row border-b border-gray-400 mb-2" />

      <View className="mb-2 px-4">
        <Text className="text-base font-bold mb-2">Detail Perjalanan</Text>
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center flex-1">
            <Ionicons name="location" size={16} />
            <View className="ml-2">
              <Text className="text-sm font-semibold">Lokasi Jemput</Text>
              <Text className="text-sm">{rideData.pickUp}</Text>
            </View>
          </View>
          <View className="flex-row items-center ml-2 flex-1">
            <Ionicons name="location" size={16} />
            <View className="ml-2">
              <Text className="text-sm font-semibold">Lokasi Antar</Text>
              <Text className="text-sm">{rideData.destination}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-row border-b border-gray-400 mb-2 px-4" />

      {rideData.status !== "cancelled" && (
        <View className="mb-4">
            <Text className="text-base font-bold mb-2">Detail Pembayaran</Text>
            <Text className="text-sm text-gray-600 mb-1">
                Biaya Perjalanan: {rideData.price}
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
                Biaya Admin: Rp 2.000
            </Text>
            <Text className="text-sm text-gray-600 mb-1">
                Voucher Diskon: -Rp 3.000
            </Text>
            <Text className="text-sm text-gray-600 mb-1">Total: Rp 7.000</Text>
            <Text className="text-sm text-gray-600 mb-1">Cash: Rp 7.000</Text>
        </View>
      )}

      {rideData.status === "completed" && (
        <TouchableOpacity 
          onPress={handleUpdateRating} 
          className={`p-3 rounded-lg items-center ${ratingStatus === true ? "bg-white" : "bg-red-900"}`}
          disabled={ratingStatus === true}
        >
          <Text className={`${ratingStatus === true ? "text-black" : "text-white"} text-lg font-bold`}>
            {ratingStatus === true ? "Completed" : "Done"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}