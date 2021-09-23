import React from "react";
import { Grid, Typography } from "@mui/material";
import CategoryItem from "../CategoryItem/CategoryItem";
import axios from "axios";

const genreURL =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=059dbc00809f38f222d2896e2f25d3c3&language=en-US";

const CategoryList = () => {
    const [genres, setGenres] = React.useState([]);

    React.useEffect(() => {
        axios.get(genreURL)
        .then((response) => {
            setGenres(response.data.genres);
        })
        .catch((error) => {
            console.error(error);
        })
    },[]);
    return (
        <div>
            <Typography
                variant="h1"
                sx={{ color: "white", fontSize: 24, p: 4, pt: 0, pb: 2 }}
            >
                Category
            </Typography>
            <Grid container sx={{ flexGrow: 1, p: 4, pt: 1 }} spacing={2}>
                {genres.map((genre,index) => {
                    return (
                        <Grid item key={index} >
                            <CategoryItem name={genre.name} />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
};

export default CategoryList;
