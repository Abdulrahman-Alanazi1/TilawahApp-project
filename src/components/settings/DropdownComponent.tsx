import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import countries from "../../assets/json/CountriesAndCities.json";
import { Dropdown } from "react-native-element-dropdown";

interface City {
  label: string;
  value: string;
}

export default function DropdownComponent() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    "أرمينيا"
  );
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
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
            value: city.city_id,
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
    <View style={{ flex: 1 }}>
      <View style={{
        padding:5,
        backgroundColor:'snow',
        margin:5,
        elevation:5,
        borderRadius:5
      }}>
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
          placeholder="Select Country"
          searchPlaceholder="Search..."
          value={selectedCountry}
          onChange={(item) => {
            setSelectedCountry(item.value);
            setSelectedCity(null);
          }}
        />
        <Dropdown
          style={styles.dropdown}
          data={cities}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          maxHeight={300}
          search
          labelField="label"
          valueField="value"
          placeholder="Select city"
          searchPlaceholder="Search..."
          value={selectedCity}
          onChange={(item) => {
            setSelectedCity(item.value);
            console.log("Selected City:", item);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 55,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  placeholderStyle: {
    fontSize: 16,
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
