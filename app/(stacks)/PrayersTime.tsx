import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import SharedHeader from "../../components/shared/SharedHeader";
import HomeBanner from "../../components/shared/HomeBanner";
import useAthan from "../../hooks/useAthan";
import AthanTimes from "../../components/prayersTimes/AthanTimes";
import moment from "moment-hijri";
export default function PrayersTime() {
  const time = moment().format('DD-MM-YYYY')
  const { athan, isLoading } = useAthan(time, 24.774265, 46.738586, 4);
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <SharedHeader
              title="مواعيد الصلاة"
              fontSize={15}
              isBackIcon="flex"
              isSettings="none"
            />
          ),
        }}
      />
      <HomeBanner isSalah="none" isDateShowen="flex" />
      <Text>{athan?.data.meta.timezone}</Text>
      <Text>{athan?.data.meta.method.name}</Text>
      <AthanTimes athan={athan} isLoading={isLoading}/>
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
