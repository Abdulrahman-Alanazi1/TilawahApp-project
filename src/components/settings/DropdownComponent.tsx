import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import countries from "../../assets/json/CountriesAndCities.json";
import { Dropdown } from "react-native-element-dropdown";

interface City {
  label: string;
  value: string;
}

interface DropdownComponentProps {
  selectedCountry: string | null;
  selectedCity: string | null;
  onCountryChange: (country: string | null) => void;
  onCityChange: (city: string | null) => void;
}

export default function DropdownComponent({
  selectedCountry,
  selectedCity,
  onCountryChange,
  onCityChange,
}: DropdownComponentProps) {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    if (selectedCountry) {
      const selectedCountryData = countries.countries.find((country) => {
        return country.name_ar === selectedCountry;
      });
      if (selectedCountryData) {
        setCities(
          selectedCountryData.cities.map((city) => ({
            label: city.name_ar,
            value: city.name_ar,
          }))
        );
      } else {
        setCities([]);
      }
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  const countryData = countries.countries.map((country) => ({
    label: country.name_ar,
    value: country.name_ar,
  }));
  return (
    <View style={{}}>
      <View
        style={{
          padding: 5,
          backgroundColor: "snow",
          margin: 5,
          elevation: 5,
          borderRadius: 5,
        }}
      >
        <Dropdown
          style={styles.dropdown}
          data={countryData}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          maxHeight={300}
          search
          labelField="label"
          valueField="value"
          placeholder="أختر دولتك"
          searchPlaceholder="Search..."
          value={selectedCountry}
          onChange={(item) => {
            onCountryChange(item.value); // Update parent state
            onCityChange(null);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          data={cities}
          inverted={false}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          maxHeight={300}
          search
          labelField="label"
          valueField="value"
          placeholder="أختر مدينتك"
          searchPlaceholder="Search..."
          value={selectedCity}
          onChange={(item) => {
            onCityChange(item.value); // Update parent state
            console.log("Selected City:", item);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 5,
    height: 55,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: "gray",

  },
  placeholderStyle: {
    fontSize: 16,
    margin: 5,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
