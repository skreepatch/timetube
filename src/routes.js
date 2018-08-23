import { Route } from "react-router-dom";
import { Login } from "./components/login/Login";
import { ConnectedWelcome } from "./components/welcome/Welcome";
import { Timetube } from "./components/timetube/Timetube";
import React from "react";

export const routes = () => {
    return <div className="main-wrapper">
            <Route path="/login" exact={true} component={Login} />
            <Route path="/" exact={true} component={ConnectedWelcome} />
            <Route path="/channel/:timetubeId" exact={true} component={Timetube} />
        </div>
};