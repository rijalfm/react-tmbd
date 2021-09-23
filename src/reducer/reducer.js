export const actionType = {
    GET_TOKEN: "GET_TOKEN",
    CREATE_SESSION: "CREATE_SESSION",
    DELETE_SESSION: "DELETE_SESSION",
    GET_USER: "GET_USER",
};

const initialState = {
    sessionId: localStorage.getItem("sessionId") || "",
    accessToken: JSON.parse(localStorage.getItem("accessToken")) || {},
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
};

console.log(initialState);

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_TOKEN:
            const data = action.payload;
            localStorage.setItem("accessToken", JSON.stringify(data));
            return { ...state, accessToken: data };

        case actionType.CREATE_SESSION:
            const sessionId = action.payload.session_id;
            localStorage.setItem("sessionId", sessionId);
            return { ...state, sessionId };

        case actionType.GET_USER:
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
            return { ...state, userInfo: action.payload };
            

        case actionType.DELETE_SESSION:
            localStorage.removeItem("sessionId");
            localStorage.removeItem("userInfo");
            return { ...state, sessionId: "", userInfo: {} };

        default:
            console.log("DEFAULT");
            return state;
    }
}

export default reducer;
