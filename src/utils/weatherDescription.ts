
interface props {
    weatherCode: number;
}
const getWeatherDescription = ({weatherCode}:props)=>{
    switch (weatherCode) {
        case 0:
            return "Despejado ☀️";
        case 1:
            return "Parcialmente nublado ☁️";
        case 2:
            return "Nublado ☁️";
        case 3:
            return "Lluvia ligera 🌧️";
        case 4:
            return "Lluvia moderada 🌧️";
        case 5:
            return "Tormenta ⛈️";
        default:
            return "fin del mundo xd";
    }
}

export default getWeatherDescription;