import React, {Component} from 'react';
import './comCSS/dashboard.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Dashboard extends Component{
  constructor() {
    super();
    //Set default message
    this.state = {
      openMeny: true,  
      open: false,  
      progress: [],
      godtattTilbud: [],
      avtalBefaring: [],
      befaringrapport: [],
      closing: [],
      kostnader: [],
    }
    this.openKostnader = this.openKostnader.bind(this);
    this.openMeny = this.openMeny.bind(this);
  }

  componentDidMount() {
    //GET message from server using fetch api 
      axios.get('/progress')
      .then(res => {
        const progress = res.data;
        const godtattTilbud = res.data.godtattTilbud;
        const avtalBefaring = res.data.avtalBefaring;
        const befaringrapport = res.data.befaringrapport;
        const closing = res.data.closing;
        const kostnader = res.data.kostnader;
        this.setState({ progress, godtattTilbud, avtalBefaring, befaringrapport, closing, kostnader });
      })
  }

  openKostnader() {
    this.setState(state => ({
      open: !this.state.open,
    }));
  }

  openMeny() {
    this.setState(state => ({
      openMeny: !this.state.openMeny,
    }));
  }

  render(){
    var kostnader = this.state.kostnader.map((key => key.kostnad))
    var totaleKostnader = 0
    var i = 0
    for (var i = 0; i < kostnader.length; i++) {
        var totaleKostnader = totaleKostnader + kostnader[i]
    } 
    
    const nettoUtbetalt = this.state.progress.boligverdi + totaleKostnader
  return (
    <div class="dashboard">
    <div class="dashboad_item">

        <div class="dashboard_item_meny">
            <div class="dashboard_item_meny_top">
            <div class="dashboard_item_meny_phone--div" onClick={this.openMeny}><h3 class="dashboard_item_meny_top_title">Naviger til</h3> <img src={process.env.PUBLIC_URL + '/images/icons/dropdown.png'} class="dropdown_img" /></div>

                <ul class="dashboard_item_meny_top_ul" style={ this.state.openMeny ? { display: 'block'} : { display: 'none'}}>
                    <li class="dashboard_item_meny_top_li"><img src={process.env.PUBLIC_URL + '/images/icons/checklist.png'} class="dashboard_item_meny_top_img" />
                        <p>Oversikt</p>
                    </li>
                    <li class="dashboard_item_meny_top_li"> <img src={process.env.PUBLIC_URL + '/images/icons/papers.png'} class="dashboard_item_meny_top_img" />
                        <p>Kontrakt</p>
                    </li>
                    <li class="dashboard_item_meny_top_li"> <img src={process.env.PUBLIC_URL + '/images/icons/search.png'} class="dashboard_item_meny_top_img" />
                        <p>Befaring</p>
                    </li>
                    <li class="dashboard_item_meny_top_li"> <img src={process.env.PUBLIC_URL + '/images/icons/door.png'} class="dashboard_item_meny_top_img" />
                        <p>Closing</p>
                    </li>
                </ul>
            </div>
            <div class="dashboard_item_meny_bottom">
                <button class="dashboard_item_meny_bottom_btn">Hjelp</button>
            </div>
        </div>
    </div>
    <div class="dashboad_item">
        <div class="dashboard_item_progress">
            <div class="dashboard_item_progress_info">
                <div>
                    <h3 class="dashboard_item_progress_title">{this.state.progress.address}</h3>
                </div>
                <div class="dashboard_item_progress_info_items">
                    <div>
                        <h5 class="progress_info_txt">Boligverdi</h5>
                    </div>
                    <div>
                        <h5 class="progress_info_txt">{this.state.progress.boligverdi}kr</h5>
                    </div>
                </div>

                <div onClick={this.openKostnader} class={this.state.open ? "dashboard_item_progress_info_items progress_costs_open" : "dashboard_item_progress_info_items progress_costs_close"}>
                        <div class="dashboard_item_kostnader--div">
                            <h5 class="progress_info_txt">Kostnader</h5>
                            <img src={process.env.PUBLIC_URL + '/images/icons/dropdown.png'} class="dropdown_img" />
                        </div>
                        <div>
                            <h5 class="progress_info_txt">{totaleKostnader}</h5>
                        </div>
                        <div class="progress_costs_info" style={this.state.open ? {display: 'block'} : {display: 'none'}}>
                        {this.state.kostnader.map((key => 
                            <p class="progress_costs_info_txt"> {key.navn} <b>{key.kostnad}</b></p>
                            ))}
                        </div>u
                </div>

                <div class="dashboard_item_progress_info_items">
                    <div>
                        <h5 class="progress_info_txt">Netto utbetalt</h5>
                    </div>
                    <div>
                        <h5 class="progress_info_txt"><b>{nettoUtbetalt} kr</b></h5>
                    </div>
                </div>
            </div>
            <div class="dashboard_item_progress_milestone">
                <h3 class="dashboard_item_progress_title">Dine milepæler</h3>

                <div class="dashboard_milestone_container">
                    <div class="dashboard_milestone_items" style={this.state.godtattTilbud.status ? {borderLeft: 'solid 7px rgb(99, 201, 150)'} : {borderLeft: 'solid 7px #dedede'}}>
                        <div class="dashboard_milestone_items_circle" style={this.state.godtattTilbud.status ? {backgroundColor: 'rgb(99, 201, 150)'} : {backgroundColor: '#dedede'} }>
                            <img src={process.env.PUBLIC_URL + '/images/icons/check.png'} style={{padding: '3px', width: '80%'}} /></div>
                        <div class="dashboard_milestone_items_info">
                            <div class="dashboard_milestone_items_info_date">
                                <p>{this.state.godtattTilbud.month}</p>
                                <p><b>{this.state.godtattTilbud.day}</b></p>
                            </div>
                            <div class="dashboard_milestone_items_info_txt">
                                <p><b>Godtatt tilbud</b></p>
                                <p>{this.state.godtattTilbud.text}</p>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard_milestone_items" style={this.state.avtalBefaring.status ? {borderLeft: 'solid 7px rgb(99, 201, 150)'} : {borderLeft: 'solid 7px #dedede', opacity: '0.5'}}>
                        <div class="dashboard_milestone_items_circle" style={this.state.avtalBefaring.status ? {backgroundColor: 'rgb(99, 201, 150)'} : {backgroundColor: '#dedede'} }></div>
                        <div class="dashboard_milestone_items_info">
                            <div class="dashboard_milestone_items_info_date">
                                <p>{this.state.avtalBefaring.month}</p>
                                <p><b>{this.state.avtalBefaring.day}</b></p>
                            </div>
                            <div class="dashboard_milestone_items_info_txt">
                                <p><b>Avtal befaring</b></p>
                                <p>{this.state.avtalBefaring.text}</p>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard_milestone_items" style={this.state.befaringrapport.status ? {borderLeft: 'solid 7px rgb(99, 201, 150)'} : {borderLeft: 'solid 7px #dedede', opacity: '0.5'}}>
                        <div class="dashboard_milestone_items_circle" style={this.state.befaringrapport.status ? {backgroundColor: 'rgb(99, 201, 150)'} : {backgroundColor: '#dedede'}}></div>
                        <div class="dashboard_milestone_items_info">
                            <div class="dashboard_milestone_items_info_date">
                                <p>{this.state.befaringrapport.month}</p>
                                <p><b>{this.state.befaringrapport.day}</b></p>
                            </div>
                            <div class="dashboard_milestone_items_info_txt">
                                <p><b>Gjennomgå befaringsrapport</b></p>
                                <p>{this.state.befaringrapport.text}</p>
                            </div>
                        </div>
                    </div>

                    <div class="dashboard_milestone_items" style={this.state.closing.status ? {borderLeft: 'solid 7px rgb(99, 201, 150)'} : {borderLeft: 'solid 7px #dedede', opacity: '0.5'}}>
                        <div class="dashboard_milestone_items_circle" style={this.state.closing.status ? {backgroundColor: 'rgb(99, 201, 150)'} : {backgroundColor: '#dedede'}}></div>
                        <div class="dashboard_milestone_items_info">
                            <div class="dashboard_milestone_items_info_date">
                                <p>{this.state.closing.month}</p>
                                <p><b>{this.state.closing.day}</b></p>
                            </div>
                            <div class="dashboard_milestone_items_info_txt">
                                <p><b>Closing</b></p>
                                <p>{this.state.closing.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button class="dashboard_next-stage_btn">Neste: Avtal befaring</button>
        </div>
    </div>
    <div class="dashboad_item">
    <div class="dashboard_item_profile">
            <div class="dashboard_item_profile_info">
                <div class="dashboard_item_profile_info_item">
                    <img src={process.env.PUBLIC_URL + '/images/damn2.jpg'} class="dashboard_item_profile_info_image" /></div>
                <div class="dashboard_item_profile_info_about">
                    <p class="profile_about_txt">Jan Oftedal</p>
                    <p class="profile_about_txt">jan@solgt.no</p>
                </div>
            </div>
            <div class="dashboard_item_profile_help">
                <h5>Trenger du hjelp?</h5>
                <div class="dashboard_item_profile_help_btn--div">
                    <button class="dashboard_item_profile_help_btn">E-post</button>
                    <button class="dashboard_item_profile_help_btn">SMS</button>
                </div>
            </div>
        </div>
    </div>
</div>
  );
}
}

export default Dashboard;
