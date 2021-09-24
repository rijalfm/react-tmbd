export const actionType = {
    GET_TOKEN: "GET_TOKEN",
    CREATE_SESSION: "CREATE_SESSION",
    DELETE_SESSION: "DELETE_SESSION",
    GET_USER: "GET_USER",
};

const genres = [
    {
        id: 28,
        name: "Action",
    },
    {
        id: 12,
        name: "Adventure",
    },
    {
        id: 16,
        name: "Animation",
    },
    {
        id: 35,
        name: "Comedy",
    },
    {
        id: 80,
        name: "Crime",
    },
    {
        id: 99,
        name: "Documentary",
    },
    {
        id: 18,
        name: "Drama",
    },
    {
        id: 10751,
        name: "Family",
    },
    {
        id: 14,
        name: "Fantasy",
    },
    {
        id: 36,
        name: "History",
    },
    {
        id: 27,
        name: "Horror",
    },
    {
        id: 10402,
        name: "Music",
    },
    {
        id: 9648,
        name: "Mystery",
    },
    {
        id: 10749,
        name: "Romance",
    },
    {
        id: 878,
        name: "Science Fiction",
    },
    {
        id: 10770,
        name: "TV Movie",
    },
    {
        id: 53,
        name: "Thriller",
    },
    {
        id: 10752,
        name: "War",
    },
    {
        id: 37,
        name: "Western",
    },
];

const initialState = {
    sessionId: localStorage.getItem("sessionId") || "",
    accessToken: JSON.parse(localStorage.getItem("accessToken")) || {},
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
    movieGenre: genres,
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
            console.log("CREATE SESSION");
            return { ...state, sessionId };

        case actionType.GET_USER:
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
            console.log("GET USER INFO");
            return { ...state, userInfo: action.payload };

        case actionType.DELETE_SESSION:
            localStorage.removeItem("sessionId");
            localStorage.removeItem("userInfo");
            return { ...state, sessionId: "", userInfo: {} };

        default:
            console.log("DEFAULT");
            return state;
    }
};

export default reducer;
