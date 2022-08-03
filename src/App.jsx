import {Container, Stack, TextField} from "@mui/material";
import CardWeather from "./components/CardWeather";
import {useEffect, useState} from "react";
import DaysWeather from "./components/DaysWeather";
import axios from "axios";
import Typography from "@mui/material/Typography";

function App() {

    const [weather, setWeather] = useState();
    const [daysWeather, setDaysWeather] = useState();
    const [location, setLocation] = useState({lon: -0.118092, lat: 51.509865});
    const [city, setCity] = useState('');
    const [isFind, setFind] = useState(true);

    const weatherApi = async () => {
        const cityName = city ? `q=${city}&` : '';
        const coordinates = city ? '' : `lon=${location.lon}&lat=${location.lat}`
        try {
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?${cityName}${coordinates}&exclude=current&lang=ua&units=metric&appid=e452f050a872d2e094fbf1b8810f82a2`)
            setWeather(data);
            setFind(true);
        } catch (e) {
            console.log(e)
            setFind(false)
        }
    };

    const weatherDaysApi = async () => {
        const cityName = city ? `q=${city}&` : '';
        const coordinates = city ? '' : `lon=${location.lon}&lat=${location.lat}`
        try {
            const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?${cityName}${coordinates}&units=metric&lang=ua&cnt=20&appid=e452f050a872d2e094fbf1b8810f82a2`)
            setDaysWeather(data);
        } catch (e) {
            console.log(e.response.data.message)
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({lat: position.coords.latitude, lon: position.coords.longitude})
            })
        }
    }, [])

    useEffect(() => {
        weatherApi();
        weatherDaysApi();
    }, [location]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            weatherApi();
            weatherDaysApi();
        }
    }

    return (
        <Container maxWidth="lg">
            <Stack spacing={2} direction="column"
                   justifyContent="center"
                   alignItems="center"
                   sx={{height: '100vh'}}
            >
                <TextField id="outlined-basic" label="Outlined" variant="outlined" value={city}
                           onChange={e => setCity(e.target.value)} onKeyDown={handleKeyDown}/>
                {!isFind ? <Typography>Місто не знайдено</Typography> : null }
                {weather ? <CardWeather data={weather}/> : null}
            </Stack>
            {daysWeather ? <DaysWeather data={daysWeather}/> : null}
        </Container>
    );
}

export default App;
