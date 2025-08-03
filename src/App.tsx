
//importamos los componentes que nesesitamos
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import DailyForecast from "./components/DailyForecast";
// importamso el hook que nos permite consumir la api
import { useWeather } from "./hooks/useWeather";
import { useEffect } from "react";
// APP es el componente principal de la aplicacion
function App() {
  const {
    loading,
    error,
    cityName,
    currentWeather,
    forecast,
    getWeather,
  } = useWeather();

  //cargamos la ultima ciudad  al iniciar
  useEffect(()=>{
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
      getWeather(lastCity);
    }
  },[])
  
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">🌤️ Pronóstico del Tiempo</h1>
      <SearchBar onSearch={getWeather} />
      {loading && <p className="text-blue-500">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {currentWeather && <CurrentWeather city={cityName} weather={currentWeather} />}
      {forecast && <DailyForecast forecast={forecast} />}
    </div>
  );
}

export default App;
