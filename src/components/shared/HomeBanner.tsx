import {
  Text,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import momentHijri from "moment-hijri";
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
        <Text style={[styles.sameTxt,{display: isSalah}]}>salah timer  -- here</Text>
        <Text style={[styles.sameTxt,{display: isDateShowen}]}>{hijri}</Text>
      </ImageBackground>
     
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
 
});
