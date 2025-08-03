import { useState } from "react";
import type { CurrentWeather, ForecastData } from "../types/typesWeather";
//importamos axios para consumir la api
import axios from "axios";

//imoplementamos un hook para separar la logica de negocio de la UI y hacer mas legible mi codigo


export function useWeather() {
  const [loading, setLoading] = useState(false); //estado para manejar la carga de datos
  const [cityName, setCityName] = useState(""); //estado para manejar el nombre de la ciuda
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null); //estado para manejar el clima actual
  const [forecast, setForecast] = useState<ForecastData | null>(null); //estado para manejar el pronostico
  const [error, setError] = useState<string | null>(null);  //estado para manejar los errores de la aplic
  

  //esta funcion iniciamos la peticion a la api
  //recibe como parametro el nombre de la ciudad
  //y actualiza los estados correspondientes
  const getWeather = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      setCurrentWeather(null);
      setForecast(null);

      //localStorage para guardar la ultima ciudad
      localStorage.setItem("lastCity", city);

      // Geocoding
      // obtenemos la latitud y longitud de la ciudad pd: usamos axios para consumir la api
      // para luego usarla en la peticion a la api de clima
      const geoRes = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
        params: {
          name: city,
        },
      });

      const geoData = geoRes.data;
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("Ciudad no encontrada");
      }

      const { latitude, longitude, name } = geoData.results[0];
      setCityName(name);

      // Weather
      // usamos la latitud y longitud obtenida en la peticion anterior
      // para obtener el clima actual y el pronostico diario
      const weatherRes = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude,
          longitude,
          current_weather: true,
          daily: "temperature_2m_max,temperature_2m_min,weathercode",
          timezone: "auto",
        },
      });
      // verificamos que la respuesta tenga los datos necesarios
      const weatherData = weatherRes.data;
      setCurrentWeather(weatherData.current_weather);
      setForecast(weatherData.daily);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Error al conectar con la API");
      } else {
        setError(err.message || "Error desconocido");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    cityName,
    currentWeather,
    forecast,
    getWeather,
  };
}
