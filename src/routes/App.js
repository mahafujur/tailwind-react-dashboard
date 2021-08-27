import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PublicRoute from "./publicRoutes";
import PrivateRoute from "./privateRoutes";
import LoginPage from "../pages/login/LoginPage";
import Dashboard from "../pages/dashboard/index";
import HomePage from "../pages/home/HomePage";
import NoMatch from "../components/404";

const App = () => (
    <Switch>
        <PublicRoute restricted={false} component={HomePage} path="/" exact/>
        <PublicRoute restricted={false} component={LoginPage} path="/login"  exact/>
        <PrivateRoute component={Dashboard} path="/dashboard"/>
        <Route path="*">
            <NoMatch />
        </Route>
    </Switch>
)

export default App
