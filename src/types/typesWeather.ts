//defino en una carpeta aparte los tipos e interfaces que voy a usar en mi proyecto
//esto me permite tener un codigo mas limpio y organizado

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  weathercode: number;
}

export interface ForecastData {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weathercode: number[];
}
