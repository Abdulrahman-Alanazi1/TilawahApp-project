import { View, Text } from "react-native";
import React from "react";
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from "react-native-safe-area-context";
import AyatTitlesHeader from "../../components/tob-tabs_components/AyatTitlesHeader";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* custom header bellow */}
      <AyatTitlesHeader />
      {/* tob tabs bellow */}
      <MaterialTopTabs
        backBehavior="initialRoute"
        initialRouteName={"AyatTitles"}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#a89075",
          },
          tabBarItemStyle: {},
          tabBarLabelStyle: {
            fontFamily: "Kufam-Italic",
            fontSize: 13,
          },
          tabBarIndicatorStyle: {
            backgroundColor: "snow",
            height: 4.6,
            borderRadius: 1000,
          },
          tabBarActiveTintColor: "white",
        }}
      >
        <MaterialTopTabs.Screen
          name="Ajza"
          options={{
            tabBarLabel: "الأجزاء",
          }}
        />
        <MaterialTopTabs.Screen
          name="AyatTitles"
          options={{
            tabBarLabel: "سورة",
          }}
        />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}
