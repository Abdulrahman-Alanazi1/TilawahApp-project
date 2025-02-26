import axios from "axios";
import { useEffect, useState } from "react";
import { AthanObject } from "../interfaces/Athan";

const instance = axios.create({
  baseURL: "http://api.aladhan.com/v1/timings/",
  maxBodyLength: Infinity,
  headers: {
    Accept: "application/json",
  },
});

const useAthan = (
  date: string,
  latitude: number | null,
  longitude: number | null,
  method: number
) => {
  const [athan, setAthan] = useState<AthanObject>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const athanTimes = async () => {
      if (latitude === null || longitude === null) {
        setIsLoading(false);
        return;
    }
      setIsLoading(true); 
      setError(null); 

      try {
        const response = await instance.get<AthanObject>(
          `date=${date}?latitude=${latitude}&longitude=${longitude}&method=${method}`
        );
        console.log("useAthan status:", response.status);

        setAthan(response.data);
        setIsLoading(false);
      } catch (e: any) {
        console.log("something Went Wrong in useAthan:", e);
        setError(e.message || "An error occurred"); 
      }finally {
        setIsLoading(false);
      }
    };
    athanTimes();
  }, [date, latitude, longitude, method]);
  return { athan, isLoading, error };
};
export default useAthan;

