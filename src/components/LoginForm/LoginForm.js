import React from "react";
import { styled } from "@mui/material/styles";
import Backdrop from '@mui/material/Backdrop';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
    Box,
    Modal,
    Button,
    FormControl,
    OutlinedInput,
    InputAdornment,
    InputLabel,
    IconButton,
    Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getToken, createSession } from "../../service/Service";

const backdrop = styled(Backdrop, {
    name: "MuiModal",
    slot: "Backdrop",
    overridesResolver: (props, styles) => {
        return styles.backdrop;
    },
})({ zIndex: -1, backdropFilter: "blur(5px)" });

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 360,
    maxWidth: 400,
    bgcolor: "background.paper",
    boxShadow: 5,
    p: 4,
    borderRadius: 2,
};

const LoginForm = () => {
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = React.useState({
        username: "",
        password: "",
        showPassword: false,
    });
    let payload = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmitForm = (event) => {
        if (values.username && values.password) {
            const requestBody = {
                username: values.username,
                password: values.password,
                request_token: payload.accessToken.request_token,
            };
            createSession(dispatch, requestBody);
            setOpen(false);
            setValues({ ...values, username: "", password: "" });
        }
        event.preventDefault();
    };

    React.useEffect(() => {
        if (!payload.accessToken.request_token) {
            console.log("No access token");
            getToken(dispatch);
        }
        if (new Date() > new Date(payload.accessToken.expires_at)) {
            console.log("Expired");
            getToken(dispatch);
        }
    }, [payload, dispatch]);

    return (
        <div>
            <Button variant="contained" color="warning" onClick={handleOpen}>
                Login
            </Button>
            <Modal
                BackdropComponent={backdrop}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography sx={{ mb: 4 }} variant="h6">
                        Login with your TMDB account
                    </Typography>
                    <form onSubmit={handleSubmitForm}>
                        <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <OutlinedInput
                                label="Username"
                                id="username"
                                value={values.username}
                                onChange={handleChange("username")}
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            sx={{ mb: 3 }}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? "text" : "password"}
                                value={values.password}
                                onChange={handleChange("password")}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {values.showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Button
                            onClick={handleSubmitForm}
                            type="submit"
                            variant="contained"
                            color="info"
                        >
                            Login
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default LoginForm;
