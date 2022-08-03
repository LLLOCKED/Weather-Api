import {Grid} from "@mui/material";
import CardWeather from "./CardWeather";

const DaysWeather = ({data}) => {
    return (
        <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
            {data.list.map((weather) => (
                <Grid item xs={4} sm={4} md={3} key={weather.dt}>
                    <CardWeather data={weather} />
                </Grid>
            ))}
        </Grid>
    )
}

export default DaysWeather;