import {
    Paper,
    Typography,
    Grid,
    Box,
    CircularProgress,
    Stack,
    Chip,
} from "@mui/material";
import { useSelector } from "react-redux";

const convertDate = (date) => {
    const dateToConvert = new Date(date);
    let year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
        dateToConvert
    );
    let month = new Intl.DateTimeFormat("en", { month: "long" }).format(
        dateToConvert
    );
    let day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
        dateToConvert
    );
    return `${month}, ${day} ${year}`;
};

const baseImgURL = "https://www.themoviedb.org/t/p/w300";

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: "relative", display: "inline-flex", mt: 1 }}>
            <CircularProgress
                color="info"
                variant="determinate"
                value={props.value * 10}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    sx={{ fontWeight: "bolder" }}
                    variant="caption"
                    component="div"
                    color="white"
                >
                    {props.value}
                </Typography>
            </Box>
        </Box>
    );
}

const WatchListItem = (props) => {
    const { data } = props;
    const genres = useSelector((state) => state.movieGenre);

    return (
        <Paper
            sx={{
                color: "white",
                bgcolor: "#272727",
                overflow: "hidden",
                borderRadius: 2,
                m: 2,
                mb: 3,
            }}
            elevation={3}
        >
            <Grid container spacing={2} sx={{ height: 250 }}>
                <Grid item sx={{ height: 250 }}>
                    <img
                        style={{ height: "100%" }}
                        src={baseImgURL + data.poster_path}
                        alt={data.title}
                    />
                </Grid>
                <Grid item sx={{ maxWidth: "80%" }}>
                    <Grid
                        sx={{ mt: 0 }}
                        container
                        alignItems="center"
                        spacing={2}
                        direction="row"
                    >
                        <Grid item>
                            <CircularProgressWithLabel
                                value={data.vote_average}
                            />
                        </Grid>
                        <Grid item>
                            <div>
                                <Typography
                                    sx={{
                                        fontFamily: "Anton",
                                        letterSpacing: 1,
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    {data.title}
                                </Typography>
                                <Typography sx={{ color: "#aaa" }}>
                                    {convertDate(data.release_date)}
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <Typography sx={{ mt: 1.5, fontSize: 14 }}>
                        {data.overview}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        {data.genre_ids.map((genre_id) => {
                            return (
                                <Chip
                                    key={genre_id}
                                    color="warning"
                                    variant="outlined"
                                    sx={{ color: "white" }}
                                    label={
                                        genres.find(
                                            (genre) => genre.id === genre_id
                                        ).name
                                    }
                                />
                            );
                        })}
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default WatchListItem;
