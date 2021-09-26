import React from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home";
import WatchList from "./Pages/WatchList";
import Detail from "./Pages/Detail";
import Search from "./Pages/Search";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

const App = () => {
    return (
        <main>
            <Router>
            <Navbar login={<LoginForm />} />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/watchlist">
                        <WatchList />
                    </Route>
                    <Route path="/detail/:movieId">
                        <Detail />
                    </Route>
                    <Route path="/search/:query">
                        <Search />
                    </Route>
                </Switch>
            </Router>
        </main>
    );
};

export default App;
