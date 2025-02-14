import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import momentHijri from "moment-hijri";
import { Ionicons } from "@expo/vector-icons";
import Mosque from "../../assets/mosque.svg";
import MosqueView from "../../assets/mosqueView.svg";
type salahProp = {
  isSalah: "flex" | "none";
  isDateShowen: "flex" | "none";
};
export default function SalahTime({ isSalah, isDateShowen }: salahProp) {
  const hijri = momentHijri().format("iD  iMMMM (iMM), iYYYY ") + "هج";

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.timeContainer}>
        <View style={styles.dateContainer}>
          <Ionicons name="arrow-back" size={24} color={"#a89075"} />
          <Text style={[styles.sameTxt, { display: isSalah }]}>{hijri}</Text>
          <Ionicons name="arrow-forward" size={24} color={"#a89075"} />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View style={styles.athanTime}>
            <MosqueView width={50} height={40} />
            <Text>Fajr</Text>
            <Text>00:00</Text>
          </View>
          <View style={styles.athanTime}>
            <MosqueView width={50} height={40} />
            <Text>dahr</Text>
            <Text>00:00</Text>
          </View>
          <View style={styles.athanTime}>
            <MosqueView width={50} height={40} />
            <Text>Asr</Text>
            <Text>00:00</Text>
          </View>
          <View style={styles.athanTime}>
            <MosqueView width={50} height={40} />
            <Text>Magrib</Text>
            <Text>00:00</Text>
          </View>
          <View style={styles.athanTime}>
            <MosqueView width={50} height={40} />
            <Text>Isha</Text>
            <Text>00:00</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          router.push("./PrayersTime");
        }}
      >
        <View style={[styles.salahView, { display: isSalah }]}>
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
  timeContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    padding: 5,
    margin: 5,
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sameTxt: {
    color: "#a89075",
    textAlign: "center",
    fontSize: 15,
    fontFamily: "Kufam-Italic",
  },
  athanTime: {
    borderColor: "#a89075",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor:'#cfbba5',
    elevation:5
  },
  salahView: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginRight: 10,
    alignItems: "flex-end",
    backgroundColor: "#a89075",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginLeft: 10,
    elevation: 10,
    padding: 10,
  },
});
