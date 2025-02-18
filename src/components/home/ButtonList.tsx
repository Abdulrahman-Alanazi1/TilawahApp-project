import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { SvgProps } from "react-native-svg";

interface SvgComponent extends SvgProps {
  Component1: FC<SvgProps>;
  name1: string;
  radioPress: () => void;
  Component2: FC<SvgProps>;
  name2: string;
  athkarPress: () => void;
  Component3: FC<SvgProps>;
  name3: string;
  sawtiatPress: () => void;
}
export default function ButtonList({
  Component1,
  name1,
  radioPress,
  Component2,
  name2,
  athkarPress,
  Component3,
  name3,
  sawtiatPress,
}: SvgComponent) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.6} onPress={radioPress}>
        <View style={styles.contentContainer}>
          <Component1 width={100} height={50} />
          <Text style={styles.sameTxt}>{name1}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} onPress={athkarPress}>
        <View style={styles.contentContainer}>
          <Component2 width={100} height={50} />
          <Text style={styles.sameTxt}>{name2}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} onPress={sawtiatPress}>
        <View style={styles.contentContainer}>
          <Component3 width={100} height={50} />
          <Text style={styles.sameTxt}>{name3}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  //355f5b
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 7,
  },
  contentContainer: {
    flexDirection: "column",
    backgroundColor: "#f0ebdd",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    elevation:5
  },
  sameTxt: {
    fontSize: 13.5,
    color: "#a27e31",
    marginTop: 5,
    fontFamily: "Kufam-Italic",
  },
});
