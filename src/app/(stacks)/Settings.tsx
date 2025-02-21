import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import SharedHeader from "../../components/shared/SharedHeader";
import DropdownComponent from "../../components/settings/DropdownComponent";
import countries from "../../assets/json/CountriesAndCities.json";
export default function Settings() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    "أرمينيا"
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [cityData, setCityData] = useState<any | null>(null);
  useEffect(() => {
    if (selectedCity) {
      const selectedCountryData = countries.countries.find(
        (country) => country.name_ar === selectedCountry
      );
      if(selectedCountryData){
        const selectedCityData = selectedCountryData.cities.find((city)=> city.name_ar === selectedCity)
        setCityData(selectedCityData || null)

      }else {
        setCityData(null)
      }
    }else{
      setCityData(null)
    }
  }, [selectedCountry,selectedCity]);
  return (
    <View style={{ flex: 1 }}>
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
      <DropdownComponent
        selectedCountry={selectedCountry}
        selectedCity={selectedCity}
        onCountryChange={setSelectedCountry}
        onCityChange={setSelectedCity}
      />
   
      {cityData && (
        <View>
          <Text>
            Latitude: {cityData.latitude}
          </Text>
          <Text>
            Longitude: {cityData.longitude}
          </Text>
        </View>
      )}
      <Text>
        {selectedCountry} : {selectedCity}
      </Text>
    </View>
  );
}
