import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import {Stack} from "@mui/material";

const CardWeather = ({data}) => {
    return (
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                    {data.name}, {data.sys.country}
                </Typography>
                <Typography variant="h5" component="div">
                    <Stack
                        direction="row"
                        alignItems="center">
                        {data.main.temp}° <img width={70} src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt={data.weather[0].icon}></img>
                    </Stack>
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {data.weather[0].description}
                </Typography>
                <Typography>
                    Швидкість вітру, км/год: {data.wind.speed}
                </Typography>
                {data.rain ?<Typography>
                    Кількість опадів за останню годину, мм: {data.rain['1h']}
                </Typography> : null}
                <Typography>
                    Хмарність, %: {data.clouds.all}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CardWeather;