import {
  View,
  StyleSheet,
  Dimensions,
  
} from "react-native";
import React, { useState } from "react";
import Drawer from "expo-router/drawer";
import QuranPageHeader from "../../components/drawer/QuranPageHeader";
import QuranList from "../../components/drawer/QuranList";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";


export default function QuranPage() {
  const [currentSuraName, setCurrentSuraName] = useState<string>('');
  const [currentJozz, setCurrentJozz] = useState<number>(0);
  const { chapter } = useLocalSearchParams();  // Get the chapter parameter
  const chapterId = chapter ? parseInt(chapter as string, 10) : null; // Parse to number or null

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "snow" }}>
        <QuranPageHeader
          name={currentSuraName}
          joz={currentJozz.toString()} // Convert joz to string
        />
        <QuranList
          CurrentSuraName={setCurrentSuraName}
          CurrentJozz={setCurrentJozz}
          chapterId={chapterId}
        />
    </SafeAreaView>
  );
}
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  child: { width, justifyContent: "center" },
  text: { fontSize: 18, textAlign: "center", fontFamily: "HafsSmart" },
});
