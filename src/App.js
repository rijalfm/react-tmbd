import Jumbo from "./components/Jumbo/Jumbo"
import MovieList from "./components/MovieList/MovieList"
import React from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import Navbar from "./components/Navbar/Navbar";

const App = () => {

    return (
        <main>
            <Navbar login={<LoginForm />} />
            <Jumbo name="Now Playing" />
            <MovieList />
            <Jumbo name="On Trending" />
            {/* <LoginForm /> */}
        </main>
    )
}

export default App