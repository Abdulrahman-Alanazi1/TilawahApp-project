import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerType: "slide",
          drawerPosition: "right",
          swipeEnabled: false,
          headerShown:false
        }}
      >
         <Drawer.Screen
        name="QuranPage"
        options={{
          title: 'القرآن الكريم', 
          drawerLabelStyle:{
            fontFamily:'Kufam-Italic',
            textAlign:'right'
            
          }
        }}
      />
      </Drawer>
    </GestureHandlerRootView>
  );
}
export const unstable_settings = {
  // Ensure that pressing the back button behaves as expected
  // on Android
  android: {
    unstable_backButtonBehavior: "none",
  },
};
