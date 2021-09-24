import React from "react";
import { styled } from "@mui/material/styles";
import { Chip, Box, Typography, Rating, Link } from "@mui/material";

const baseImgURL = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";
const paperWidth = 250;
const paperHeight = paperWidth * (450 / 300);

const cardStyle = {
    color: "white",
    m: 0,
    p: 0,
    width: paperWidth,
    height: paperHeight,
    overflow: "hidden",
    // borderRadius: 2,
    bgcolor: "transparent",
    position: "relative",
    // boxShadow: "0 10px 10px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
    cursor: "pointer",
};

const MovieRating = styled(Rating)(({ theme }) => ({
    color: theme.palette.primary.main,
    "& .MuiRating-iconEmpty": {
        "& .MuiSvgIcon-root": {
            fill: "#aaa",
        },
    },
}));


const MovieItem = (props) => {
    const { data, style } = props;

    return (
        <div style={{ ...style }}>
            <Box sx={cardStyle}>
                <Link href={`/detail/${data.id}`}>
                    <img
                        style={{ width: "100%", height: "auto" }}
                        src={data.poster_path ? baseImgURL + data.poster_path : ""}
                        alt={data.title}
                        loading="lazy"
                    />
                    <div
                        style={{
                            position: "absolute",
                            top: 15,
                            left: 10,
                        }}
                    >
                        <Chip
                            sx={{pointerEvents: "none"}}
                            color="primary"
                            label={new Date(data.release_date).getFullYear() || ""}
                        />
                    </div>
                </Link>
            </Box>
            <div
                style={{
                    maxWidth: paperWidth,
                    overflow: "hidden",
                    marginLeft: 10,
                    marginRight: 10,
                }}
            >
                <Link
                    component="button"
                    underline="none"
                    sx={{ display: "inline", textAlign: "left" }}
                >
                    <Typography
                        noWrap={false}
                        sx={{
                            display: "inline-block",
                            maxWidth: paperWidth,
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "white",
                            mt: 2,
                        }}
                    >
                        {data.title}
                    </Typography>
                </Link>
            </div>
            <div style={{ marginLeft: 10 }}>
                <MovieRating
                    name="half-rating-read"
                    size="small"
                    value={data.vote_average / 2}
                    precision={0.5}
                    readOnly
                    sx={{ mb: 2, mt: 1 }}
                />
            </div>
        </div>
    );
};

export default MovieItem;
