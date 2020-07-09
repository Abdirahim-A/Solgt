import React, {Component} from 'react';
import './comCSS/dashboard.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Navbar extends Component{
  constructor() {
    super();
    //Set default message
    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    //GET message from server using fetch api 
      axios.get('/users')
      .then(res => {
        const users = res.data;
        this.setState({ users });
      })
  }

  render(){
  return (
    <div class="navbar">
        <div class="navbar_inner">
            <div class="navbar_item">
                <img src={process.env.PUBLIC_URL + '/images/solgt-logo.png'} class="navbar_item_image" />
            </div>
            <div class="navbar_item navbar_item--margin">
                <div class="navbar_item--div">
                    <div class="navbar_item_dropdown">
                        <p>Ola Nordmann</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
}

export default Navbar;
