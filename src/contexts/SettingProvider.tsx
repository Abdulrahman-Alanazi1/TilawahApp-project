import React, { createContext, ReactNode, useState, useContext } from "react";
import countries from "../assets/json/CountriesAndCities.json";

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