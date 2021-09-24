import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import WatchListItem from "../../components/WatchListItem/WatchListItem";

const Watchlist = () => {
    const { sessionId, userInfo } = useSelector((state) => state);
    const auth = sessionId ? true : false;
    const [data, setData] = React.useState([]);

    const getData = () => {
        const watchListURL = `https://api.themoviedb.org/3/account/${userInfo.id}/watchlist/movies?api_key=059dbc00809f38f222d2896e2f25d3c3&session_id=${sessionId}&sort_by=created_at.asc&page=1`;

            axios
                .get(watchListURL)
                .then((response) => {
                    setData(response.data.results)
                })
                .catch((error) => {
                    console.error(error);
                });
    }

    React.useEffect(() => {
        if (auth && userInfo.id) {
            getData()
        }
    });

    if (!auth) {
        return (
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "100vh",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1503024572063-b3c621a2d424?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background:
                            "linear-gradient(0deg,rgba(0,0,0,1),rgba(0,0,0,0.55),rgba(0,0,0,1))",
                        fontFamily: "Anton",
                        color: "background.paper",
                        textShadow: "2px 2px 15px black",
                        width: "100%",
                        height: "100vh",
                    }}
                >
                    have you logged in?
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Box
                sx={{
                    mb: 4,
                    p: 0,
                    position: "relative",
                    width: "100%",
                    height: "30vh",
                    backgroundImage:
                        "url(https://www.countryandtownhouse.co.uk/wp-content/uploads/2018/03/GettyImages-869302366.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        color: "background.paper",
                        pl: 5,
                        pt: 10,
                        zIndex: 1,
                        background:
                            "linear-gradient(0deg,rgba(0,0,0,0.9),rgba(0,0,0,0.5))",
                        width: "102%",
                        height: "102%",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)",
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: "Anton",
                            color: "background.paper",
                        }}
                    >
                        My Watchlist
                    </Typography>
                </Box>
            </Box>
            {/* <WatchListItem /> */}
            {data.map((item, index) => {
                return (
                    <WatchListItem key={index} data={item} />
                )
            })}
        </Box>
    );
};

export default Watchlist;
