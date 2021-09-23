import axios from "axios";
import { actionType } from "../reducer/reducer";

const getUserInfo = (dispatch, sessionId) => {
    const getUserInfoURL = `https://api.themoviedb.org/3/account?api_key=059dbc00809f38f222d2896e2f25d3c3&session_id=${sessionId}`;
    axios
        .get(getUserInfoURL)
        .then((response) => {
            dispatch({
                type: actionType.GET_USER,
                payload: {
                    id: response.data.id,
                    username: response.data.username,
                },
            });
            console.log(response.data)
        })
        .catch((error) => {
            console.error(error);
        });
};

export const getToken = (dispatch) => {
    const getTokenURL =
        "https://api.themoviedb.org/3/authentication/token/new?api_key=059dbc00809f38f222d2896e2f25d3c3";
    axios
        .get(getTokenURL)
        .then((response) => {
            dispatch({ type: actionType.GET_TOKEN, payload: response.data });
        })
        .catch((error) => {
            console.error(error);
        });
};

export const createSession = (dispatch, requestBody) => {
    const createSessionURL =
        "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=059dbc00809f38f222d2896e2f25d3c3";
    const sessionIdURL =
        "https://api.themoviedb.org/3/authentication/session/new?api_key=059dbc00809f38f222d2896e2f25d3c3";
    axios
        .post(createSessionURL, requestBody)
        .then((response) => {
            console.log(response.data);

            axios
                .post(sessionIdURL, {
                    request_token: response.data.request_token,
                })
                .then((response) => {
                    getUserInfo(dispatch, response.data.session_id);
                    dispatch({
                        type: actionType.CREATE_SESSION,
                        payload: response.data,
                    });
                    console.log("AXIOS CREATE SESSION")
                    getToken(dispatch);
                });
        })
        .catch((error) => {
            console.error(error);
        });
};

export const deleteSession = (dispatch, requestBody) => {
    const deleteSessionURL =
        "https://api.themoviedb.org/3/authentication/session?api_key=059dbc00809f38f222d2896e2f25d3c3";
    axios
        .delete(deleteSessionURL, { data: requestBody })
        .then((response) => {
            if (response.data.success) {
                dispatch({ type: actionType.DELETE_SESSION });
            }
        })
        .catch((error) => {
            console.error(error);
        });
};
