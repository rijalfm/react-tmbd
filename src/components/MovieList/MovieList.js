import React from "react";
import axios from "axios";
import { Typography, Grid, Paper } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import useMediaQuery from '@mui/material/useMediaQuery';
import MovieItem from "../MovieItem/MovieItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "./style.css";

// Import Swiper styles
import "swiper/swiper-bundle.css";

import SwiperCore, { Scrollbar } from "swiper";
SwiperCore.use([Scrollbar]);

const baseURL =
    "https://api.themoviedb.org/3/movie/popular?api_key=059dbc00809f38f222d2896e2f25d3c3&page=1";

const MovieList = () => {
    // const theme = useTheme();
    const [data, setData] = React.useState([]);
    // const [page, setPage] = React.useState(1)

    React.useEffect(() => {
        axios
            .get(baseURL)
            .then((response) => {
                setData(response.data.results);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Grid container sx={{ flexGrow: 1, mb: 5 }}>
            <Typography
                variant="h1"
                sx={{ color: "white", fontSize: 24, p: 4, pb: 2 }}
            >
                What's Popular?
            </Typography>
            <Swiper
                style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                }}
                slidesPerView={1.2}
                slidesOffsetAfter={10}
                freeMode={true}
                breakpoints={{
                    411: {
                        slidesPerView: 1.3,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2.3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3.2,
                        spaceBetween: 20,
                    },
                    1366: {
                        slidesPerView: 4.2,
                        spaceBetween: 10,
                    },
                    1920: {
                        slidesPerView: 5.5,
                        spaceBetween: 20,
                    },
                }}
            >
                {data.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <Paper
                                sx={{
                                    width: 250,
                                    p: 0,
                                    bgcolor: "#272727",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                }}
                                elevation={5}
                            >
                                <MovieItem data={item} />
                            </Paper>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </Grid>
    );
};

export default MovieList;

// <Grid alignItems="center" sx={{ flexGrow: 1, pb: 4 }} container spacing={2}>
//     <Grid  item xs={12}>
//         <Typography variant="h1" sx={{color:"white",fontSize: 24, p: 4, pb: 1}}>
//             What's Popular?
//         </Typography>
//     </Grid>
//     <Grid item xs={12} sx={{maxHeight: 600, overflow: "auto"}}>
//         <Grid spacing={4} container justifyContent="center">
//             {data.map((item, index) => {
//                 return (
//                     <Grid item key={index}>
//                         <MovieItem data={item} />
//                     </Grid>
//                 )
//             })}
//         </Grid>
//     </Grid>
// </Grid>
