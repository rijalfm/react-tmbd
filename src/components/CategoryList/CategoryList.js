import React from "react";
import { Grid, Typography } from "@mui/material";
import CategoryItem from "../CategoryItem/CategoryItem";
import { useSelector } from "react-redux";

const CategoryList = () => {
    const genres = useSelector((state) => state.movieGenre);

    return (
        <div>
            <Typography
                variant="h1"
                sx={{ color: "white", fontSize: 24, p: 4, pt: 0, pb: 2 }}
            >
                Genre
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
