import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import SharedHeader from "../../components/shared/SharedHeader";
import DropdownComponent from "../../components/settings/DropdownComponent";
import countries from "../../assets/json/CountriesAndCities.json";
import { useSettings } from "../../contexts/SettingProvider";


export default function Settings() {
  const defaultCountryName = 'مصر'
  const defaultCityName = 'القاهرة'

  // find the default country and the main city name
  const defaultCountry  = countries.countries.find((country)=> country.name_ar === defaultCountryName)
  const defaultCity = defaultCountry?.cities.find(city => city.name_ar === defaultCityName )

  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    defaultCountryName || null
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(defaultCityName||null);
  const [cityData, setCityData] = useState<any | null>(defaultCity || null);
  const { setLatitude, setLongitude } = useSettings();

  useEffect(() => {
    if (selectedCity) {
      const selectedCountryData = countries.countries.find(
        (country) => country.name_ar === selectedCountry
      );
      if (selectedCountryData) {
        const selectedCityData = selectedCountryData.cities.find(
          (city) => city.name_ar === selectedCity
        );
        setCityData(
          selectedCityData?.latitude && selectedCityData?.longitude
            ? selectedCityData
            : null
        );
        setLatitude(selectedCityData?.latitude || null);
        setLongitude(selectedCityData?.longitude || null);
      } else {
        setCityData(null);
        setLatitude(null);
        setLongitude(null);
      }
    } else {
      setCityData(null);
      setLatitude(null);
      setLongitude(null);
    }
  }, [selectedCountry, selectedCity, setLatitude, setLongitude]);

  return (
    <View style={{ flex: 1 }}>
      <SharedHeader
        title="الإعدادات"
        isBackIcon="flex"
        isSettings="none"
        fontSize={15}
      />
      <DropdownComponent
        selectedCountry={selectedCountry}
        selectedCity={selectedCity}
        onCountryChange={setSelectedCountry}
        onCityChange={setSelectedCity}
      />
      {cityData && (
        <View>
          <Text>Latitude: {cityData.latitude}</Text>
          <Text>Longitude: {cityData.longitude}</Text>
        </View>
      )}
      <Text>
        {selectedCountry} : {selectedCity}
      </Text>
    </View>
  );
}
