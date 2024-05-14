import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
// Uncomment if you run on web!
// import { NativeWindStyleSheet } from "nativewind";
// NativeWindStyleSheet.setOutput({
//   default: "native",
// });

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text>Welcome to TebengIn!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
