import {Router,Route} from "dva/router";
import App from "./containers/App.js";
import React from "react";
import Picshow from "./containers/Picshow.js";
import CarPicker from "./containers/CarPicker.js";


export default ({history})=>{
    return (
        <Router history={history}>
            <Route path="/" component={CarPicker}/>
            <Route path="/picshow/:type" component={Picshow}/>
        </Router>
    );
}