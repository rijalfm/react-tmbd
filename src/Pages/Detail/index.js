import React from "react";
import { Typography, Box, Stack, Chip, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { useParams, useHistory } from "react-router-dom";
import Side from "../../components/Side/Side";
import axios from "axios";

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

const convertDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours} hrs ${minutes} mins`;
};


const Detail = () => {
    const { movieId } = useParams();
    const history = useHistory();
    const [detail, setDetail] = React.useState(null);
    const [cast, setCast] = React.useState([]);
    const [video, setVideo] = React.useState([]);
    const baseLogoImgURL = "https://www.themoviedb.org/t/p/w300";
    const baseBackdropImgURL =
    "https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces";
    
    const getMovieDetail = async (id) => {
        const apiKey = "059dbc00809f38f222d2896e2f25d3c3";
        const detailURL = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
        const creditURL = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
        const videoURL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;
        
        try {
            const responseDetail = await axios.get(detailURL);
            const responseCredit = await axios.get(creditURL);
            const responseVideo = await axios.get(videoURL);
            console.log(responseVideo.data.results)
            setVideo(responseVideo.data.results);
            setCast(responseCredit.data.cast);
            setDetail(responseDetail.data);
        } catch (err) {
            console.log(err.message);
        }
    };

    React.useEffect(() => {
        getMovieDetail(movieId);
    }, [movieId]);

    if (detail) {
        return (
            <div>
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        minHeight: "100vh",
                        backgroundImage: `url(${
                            detail
                                ? baseBackdropImgURL + detail.backdrop_path
                                : ""
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            width: "102%",
                            height: "102%",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,-50%)",
                            background:
                                "linear-gradient(0deg,rgba(0,0,0,0.95),rgba(0,0,0,0.85),rgba(0,0,0,0.95))",
                            diplay: "flex",
                            p: 8,
                            pt: 10,
                        }}
                    >
                        <Button variant="outlined" color="error" onClick={() => history.push("/")} startIcon={<HomeIcon />}>Home</Button>
                        <Typography
                            sx={{
                                mt: 2,
                                mb: 0,
                                fontFamily: "Poppins",
                                color: "white",
                                fontWeight: 700,
                            }}
                            variant="h3"
                        >
                            {detail.title}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "Poppins",
                                color: "white",
                                fontWeight: 300,
                            }}
                            variant="h6"
                        >
                            <strong>{convertDate(detail.release_date)}</strong>{" "}
                            | {convertDuration(detail.runtime)}
                        </Typography>

                        <Stack
                            sx={{ mt: 2, mb: 1 }}
                            alignItems="center"
                            direction="row"
                            spacing={1}
                        >
                            {detail.production_companies.map((item, index) => {
                                if (item.logo_path) {
                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                backgroundColor: "white",
                                                padding: 5,
                                                paddingBottom: 2,
                                                borderRadius: 1,
                                            }}
                                        >
                                            <img
                                                style={{ height: 25 }}
                                                src={`${
                                                    baseLogoImgURL +
                                                    item.logo_path
                                                }`}
                                                alt={item.name}
                                            />
                                        </div>
                                    );
                                }
                                return "";
                            })}
                        </Stack>
                        <Typography
                            sx={{
                                // fontFamily: "Poppins",
                                color: "white",
                                maxWidth: 900,
                            }}
                        >
                            {detail.overview}
                        </Typography>
                        <Stack sx={{ mt: 4 }} direction="row" spacing={2}>
                            <Typography
                                sx={{ color: "white", fontWeight: "bold" }}
                            >
                                Staring:
                            </Typography>
                            <Typography sx={{ maxWidth: 900, color: "white" }}>
                                {cast.slice(0, 20).map((item, index) => {
                                    return (
                                        <span key={index}>
                                            {item.name} as{" "}
                                            <i style={{ color: "#ED6C02" }}>
                                                {item.character}
                                            </i>
                                            ,{" "}
                                        </span>
                                    );
                                })}
                                ...
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                            {detail.genres.map((genre, index) => {
                                return (
                                    <Chip
                                        key={index}
                                        // color="warning"
                                        variant="outlined"
                                        sx={{ color: "white" }}
                                        label={genre.name}
                                    />
                                );
                            })}
                        </Stack>
                    </Box>
                </Box>
                <Side data={video} />
            </div>
        );
    }

    return <div></div>;
};

export default Detail;
