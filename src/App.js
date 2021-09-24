import React from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home";
import WatchList from "./Pages/WatchList";
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
                </Switch>
            </Router>
        </main>
    );
};

export default App;
