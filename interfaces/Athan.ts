export interface AthanObject {
  code: number;
  status: string;
  data: Data;
}

interface Data {
  timings: Timings;
  date: Date;
  meta: Meta;
}

interface Meta {
  latitude: number;
  longitude: number;
  timezone: string;
  method: Method;
  latitudeAdjustmentMethod: string;
  midnightMode: string;
  school: string;
  offset: Timings;
}

interface Method {
  id: number;
  name: string;
  params: Params;
}

interface Params {
  Fajr: number;
  Isha: string;
}

interface Date {
  readable: string;
  timestamp: string;
  gregorian: Gregorian;
  hijri: Hijri;
}

interface Hijri {
  date: string;
  format: string;
  day: string;
  weekday: Weekday2;
  month: Month2;
  year: string;
  designation: Designation;
  holidays: string[];
}

interface Month2 {
  number: number;
  en: string;
  ar: string;
}

interface Weekday2 {
  en: string;
  ar: string;
}

interface Gregorian {
  date: string;
  format: string;
  day: string;
  weekday: Weekday;
  month: Month;
  year: string;
  designation: Designation;
}

interface Designation {
  abbreviated: string;
  expanded: string;
}

interface Month {
  number: number;
  en: string;
}

interface Weekday {
  en: string;
}

interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}