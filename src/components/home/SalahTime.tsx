import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import momentHijri from "moment-hijri";
import { Ionicons } from "@expo/vector-icons";
import Mosque from "../../../assets/mosque.svg";
import MosqueView from "../../../assets/mosqueView.svg";
import useAthan from "../../hooks/useAthan";
import moment from "moment-hijri";

type salahProp = {
  isSalah: "flex" | "none";
  isDateShowen: "flex" | "none";
};
export default function SalahTime({ isSalah, isDateShowen }: salahProp) {
  const [currentDate, setCurrentDate] = useState(moment()); // Store date as moment object
  const [time, setTime] = useState(currentDate.format("DD-MM-YYYY"));
  const hijri =
    momentHijri(currentDate).format("iD iMMMM (iMM), iYYYY ") + "هج"; // Use currentDate
  const { athan, isLoading, error } = useAthan(time, 24.774265, 46.738586, 4);

  useEffect(() => {
    setTime(currentDate.format("DD-MM-YYYY")); // Update time when currentDate changes
  }, [currentDate]);

  const handlePrevDay = () => {
    setCurrentDate(moment(currentDate).subtract(1, "day"));
    console.log("pressed");
  };

  const handleNextDay = () => {
    setCurrentDate(moment(currentDate).add(1, "day")); 
    console.log("pressed");
  };
  // convert athan object to 12hr system.
  const convert24To12Hour = (timeString: string | undefined): string => {
    if (!timeString) return "N/A"; // Return "N/A" if timeString is undefined

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
          <TouchableOpacity onPress={handleNextDay}>
            <Ionicons name="arrow-back" size={24} color={"#a89075"} />
          </TouchableOpacity>
          <Text style={[styles.sameTxt, { display: isSalah }]}>{hijri}</Text>
          <TouchableOpacity onPress={handlePrevDay}>
            <Ionicons name="arrow-forward" size={24} color={"#a89075"} />
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={'black'}/>
        ): error ? (
          <Text style={{padding:10, textAlign:'center'}}>لا توجد بيانات حاليا, تحقق من أتصالك</Text>
        ): athan ? (
          <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View style={[styles.athanTime, { backgroundColor: "#00008b" }]}>
            <MosqueView width={50} height={40} />
            <Text
              style={[styles.salahName,{color: "#EEE8AA"}]}
            >
              العشاء
            </Text>
            <Text
              style={[styles.salahTime,{color: "#EEE8AA"}]}
            >
              {convert24To12Hour(athan?.data.timings.Isha)}
            </Text>
          </View>
          <View style={[styles.athanTime, { backgroundColor: "#cb1212" }]}>
            <MosqueView width={50} height={40} />
            <Text
              style={[styles.salahName,{color: "#FFFFE0"}]}
            >
              المغرب
            </Text>
            <Text
              style={[styles.salahTime,{color: "#FFFFE0"}]}
            >
              {convert24To12Hour(athan?.data.timings.Maghrib)}
            </Text>
          </View>
          <View style={[styles.athanTime, { backgroundColor: "#87ceeb" }]}>
            <MosqueView width={50} height={40} />
            <Text
              style={[styles.salahName,{color: "#333333" }]}
            >
              العصر
            </Text>
            <Text
              style={[styles.salahTime,{color: "#333333"}]}
            >
              {convert24To12Hour(athan?.data.timings.Asr)}
            </Text>
          </View>
          <View style={[styles.athanTime, { backgroundColor: "#f3f390" }]}>
            <MosqueView width={50} height={40} />
            <Text
              style={[styles.salahName,{color: "#A0522D"}]}
            >
              الظهر
            </Text>
            <Text
              style={[styles.salahTime,{color: "#A0522D"}]}
            >
              {convert24To12Hour(athan?.data.timings.Dhuhr)}
            </Text>
          </View>
          <View style={[styles.athanTime, { backgroundColor: "#326475" }]}>
            <MosqueView width={50} height={40} />
            <Text
              style={[styles.salahName, {color:'#FFB6C1'}]}
            >
              الفجر
            </Text>
            <Text
              style={[styles.salahTime, {color:'#FFB6C1'}]}
            >
              {convert24To12Hour(athan?.data.timings.Fajr)}
            </Text>
          </View>
        </View> 
        ): null}   
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
  salahName: {
    fontFamily: "uthmanic_hafs",
    fontSize: 19,
  },
  salahTime:{
    fontFamily: "uthmanic_hafs",
    fontSize: 15,
  },
  athanTime: {
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#cfbba5",
    elevation: 5,
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
