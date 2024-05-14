import { Slot } from "expo-router";
import { useFonts } from "expo-font";
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <Slot className="font-poppins" onLayout={onLayoutRootView}/>;
}
