import React from "react";
import { useParams } from "react-router";
import { Grid, Pagination, Paper, Typography } from "@mui/material";
import MovieItem from "../../components/MovieItem/MovieItem";
import axios from "axios";

const Search = () => {
    const { query } = useParams();
    const [keyword, setKeyword] = React.useState(query);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [data, setData] = React.useState([]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const getSearchMovie = async (query, page) => {
        const apiKey = "059dbc00809f38f222d2896e2f25d3c3";
        const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page}`;
        try {
            const response = await axios.get(searchURL);
            setTotalPages(response.data.total_pages);
            setData(response.data.results);
        } catch (error) {
            console.error(error);
        }
    };

    React.useEffect(() => {
        if (keyword !== query) {
            setPage(1);
            setKeyword(query);
            getSearchMovie(query, 1);
        } else {
            getSearchMovie(query, page);
        }
    }, [query, page, keyword]);

    if (data.length === 0) {
        return <div></div>;
    }

    return (
        <Grid
            alignItems="stretch"
            justifyContent="center"
            container
            sx={{ flexGrow: 1 }}
        >
            <Grid
                item
                xs={12}
                sx={{
                    p: 4,
                    mb: 2,
                    display: "flex",
                    height: "30vh",
                    alignItems: "center",
                    backgroundImage:
                        "linear-gradient(0deg, rgba(0,0,0,0.9), rgba(0,0,0,0)), url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{ fontFamily: "Anton", color: "white" }}
                >
                    Search Results
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ pl: 4, pr: 4 }}>
                <Typography sx={{ color: "white" }}>
                    Search for:
                    <strong style={{ display: "inline-block", marginLeft: 10 }}>
                        {query}
                    </strong>
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ pb: 2, pl: 4, pr: 4 }}>
                <Typography sx={{ color: "white" }}>
                    Page <strong>{page}</strong> of{" "}
                    <strong>{totalPages}</strong>
                </Typography>
            </Grid>
            {data.map((item, index) => {
                return (
                    <Paper
                        key={index}
                        sx={{
                            height: "inherit",
                            width: 250,
                            p: 0,
                            m: 1,
                            mb: 2,
                            bgcolor: "#272727",
                            borderRadius: 2,
                            overflow: "hidden",
                        }}
                        elevation={5}
                    >
                        <Grid item>
                            <MovieItem data={item} />
                        </Grid>
                    </Paper>
                );
            })}
            <Grid
                item
                xs={12}
                sx={{
                    p: 4,
                    pt: 3,
                    pb: 5,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Pagination
                    color="warning"
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                    sx={{
                        "& .MuiPaginationItem-text": {
                            color: "white !important",
                        },
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default Search;
