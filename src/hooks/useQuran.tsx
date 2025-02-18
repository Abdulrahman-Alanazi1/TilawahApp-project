import { useEffect, useState } from "react";
import { QuranObject } from "../interfaces/Quran";
import axios from "axios";
const instance = axios.create({
  method: "get",
  baseURL: "https://api.alquran.cloud/v1/quran",
  maxBodyLength: Infinity,
  headers: {
    Accept: "application/json",
  },
});
export default function useQuran() {
  const [quran, setQuran] = useState<QuranObject>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const quranAyat = async () => {
        try{
            const response = await instance.get<QuranObject>("/imlaei")
            console.log('useQyran status:', response.status)
            setQuran(response.data)
            setIsLoading(false)
        }catch(e: unknown){
            console.log("something Went Wrong in useQuran:", e);
            setIsLoading(false);
        }
    }
    quranAyat()
  },[])
  return {quran, isLoading}

}
