import * as React from 'react';
import { Route } from "react-router-dom";
import { Timetube } from "./components/timetube/Timetube";
import { Welcome } from "./components/welcome/Welcome";

export const routes = () => {
	return <div className="main-wrapper">
		<Route path="/" exact={true} component={Welcome}/>
		<Route path="/channel/:timetubeId" exact={true} component={Timetube}/>
	</div>
};