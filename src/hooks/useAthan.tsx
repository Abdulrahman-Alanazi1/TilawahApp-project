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
  const [timeFormat, setTimeFormat] = useState<"24" | "12">("24"); // Default to 24-hour format
  const [error, setError] = useState<string | null>(null); // Add an error state

  useEffect(() => {
    const athanTimes = async () => {
      setIsLoading(true); // Set loading to true before fetching
      setError(null); // Clear any previous errors

      try {
        const response = await instance.get<AthanObject>(
          `date=${date}?latitude=${latitude}&longitude=${longitude}&method=${method}`
        );
        console.log("useAthan status:", response.status);

        setAthan(response.data);
        setIsLoading(false);
      } catch (e: any) {
        console.log("something Went Wrong in useAthan:", e);
        setError(e.message || "An error occurred"); // Set the error message
      }finally {
        setIsLoading(false);
      }
    };
    athanTimes();
  }, [date, latitude, longitude, method]);
  return { athan, isLoading, error };
};
export default useAthan;

