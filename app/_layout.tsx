import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { View, StatusBar } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
SplashScreen.preventAutoHideAsync();
export default function Homelayout() {
  const [loaded, error] = useFonts({
    "Kufam-Italic": require("../assets/fonts/Kufam-Italic.ttf"),
    'uthmanic_hafs': require("../assets/fonts/uthmanic_hafs.ttf"),
    'HafsSmart': require("../assets/fonts/HafsSmart.ttf"),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  //909472
  NavigationBar.setBackgroundColorAsync("#9e886f"); // this is for changing the color of navigation bar color on android for expo
  StatusBar.setBackgroundColor("#9e886f");
  StatusBar.setBarStyle("default");
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <View style={{flex:1 }}>
        <Stack
          screenOptions={{
            animation: "slide_from_left", 
            headerShown:false
          }}
        >
         
        </Stack>
      </View>
    </GestureHandlerRootView>
  );
}
