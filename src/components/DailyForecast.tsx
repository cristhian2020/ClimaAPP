import type { ForecastData } from "../types/typesWeather"
import getWeatherDescription from "../utils/weatherDescription";


interface DailyForescastProps{
  forecast: ForecastData;
}


const DailyForecast = ({ forecast }: DailyForescastProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
      {forecast.time.map((date: string, index: number) => (

        <div key={date} className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{new Date(date).toLocaleDateString()}</h3>
          <p>🌡️ Max: {forecast.temperature_2m_max[index]}°C</p>
          <p>🌡️ Min: {forecast.temperature_2m_min[index]}°C</p>
          <p>⛅ Estado: {getWeatherDescription({weatherCode: forecast.weathercode[index]})}</p>
        </div>
      ))}
    </div>
  )
}

export default DailyForecast
