import { View, Text } from "react-native";
import React from "react";
import ButtonList from "./ButtonList";
import MyRadio from "../../../assets/my_radio.svg";
import prayer from "../../../assets/prayer.svg";
import MyQuranBook from "../../../assets/quran_book.svg";
import allahName from "../../../assets/allahName.svg";
import giblaLocation from "../../../assets/giblaLocation.svg";
import michrophone from "../../../assets/michrophone.svg";
export default function ButtonLists() {
  return (
    <View style={{flex:1}}>
      <ButtonList
        Component1={MyRadio}
        name1="الراديو"
        radioPress={() => {
        }}
        Component2={prayer}
        name2="الأذكار"
        athkarPress={() => {
          alert("athkar");
        }}
        Component3={michrophone}
        name3="صوتيات"
        sawtiatPress={() => {
          alert("sawtiat");
        }}
      />
      <ButtonList
        Component1={MyQuranBook}
        name1="الحديث الشريف"
        radioPress={() => {
          alert("radio");
        }}
        Component2={allahName}
        name2="الأسماء الحسنى"
        athkarPress={() => {
          alert("athkar");
        }}
        Component3={giblaLocation}
        name3="القبله"
        sawtiatPress={() => {
          alert("sawtiat");
        }}
      />
    </View>
  );
}
