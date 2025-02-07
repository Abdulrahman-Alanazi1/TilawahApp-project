import { View, StyleSheet } from "react-native";
import React from "react";
import SharedHeader from "../../components/shared/SharedHeader";
import HomeBanner from "../../components/shared/HomeBanner";
import QuranButton from "../../components/home/QuranButton";
import ButtonLists from "../../components/home/ButtonLists";
import { Stack } from "expo-router";
export default function index() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Home",
          headerShown: true,
          header: () => (
            <SharedHeader
              title="الرئيسية"
              fontSize={17}
              isBackIcon="none"
              isSettings="flex"
            />
          ),
        }}
      />
      <HomeBanner isSalah="flex" isDateShowen="none"/>
      <QuranButton />
      <ButtonLists />
    </View>
  );
}
const styles = StyleSheet.create({
  //#3e6b66
  container: {
    flex: 1,
    backgroundColor: "#f0ebdd",
  },
});
