import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import React from "react";
import momentHijri from "moment-hijri";
import { Ionicons } from "@expo/vector-icons";
import Mosque from "../../assets/mosque.svg";
import { router } from "expo-router";

type Banner = {
  isSalah : 'flex' | 'none'
  isDateShowen: 'flex' | 'none'

}
export default function HomeBanner({isSalah, isDateShowen}:Banner) {
  const hijri = momentHijri().format("iD - iMMMM (iMM), iYYYY");
  const milad = momentHijri().format("D - MMMM (MM), YYYY");

  return (
    <View>
      <ImageBackground
        imageStyle={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          resizeMode: "cover",
        }}
        source={require("../../assets/islamicBanner.png")}
        style={styles.contentContainer}
      >
        <Text style={[styles.sameTxt ,{display: isSalah}]}>{hijri}</Text>
        <Text style={[styles.sameTxt,{display: isSalah}]}>{milad}</Text>
        <Text style={[styles.sameTxt,{display: isDateShowen}]}>{hijri}</Text>
      </ImageBackground>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          router.push("./PrayersTime");
        }}
      >
        <View style={[styles.salahView, {display:isSalah}]}>
          <Text
            style={{
              fontFamily: "Kufam-Italic",
              fontSize: 13,
              color: "white",
            
            }}
          >
            مواعيد الصلاة
          </Text>
          {/* <Ionicons name="time-outline" size={24} color={"white"} /> */}
          <Mosque width={50} height={40} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  contentContainer: {
    height:125,
    margin: 10,
    padding: 10,
    justifyContent:'center',
    flexDirection: "column",
    //backgroundColor: "#355f5b",
  },
  sameTxt: {
    color: "#a89075",
    textAlign: "center",
    fontSize: 13,
    padding: 10,
    fontFamily: "Kufam-Italic",
  },
  salahView: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginRight: 10,
    alignItems:"flex-end",
    backgroundColor: "#a89075",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginLeft: 10,
    elevation: 10,
    padding: 10,
  },
  Link: {},
});
