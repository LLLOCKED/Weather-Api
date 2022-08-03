import {Container, Stack} from "@mui/material";
import CardWeather from "./components/CardWeather";
import {useEffect, useState} from "react";
import DaysWeather from "./components/DaysWeather";


function App() {

    const [weather, setWeather] = useState();
    const [daysWeather, setDaysWeather] = useState();
    const [location, setLocation] = useState({lon: -0.118092, lat: 51.509865});

    const weatherApi = async () => {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lon=${location.lon}&lat=${location.lat}&exclude=current&lang=ua&units=metric&appid=e452f050a872d2e094fbf1b8810f82a2`)
            .then(response => response.json())
            .then(data => setWeather(data));
    };

    const weatherDaysApi = async () => {
        await fetch(`https://api.openweathermap.org/data/2.5/forecast?lon=${location.lon}&lat=${location.lat}&units=metric&lang=ua&cnt=20&appid=e452f050a872d2e094fbf1b8810f82a2`)
            .then(response => response.json())
            .then(data => setDaysWeather(data))
    };

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({lat: position.coords.latitude, lon: position.coords.longitude})
            })
        }
    }, [])

    useEffect( () => {
            weatherApi();
            weatherDaysApi();
    }, [location]);

    return (
        <Container maxWidth="lg">
            <Stack spacing={2} direction="column"
                   justifyContent="center"
                   alignItems="center"
                   sx={{height: '100vh'}}
            >
                {weather ? <CardWeather data={weather} /> : null}
            </Stack>
            {daysWeather ? <DaysWeather data={daysWeather}/> : null}
        </Container>
    );
}

export default App;
