import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import useChapters from "../../hooks/useChapters";
import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router"; // Import useRouter
export default function AyatNamesList() {
  const { chapters, isLoading } = useChapters();
  const router = useRouter(); // Initialize router

  return (
    <FlashList
      data={chapters?.chapters}
      estimatedItemSize={400}
      keyExtractor={(item, index) => item.id.toString()}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            activeOpacity={0.89}
            onPress={() => {
              router.push(`/(drawer)/QuranPage?chapter=${item.id}`);
            }}
            style={{ margin: 2, padding:1 }}
          >
            <View style={styles.chaptersContainer}>
              <View style={styles.contentContainer}>
                <View style={styles.namesContainer}>
                  <View style={{ flexDirection: "row-reverse" }}>
                    <Text style={styles.sameNameStyle}> -{item.id}</Text>
                    <Text style={styles.sameNameStyle}>{item.name_arabic}</Text>
                  </View>
                  <Text style={styles.sameNameStyle}>
                    {item.translated_name.name}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row-reverse",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons name="place" size={10} color={"gray"} />
                    {item.revelation_place == "makkah" ? (
                      <Text style={styles.sameTxt}>مكية </Text>
                    ) : (
                      <Text style={styles.sameTxt}>مدنية </Text>
                    )}
                    <Text style={styles.sameTxt}>
                      - عدد الأيات: {item.verses_count}
                    </Text>
                  </View>
                  <Text style={styles.sameTxt}>{item.name_simple}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
const styles = StyleSheet.create({
  chaptersContainer: {
    flex: 1,
    padding: 5,
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: '#f0ebdd',
    borderRadius: 5,
    elevation:5
  },
  contentContainer: {
    flex: 1,
    marginRight: 6,
    padding:5,
    justifyContent: "space-between",
  },
  namesContainer: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  sameTxt: {
    color: "gray",
    fontSize: 9,
    fontFamily: "Kufam-Italic",
  },
  sameNameStyle: {
    fontSize:11,
    fontFamily: "Kufam-Italic",
  },
});
