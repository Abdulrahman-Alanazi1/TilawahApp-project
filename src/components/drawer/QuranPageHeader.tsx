import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
interface suraName{
  name: string
  joz: string
}
export default function QuranPageHeader({name, joz}: suraName) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row', alignItems: "center", justifyContent:'space-between', marginRight:10}}>
        <Text style={{fontFamily:'Kufam-Italic', fontSize:13, color:'white', textAlign:'center',flex:1}}>سورة {name}</Text>
        <Text style={{fontFamily:'Kufam-Italic', fontSize:10, color:'white'}}>الجزء {joz}</Text>

      </View>
      <View style={[styles.viewContainer]}>
        <Ionicons name="search" size={25} color={"snow"} />
        <Ionicons name="bookmarks-outline" size={25} color={"snow"} />
        <Ionicons name="moon-sharp" size={25} color={"snow"} />
        <TouchableOpacity
          onPress={() => {
            router.push('/AyatTitles')
          }}
        >
          <MaterialIcons name="view-list" size={25} color={"snow"} />
        </TouchableOpacity>
        <Ionicons name="eye-off" size={25} color={"snow"} />
        <Ionicons
          name="ellipsis-vertical-sharp"
          size={26}
          color={"snow"}
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  //355f5b
  container: {
    backgroundColor: "#9e886f",
    flexDirection: "column",
    padding: 7,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  viewContainer: {
    flexDirection: "row",
    backgroundColor: "#a89075",
    justifyContent: "space-between",
    margin: 1,
    padding:10,
    borderRadius:10
  },
});
