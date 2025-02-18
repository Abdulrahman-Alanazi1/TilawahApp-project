import React, { useEffect, useState } from "react";
import axios from "axios";
import { chaptersObject } from "../interfaces/Chapters";
const instance = axios.create({
  baseURL: "https://api.quran.com/api/v4/",
  maxBodyLength: Infinity,
  headers:{
    'Accept':'application/json'
  }
});
const useChapters = () => {
  const [chapters, setChapters] = useState<chaptersObject>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const quranChapters = async () => {
      try {
        const response = await instance.get<chaptersObject>('chapters')
        console.log('useChapters status:', response.status)
        setChapters(response.data)
        setIsLoading(false)
      } catch (e: unknown) {
        console.log("something Went Wrong in useChapters:", e);
        setIsLoading(false);
      }
    };
    quranChapters()
  }, []);
  return { chapters, isLoading };
};

export default useChapters;
