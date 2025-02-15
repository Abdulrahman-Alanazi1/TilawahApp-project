import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import momentHijri from "moment-hijri";
import { Ionicons } from "@expo/vector-icons";
import Mosque from "../../assets/mosque.svg";
import MosqueView from "../../assets/mosqueView.svg";
import useAthan from "../../hooks/useAthan";
import AthanTimes from "../../components/prayersTimes/AthanTimes";
import moment from "moment-hijri";

type salahProp = {
  isSalah: "flex" | "none";
  isDateShowen: "flex" | "none";
};
export default function SalahTime({ isSalah, isDateShowen }: salahProp) {
  const hijri = momentHijri().format("iD  iMMMM (iMM), iYYYY ") + "هج";
  const time = moment().format('DD-MM-YYYY')
  const { athan, isLoading } = useAthan(time, 24.774265, 46.738586, 4);

  // convert athan object to 12hr system.
  const convert24To12Hour = (timeString: string): string => {
    const [hoursStr, minutesStr] = timeString.split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (isNaN(hours) || isNaN(minutes)) {
      return "Invalid time format";
    }
    const period = hours >= 12 ? "م" : "ص";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };
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
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View style={[styles.athanTime, {backgroundColor:'#00008b'}]}>
            <MosqueView width={50} height={40} />
            <Text style={{color:'#EEE8AA', fontFamily:'uthmanic_hafs', fontSize:19}}>العشاء</Text>
            <Text style={{color:'#EEE8AA' ,  fontFamily:'uthmanic_hafs', fontSize:15}}>{convert24To12Hour(athan?.data.timings.Isha ?? "N/A")}</Text>
          </View>
          <View style={[styles.athanTime, {backgroundColor:'#cb1212'}]}>
            <MosqueView width={50} height={40} />
            <Text style={{color:'#FFFFE0' ,  fontFamily:'uthmanic_hafs', fontSize:19}}>المغرب</Text>
            <Text style={{color:'#FFFFE0' ,  fontFamily:'uthmanic_hafs', fontSize:15}}>{convert24To12Hour(athan?.data.timings.Maghrib ?? "N/A")}</Text>
          </View>
          <View style={[styles.athanTime, {backgroundColor:'#87ceeb'}]}>
            <MosqueView width={50} height={40} />
            <Text style={{color:'#333333' ,  fontFamily:'uthmanic_hafs', fontSize:19}}>العصر</Text>
            <Text style={{color:'#333333' ,  fontFamily:'uthmanic_hafs', fontSize:15}}>{convert24To12Hour(athan?.data.timings.Asr ?? "N/A")}</Text>
          </View>
          <View style={[styles.athanTime, {backgroundColor:'#f3f390'}]}>
            <MosqueView width={50} height={40} />
            <Text style={{color:'#A0522D' ,  fontFamily:'uthmanic_hafs', fontSize:19}}>الظهر</Text>
            <Text style={{color:'#A0522D' ,  fontFamily:'uthmanic_hafs', fontSize:15}}>{convert24To12Hour(athan?.data.timings.Dhuhr ?? "N/A")}</Text>
          </View>
          <View style={[styles.athanTime, {backgroundColor:'#326475'}]}>
            <MosqueView width={50} height={40} />
            <Text style={{color:'#FFB6C1' ,  fontFamily:'uthmanic_hafs', fontSize:19}}>الفجر</Text>
            <Text style={{color:'#FFB6C1' ,  fontFamily:'uthmanic_hafs', fontSize:15}}>{convert24To12Hour(athan?.data.timings.Fajr ?? "N/A")}</Text>
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
