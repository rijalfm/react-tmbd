import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { useSelector } from "react-redux";

const Watchlist = () => {
    const { sessionId, userInfo } = useSelector((state) => state);
    const auth = sessionId ? true : false;
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        if (auth && userInfo.id) {
            const watchListURL = `https://api.themoviedb.org/3/account/${userInfo.id}/watchlist/movies?api_key=059dbc00809f38f222d2896e2f25d3c3&session_id=${sessionId}&sort_by=created_at.asc&page=1`;
            console.log(watchListURL);
        }
    }, [auth, userInfo, sessionId]);

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
                    <Stack alignItems="center" direction="row" spacing={2}>
                        {/* <Avatar sx={{ width: 56, height: 56, fontFamily: 'Bree Serif',textTransform: "uppercase"}}>{userInfo.username.charAt(0)}</Avatar> */}
                        <Typography
                            variant="h2"
                            sx={{
                                fontFamily: "Anton",
                                color: "background.paper",
                            }}
                        >
                            My Watchlist
                        </Typography>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default Watchlist;
