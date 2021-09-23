import React from "react";
import axios from "axios";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MovieIcon from "@mui/icons-material/Movie";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const baseURL =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=059dbc00809f38f222d2896e2f25d3c3&language=en-US&page=1";
const baseImgURL = "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces";


const Jumbo = (props) => {
    const [data, setData] = React.useState({});
    const theme = useTheme();
    const { name } = props;

    React.useEffect(() => {
        axios
            .get(baseURL)
            .then((response) => {
                const responseData = response.data.results;
                const index = Math.floor(Math.random() * responseData.length)
                const item = responseData[index];
                if (item.overview.length > 200) {
                    item.overview = item.overview.substring(0, 200) + "...";
                }
                setData(item);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <Paper
            elevation={4}
            sx={{
                borderRadius: 0,
                width: "100%",
                height: "60vh",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    "& .heroImage": {
                        p: 0,
                        m: 0,
                        width: "100%",
                        height: "auto",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                    },
                    [theme.breakpoints.down("md")]: {
                        "& .heroImage": {
                            height: "100%",
                            width: "auto",
                        }
                    },
                }}
            >
                <img
                    className="heroImage"
                    src={baseImgURL + data.backdrop_path}
                    alt={data.title}
                    loading="lazy"
                />
            </Box>
            <Box
                sx={{
                    p: 4,
                    color: "white",
                    zIndex: 1,
                    background: "linear-gradient(0deg,rgba(0,0,0,0.9),rgba(0,0,0,0.3))",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                }}
            >
                <Typography sx={{ mt: -2.5, fontFamily: "Anton", [theme.breakpoints.down("sm")]: {mt: 5} }} variant="h4">
                    {name}
                </Typography>
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 40,
                        width: "70%",
                        [theme.breakpoints.down("sm")]: {width: "90%"}
                    }}
                >
                    <Box sx={{ mb: 2 }}>
                        <Typography sx={{ fontFamily: "Anton" }} variant="h5">
                            {data.title}
                        </Typography>
                        {/* <Typography variant="p">{data.overview.length < 200 ? data.overview : data.overview.substring(0,200) + "..."}</Typography> */}
                        <Typography variant="p">{data.overview}</Typography>
                    </Box>
                    <Button
                        startIcon={
                            <MovieIcon
                                sx={{ color: theme.palette.warning.main }}
                            />
                        }
                        variant="outlined"
                        color="warning"
                        sx={{ color: "white" }}
                    >
                        Trailer
                    </Button>
                    <Button
                        color="error"
                        sx={{ ml: 2, color: "white" }}
                        startIcon={
                            <PlayArrowRoundedIcon
                                sx={{ color: theme.palette.error.main }}
                            />
                        }
                        variant="outlined"
                    >
                        Watch
                    </Button>
                </Box>
                {/* <IconButton sx={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-100%) scale(300%)"
                }} aria-label="delete" size="large" color="primary">
                    <PlayCircleOutlineIcon />
                </IconButton> */}
            </Box>
        </Paper>
    );
};

export default Jumbo;
