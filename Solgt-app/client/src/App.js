import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Bolig from './components/Bolig';
import Tilbud from './components/Tilbud';


function App(){
return (
<Router>
  <Navbar/>
    <div className="App">
        <Switch>
        <Route exact path="/Dashboard"><Dashboard /></Route>
        <Route exact path="/Bolig"><Bolig /></Route>
        <Route exact path="/Tilbud"><Tilbud /></Route>
        </Switch>
    </div>
</Router>

)
}

export default App;
