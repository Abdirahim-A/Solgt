import React, {Component} from 'react';
import './comCSS/tilbud.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Tilbud extends Component{
  constructor() {
    super();
    this.state = {
      netto: 4675000,
      min: 4250000,
      max: 5350000,
      rente: false,
      risiko: false,
      conv: false,
      opp: false,
      renteHov: false,
      risikoHov: false,
      convHov: false,
      oppHov: false,
      prosent: 0
    }
    this.changedValue = this.changedValue.bind(this)
    this.Percentage = this.Percentage.bind(this)
  }

  changedValue(event){
    const value = event.target.value
    this.setState(state => ({
          netto: value
    }));
  }

  Percentage(event){
    const name = event.target.id
    const value = parseFloat(event.target.value)
    const add = parseFloat(this.state.netto) + (this.state.netto * value)/10000
    const remove = parseFloat(this.state.netto) - (this.state.netto * value)/10000

    if (this.state[name]){
        this.setState(state => ({
            netto: Number(parseFloat(remove).toFixed(2)),
            [name]: !this.state[name],
            prosent: this.state.prosent - value/100
        }));
    } else {
        this.setState(state => ({
            netto: Number(parseFloat(add).toFixed(2)),
            [name]: !this.state[name],
            prosent: this.state.prosent + value/100
        }));
    }
}

  render(){

  return (
      <div class="tilbud">
        <div class="bolig_info_item">
        <h3 class="bolig_info_item_tree">Søknader - Borettslagbrakkeveien 34A - Beslutningsstøtte</h3>
        <div class="bolig_info_btn--div">
            <div class="bolig_info_btn" style={{backgroundColor: 'lightgray', boxShadow: '0px 0px 0px #888888'}}>
                <img src={process.env.PUBLIC_URL + '/images/icons/search.png'} class="bolig_info_btn_img" />
                <p>Beslutningssenter</p> 
            </div>
            <div class="bolig_info_btn" style={{backgroundColor: 'rgb(216, 253, 217)', boxShadow: '0px 0px 10px rgba(21, 184, 0, 0.25);'}}>
                <img src={process.env.PUBLIC_URL + '/images/icons/money.png'} class="bolig_info_btn_img" />
                <p>Gi tilbud</p></div>
        </div>
        
      </div>
    <div class="markedsverdi">
    <div class="markedsverdi_item">
        <h3 class="markedsverdi_item--address">Borettslagbrakkeveien 34A, H301</h3>
    </div>
    <div class="markedsverdi_item">
        <div class="markedsverdi_item--div">
            <h3 class="markedsverdi_item--div_pris">Umiddelbar pris mottatt <br />
                4 650 000 - 4 950 000</h3>
        </div>
    </div>

    <div class="markedsverdi_item">
        <h3 class="markedsverdi_item_title">Markedsverdi:</h3>
        <div class="markedsverdi_item--div_verdi">
            <h3 class="markedsverdi_item--div_verdi--text">{this.state.netto} kr</h3>
        </div>
    </div>

    <div class="markedsverdi_item">
        <input type="range" min={this.state.min} max={this.state.max} defaultValue={this.state.netto} onChange={this.changedValue} class="markedsverdi_item_slider" />
        <div class="markedsverdi_item_slider_range">
            <p class="markedsverdi_item_slider_p">4 250 000 kr</p>
            <p class="markedsverdi_item_slider_p">5 350 000 kr</p>
        </div>
    </div>
    
     <div class="markedsverdi_item">
        <h3 class="markedsverdi_item_title">Fordelingen av transaksjonskostnadene er følgende ({this.state.prosent}%) <br /> <span style={{fontSize: '16px'}}>Juster om nødvendig</span></h3>
    </div>
    
    <div class="markedsverdi_item">
        <ul class="markedsverdi_item--ul">
            <li class="markedsverdi_item--li" id="rente" value="50" onClick={this.Percentage} onMouseOver={() => this.setState({ renteHov: true })} onMouseOut={() => this.setState({ renteHov: false })}>0.5%</li>
            <li class="markedsverdi_item--li" id="risiko" value="100" onClick={this.Percentage} onMouseOver={() => this.setState({ risikoHov: true })} onMouseOut={() => this.setState({ risikoHov: false })}>1%</li>
            <li class="markedsverdi_item--li" id="conv" value="50" onClick={this.Percentage} onMouseOver={() => this.setState({ convHov: true })} onMouseOut={() => this.setState({ convHov: false })}>0.5%</li>
            <li class="markedsverdi_item--li" id="opp" value="25" onClick={this.Percentage} onMouseOver={() => this.setState({ oppHov: true })} onMouseOut={() => this.setState({oppHov: false })}>0.25%</li>
        </ul>
    </div>
    
    <div class="markedsverdi_item prercentage">
        <div class="prercentage_container">
            <div class="prercentage_item" style={this.state.rente ? {boxShadow: '-10px 10px 20px rgba(0, 0, 0, 0.25)', transform: 'translatey(-5px)'} : {boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.25)', transform: 'translatey(0px)'}}>
            <h3 class="prercentage_container--title" style={this.state.renteHov ? {opacity: '1'} : {opacity: '0.5'}}>0.5% Renteutgifter</h3>
            <p class="prercentage_container--text" style={this.state.rente ? {opacity: '1'} : {opacity: '0.5'}}>Utgifter relatert til finansiering av perioden mellom du selger til boligen blir videresolgt</p>
            </div>
            
            <div class="prercentage_item" style={this.state.risiko ? {boxShadow: '-10px 10px 20px rgba(0, 0, 0, 0.25)', transform: 'translatey(-5px)'} : {boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.25)', transform: 'translatey(0px)'}}>
            <h3 class="prercentage_container--title"  style={this.state.risikoHov ? {opacity: '1'} : {opacity: '0.5'}}>1% Risikotillegg</h3>
            <p class="prercentage_container--text" style={this.state.risiko ? {opacity: '1'} : {opacity: '0.5'}}>For å dekke inn risikoen ved uforutsette markedsbevegelser</p>
            </div>
        </div>
        <div class="prercentage_container">
            <div class="prercentage_item" style={this.state.conv ? {boxShadow: '-10px 10px 20px rgba(0, 0, 0, 0.25)', transform: 'translatey(-5px)'} : {boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.25)', transform: 'translatey(0px)'}}>
            <h3 class="prercentage_container--title"  style={this.state.convHov ? {opacity: '1'} : {opacity: '0.5'}}>0.5% Convenience</h3>
            <p class="prercentage_container--text" style={this.state.conv ? {opacity: '1'} : {opacity: '0.5'}}>Premium for at vi gjør opplevelsen enklere og bedre for deg</p>
            </div>
            
            <div class="prercentage_item" style={this.state.opp ? {boxShadow: '-10px 10px 20px rgba(0, 0, 0, 0.25)', transform: 'translatey(-5px)'} : {boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.25)', transform: 'translatey(0px)'}}>
            <h3 class="prercentage_container--title"  style={this.state.oppHov ? {opacity: '1'} : {opacity: '0.5'}}>0.25% oppgjør</h3>
            <p class="prercentage_container--text" style={this.state.opp ? {opacity: '1'} : {opacity: '0.5'}}>Utgifter relatert til mellomfinansiering</p>
            </div>
        </div>
    </div>
    
     <div class="markedsverdi_item">
        <h3 class="markedsverdi_item_title">Netto Sum:</h3>
        <div class="markedsverdi_item--div_verdi" style={{backgroundColor: 'transparent', border: 'solid 1px lightgray'}}>
            <h3 class="markedsverdi_item--div_verdi--text" style={{color: 'black'}}>{this.state.netto} kr</h3>
        </div>
    </div>
    
    <div class="markedsverdi_item">
        <button class="sendTilbud_btn">Send tilbud</button>
    </div>
</div>
</div>
  );
}
}

export default Tilbud;
