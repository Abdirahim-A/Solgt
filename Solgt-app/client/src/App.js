import React, {Component} from 'react';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App(){
return (
<Router>
  <Navbar/>
    <div className="App">
        <Switch>
        <Route exact path="/Dashboard"><Dashboard /></Route>
        </Switch>
    </div>
</Router>

)
}

export default App;
