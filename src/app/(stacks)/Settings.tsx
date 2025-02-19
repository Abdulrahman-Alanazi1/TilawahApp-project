import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import SharedHeader from "../../components/shared/SharedHeader";

export default function Settings() {
  return (
    <View style={{flex:1}}>
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <SharedHeader
              title="الإعدادات"
              isBackIcon="flex"
              isSettings="none"
              fontSize={15}
            />
          ),
        }}
      />
    </View>
  );
}
