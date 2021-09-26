import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useSelector, useDispatch } from "react-redux";
import { deleteSession } from "../../service/Service";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: 10,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const SearchListItem = (props) => {
    return (
        <Link
            style={{ maxWidth: "100%", color: "#333", textDecoration: "none" }}
            to={`/detail/${props.id}`}
        >
            <MenuItem>
                <Typography sx={{ fontSize: "0.9rem" }} noWrap>
                    {props.title}
                </Typography>
            </MenuItem>
        </Link>
    );
};

const SearchList = (props) => {
    if (props.data.length > 0) {
        return (
            <div
                style={{
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                    width: "100%",
                    borderRadius: 5,
                    position: "absolute",
                    marginTop: 10,
                    backgroundColor: "white",
                    color: "#333",
                    opacity: props.show ? 1 : 0,
                    visibility: props.show ? "visible" : "hidden",
                }}
            >
                {props.data.slice(0, 10).map((item, index) => {
                    return (
                        <SearchListItem
                            key={index}
                            id={item.id}
                            title={item.title}
                        />
                    );
                })}

                <Link
                    style={{
                        maxWidth: "100%",
                        color: "#333",
                        textDecoration: "none",
                    }}
                    to={`/search/${props.keyword}`}
                >
                    <MenuItem>
                        <Typography
                            sx={{ fontSize: "0.9rem", fontWeight: "bold" }}
                            noWrap
                        >
                            <i>Load More...</i>
                        </Typography>
                    </MenuItem>
                </Link>
            </div>
        );
    }

    return <div></div>;
};

export default function Navbar(props) {
    const { login } = props;
    const [scrolled, setScrolled] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchResult, setSearchResult] = React.useState(false);
    const [keyword, setKeyword] = React.useState("");
    const [data, setData] = React.useState([]);
    const location = useLocation();
    const { sessionId, userInfo } = useSelector((state) => state);
    const dispatch = useDispatch();
    const auth = sessionId || false;
    const apiKey = "059dbc00809f38f222d2896e2f25d3c3";

    const handleScroll = () => {
        const offset = window.scrollY;
        offset > 20 ? setScrolled(true) : setScrolled(false);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        deleteSession(dispatch, { session_id: sessionId });
        handleClose();
    };

    const searchMovie = async (event) => {
        let query = event.target.value;
        setKeyword(query);
        query = query.replaceAll(" ", "%20");
        const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1`;
        try {
            const response = await axios.get(searchURL);
            setData(response.data.results);
        } catch (error) {
            setData([]);
            console.error(error);
        }
    };

    React.useEffect(() => {
        window.onscroll = () => {
            handleScroll();
        };
    });

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                sx={{
                    transitionProperty: "background,box-shadow",
                    transitionDuration: "0.3s",
                    transitionTimingFunction: "ease",
                    boxShadow: scrolled
                        ? "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)"
                        : "none",
                    color: "background.paper",
                    bgcolor: scrolled ? "rgba(0,0,0,0.35)" : "transparent",
                    backdropFilter: scrolled ? "blur(6px)" : "none",
                }}
                position="fixed"
                color="transparent"
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, color: "background.paper" }}
                    ></Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            onFocus={() => {
                                setSearchResult(true);
                            }}
                            onBlur={() => {
                                setSearchResult(false);
                                setTimeout(() => {
                                    setKeyword("");
                                    setData([]);
                                }, 100)
                            }}
                            onChange={searchMovie}
                            value={keyword}
                            placeholder="Search…"
                            inputProps={{ "aria-label": "search" }}
                        />
                        <div onClick={() => setData([])}>
                            <SearchList
                                location={location}
                                keyword={keyword}
                                data={data}
                                show={searchResult}
                            />
                        </div>
                    </Search>
                    {auth ? (
                        <div>
                            <Button
                                variant="outlined"
                                // size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                startIcon={<AccountCircle />}
                                sx={{ borderRadius: 50 }}
                            >
                                <Typography
                                    sx={{ ml: 1, textTransform: "none" }}
                                >
                                    {userInfo.username}
                                </Typography>
                            </Button>
                            <Menu
                                sx={{ mt: 6 }}
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem
                                    sx={{ pt: 0, pb: 0 }}
                                    onClick={handleClose}
                                >
                                    <Link
                                        style={{
                                            color: "#333",
                                            textDecoration: "none",
                                        }}
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                </MenuItem>
                                <MenuItem
                                    sx={{ pt: 0, pb: 0 }}
                                    onClick={handleClose}
                                >
                                    <Link
                                        style={{
                                            color: "#333",
                                            textDecoration: "none",
                                        }}
                                        to="/watchlist"
                                    >
                                        Watchlist
                                    </Link>
                                </MenuItem>
                                <Divider />
                                <MenuItem
                                    sx={{ pt: 0, pb: 0 }}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        login
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
