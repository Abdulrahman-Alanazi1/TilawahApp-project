import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
export default function AyatTitlesHeader() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row-reverse", alignItems: "center", marginRight:10 }}>
        <Ionicons name="arrow-forward" color={"snow"} size={25} onPress={()=>{router.dismiss()}}/>
        <Text style={styles.sameTxt}>الفـهرس</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding:10 }}>
        <Ionicons name="home-sharp" color={"snow"} size={25} onPress={()=>{router.dismissAll()}}/>
        <Ionicons style={{marginLeft:10}} name="search-sharp" color={"snow"} size={25} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  //355f5b
  container: {
    backgroundColor: "#9e886f",
    flexDirection: "row-reverse",
    padding: 7,
  
    alignItems: "center",
    justifyContent: "space-between",
  },
  sameTxt: {
    fontSize: 18,
    fontFamily: "Kufam-Italic",
    color: "snow",
    marginRight: 5,
  },
});
