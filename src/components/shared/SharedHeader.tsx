import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type sharedHeader = {
  title: string;
  fontSize: number;
  isBackIcon: "flex" | "none"; // to show the back button
  isSettings: "flex" | "none"; // to show the setting icon
};
export default function SharedHeader({
  title,
  fontSize,
  isBackIcon,
  isSettings,
}: sharedHeader) {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.sameTxt, { fontSize }]}>{title}</Text>
          <Ionicons
            name="arrow-forward"
            size={25}
            color={"white"}
            style={{ display: isBackIcon }}
            onPress={()=>{
              router.back()
            }}
          />
        </View>
        <Ionicons
          name="settings-outline"
          size={30}
          color={"snow"}
          style={{ display: isSettings }}
          onPress={()=>{
            router.push('./Settings')
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  //909472
  container: {
    flexDirection: "row",
    backgroundColor: "#9e886f",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    margin: 5,
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  sameTxt: {
    color: "snow",
    fontFamily: "Kufam-Italic",
    margin: 9,
  },
});
