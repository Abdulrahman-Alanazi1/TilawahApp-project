import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
export default function QuranButton() {
  const image1 = {
    uri: "https://png.pngtree.com/png-clipart/20211009/original/pngtree-calligraphy-alquran-element-vintage-png-image_6847078.png",
  };
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={()=>{
        router.push('./(drawer)/QuranPage')
    }}>
      <View style={styles.quranView}>
        <View style={styles.quranContent}>
          <Image source={{ uri: image1.uri }} style={styles.quranImg} />
          <Text
            style={{ fontSize: 18, fontFamily: "Kufam-Italic", color: "#a27e31" }}
          >
            القرآن الكريم
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  //#355f5b
  quranView: {
    alignItems: "center",
    flexDirection: "row-reverse",
    backgroundColor: "#f0ebdd",
    margin: 10,
    borderRadius: 10,
    elevation:5
  },
  quranContent: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 5,
  },
  quranImg: {
    height: 150,
    width: 160,
  },
});
