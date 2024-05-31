import React, { useState, useEffect } from "react";
import { Image, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useLocalSearchParams, router } from "expo-router";

import tebengride from "../../../assets/images/tebengride.png";
import tebengcar from "../../../assets/images/tebengcar.png";
import originPoint from "../../../assets/images/originPoint.png";
import destinationPoint from "../../../assets/images/destinationPoint.png";
import profilePic from "../../../assets/images/profile.png";
import { getRide, updateRideRating } from "../../api/rides";

export default function OrderSummary() {
  const { id } = useLocalSearchParams();

  const [rideData, setRideData] = useState({
    driverName: "",
    driverType: "",
    driverMerk: "",
    plat: "",
    userName: "",
    departureTime: "",
    pickUp: "",
    destination: "",
    pickupLocation: "",
    price: 0,
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
            driverType: ride.driverType,
            driverMerk: ride.driverMerk,
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
  }, [ratingStatus]);

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

  const formatPrice = (price) => {
    return `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

  if (loading) {
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#5B1F15" />
      </View>
    );
  }

  return (
    <View className="flex flex-1 w-full py-6 bg-white">
      <View className="mb-4">
        <View className="flex-row items-center px-4">
            <Ionicons name="chevron-back"  onPress={() => router.back()}  size={24} color="black" />
            <Text className="pl-2 text-xl font-bold">Order Summary</Text>
        </View>
      </View>
      <View className="flex-row items-center mx-4 mb-2">
        <Image source={rideData.driverType === 'car' ? tebengcar : tebengride} className="object-cover w-[60px] h-[60px]" />
        <View className="flex-1 ml-4">
          <Text className="text-lg text-black">TebengRide</Text>
          <Text className="text-xs text-gray-600 capitalize">Trip {rideData.status}</Text>
        </View>
        <View className="items-end flex-1">
          <Text className="text-xs text-gray-500">{rideData.date}</Text>
          <Text className="text-xs text-gray-500">Order {id}</Text>
        </View>
      </View>
      <View className="flex-row px-4 mb-2 border-b border-gray-400" />

      {rideData.status === "completed" && (
        <>
          <Text className="text-base font-bold text-center">
            Bagaimana {rideData.userName}?
          </Text>
          <View className="flex-row justify-center mb-4">
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
            className="p-2 mx-4 mb-4 border border-gray-400 rounded-lg text-top"
            placeholder="Berikan ulasan untuk driver..."
            value={ulasan}
            onChangeText={handleUlasanChange}
            numberOfLines={4}
            editable={ratingStatus !== true}
          />
          <View className="flex-row mb-2 border-b border-gray-400" />
        </>
      )}

      <View className="flex-row items-center mx-4 mb-4">
        <Image source={profilePic} className="w-12 h-12 rounded-full" />
        <View className="flex-1 ml-4">
          <Text className="text-base font-bold">{rideData.driverName}</Text>
          <Text className="text-xs text-gray-600">
            {rideData.plat} • {rideData.driverMerk}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-base">
            <Ionicons name="star" size={16} color="#FFD700" />
            4.9/5.0
          </Text>
        </View>
      </View>
      <View className="flex-row mb-2 border-b border-gray-400" />

      <View className="mx-4 mb-2">
        <Text className="mb-2 text-base font-bold ">Detail Perjalanan</Text>
        <View className="flex flex-col w-full gap-2 mb-2">
          <View className="flex-row items-center ">
            <Image source={originPoint} className="w-8 h-10" />
            <View className="ml-2">
              <Text className="text-sm font-semibold">Lokasi Jemput</Text>
              <Text className="text-sm">{rideData.pickUp}</Text>
            </View>
          </View>
          <View className="flex-row items-center">
            <Image source={destinationPoint} className="w-8 h-10" />
            <View className="ml-2">
              <Text className="text-sm font-semibold">Lokasi Antar</Text>
              <Text className="text-sm">{rideData.destination}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex-row px-4 mb-2 border-b border-gray-400" />

      {rideData.status !== "cancelled" && (
        <View className="mx-4 mb-3">
            <Text className="mb-2 text-base font-bold">Detail Pembayaran</Text>
            <Text className="mb-1 text-sm text-gray-600">
                Biaya Perjalanan: {formatPrice(rideData.price)}
            </Text>
            <Text className="mb-1 text-sm text-gray-600">
                Biaya Admin: {"+ " + formatPrice(2000)}
            </Text>
            <Text className="mb-1 text-sm text-gray-600">Total: {formatPrice(rideData.price + 2000)}</Text>
        </View>
      )}

      {rideData.status === "completed" && (
        <TouchableOpacity 
          onPress={handleUpdateRating} 
          className={`mx-4 py-3 rounded-lg items-center ${ratingStatus === true ? "bg-white" : "bg-red-900"}`}
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