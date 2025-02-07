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
  latitude: number,
  longitude: number,
  method: number
) => {
  const [athan, setAthan] = useState<AthanObject>();
  const [isLoading, setIsLoading] = useState(true);
  const [timeFormat, setTimeFormat] = useState<"24" | "12">("24"); // Default to 24-hour format

  useEffect(() => {
    const athanTimes = async () => {
      try {
        const response = await instance.get<AthanObject>(
          `date=${date}?latitude=${latitude}&longitude=${longitude}&method=${method}`
        );
        console.log("useAthan status:", response.status);

        setAthan(response.data);
        setIsLoading(false);
      } catch (e: unknown) {
        console.log("something Went Wrong in useAthan:", e);
        setIsLoading(false);
      }
    };
    athanTimes();
  }, []);
  return { athan, isLoading };
};
export default useAthan;

