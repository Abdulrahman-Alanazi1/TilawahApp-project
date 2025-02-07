import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AthanObject } from "../../interfaces/Athan";
import useAthan from "../../hooks/useAthan";

type AthanTimes = {
  athan: AthanObject | undefined;
  isLoading: boolean;
};
export default function AthanTimes({ athan, isLoading }: AthanTimes) {
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
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>{convert24To12Hour(athan?.data.timings.Fajr ?? "N/A")}</Text>
        <Text style={styles.sameTxt}>الفجر</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text>{convert24To12Hour(athan?.data.timings.Sunrise ?? "N/A")}</Text>
        <Text style={styles.sameTxt}>الشروق</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text>{convert24To12Hour(athan?.data.timings.Dhuhr ?? "N/A")}</Text>
        <Text style={styles.sameTxt}>الظهر</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text>{convert24To12Hour(athan?.data.timings.Asr ?? "N/A")}</Text>
        <Text style={styles.sameTxt}>العصر</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text>{convert24To12Hour(athan?.data.timings.Sunset ?? "N/A")}</Text>
        <Text style={styles.sameTxt}>الغروب</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text>{convert24To12Hour(athan?.data.timings.Maghrib ?? "N/A")}</Text>
        <Text style={styles.sameTxt}>المغرب</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text>{convert24To12Hour(athan?.data.timings.Isha ?? "N/A")}</Text>
        <Text style={styles.sameTxt}>العشاء</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 5,
    backgroundColor: "#bfb598",
    borderRadius: 5,
    elevation: 5,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    padding: 5,

    alignItems: "center",
  },
  sameTxt: {
    fontFamily: "Kufam-Italic",
  },
});
