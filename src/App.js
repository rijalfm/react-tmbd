import Jumbo from "./components/Jumbo/Jumbo"
import MovieList from "./components/MovieList/MovieList"
import React from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import Navbar from "./components/Navbar/Navbar";


import CategoryList from "./components/CategoryList/CategoryList";

const App = () => {

    return (
        <main>
            <Navbar login={<LoginForm />} />
            <Jumbo name="Now Playing" />
            <MovieList />
            <CategoryList />
        </main>
    )
}

export default App