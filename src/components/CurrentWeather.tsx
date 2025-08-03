import type { CurrentWeather } from "../types/typesWeather";
import getWeatherDescription from "../utils/weatherDescription";

interface CurrentWeatherProps{
  city: string;
  weather: CurrentWeather;
}

export default function CurrentWeather({ city, weather }: CurrentWeatherProps) {
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">{city}</h2>
      <p>🌡️ Temperatura: {weather.temperature}°C</p>
      <p>💨 Viento: {weather.windspeed} km/h</p>
      <p>⛅ Estado: {getWeatherDescription({weatherCode: weather.weathercode})}</p>
    </div>
  );
}
