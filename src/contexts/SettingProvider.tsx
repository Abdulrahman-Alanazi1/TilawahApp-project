import React, { createContext, ReactNode, useState, useContext, useEffect } from "react";
import countries from "../assets/json/CountriesAndCities.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface SettingContextProps {
  latitude: number | null;
  longitude: number | null;
  setLatitude: (latitude: number | null) => void;
  setLongitude: (longitude: number | null) => void;
}

 export const SettingContext = createContext<SettingContextProps | undefined>(
  undefined
);

export const SettingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const defaultCountryName = "مصر";
  const defaultCityName = "القاهرة";

  const defaultCountry = countries.countries.find(country => country.name_ar === defaultCountryName)
  const defaultCity = defaultCountry?.cities.find(city => city.name_ar === defaultCityName)

  const [latitude, setLatitude] = useState<number | null>(defaultCity?.latitude || null);
  const [longitude, setLongitude] = useState<number | null>( defaultCity?.longitude ||null);

  useEffect(() => {
    const loadStoredValues = async () => {
        try {
            const storedCountry = await AsyncStorage.getItem('selectedCountry');
            const storedCity = await AsyncStorage.getItem('selectedCity');

            if (storedCountry && storedCity) {
                const foundCountry = countries.countries.find(
                    (country) => country.name_ar === storedCountry
                );
                const foundCity = foundCountry?.cities.find(
                    (city) => city.name_ar === storedCity
                );

                if (foundCity) {
                    setLatitude(foundCity.latitude);
                    setLongitude(foundCity.longitude);
                }
            } else if (defaultCity) {
              setLatitude(defaultCity.latitude);
              setLongitude(defaultCity.longitude);
            }
        } catch (error) {
            console.error('Error loading stored values:', error);
        }
    };

    loadStoredValues();
}, []);
  const value: SettingContextProps = {
    latitude,
    longitude,
    setLatitude,
    setLongitude,
  };
  return <SettingContext.Provider value={value}>{children}</SettingContext.Provider>;
};

export const useSettings = () => {
    const context = useContext(SettingContext)

    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider')
    }
    return context
}