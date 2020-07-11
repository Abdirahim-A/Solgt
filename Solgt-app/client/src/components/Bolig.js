import React, {Component} from 'react';
import './comCSS/bolig.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Bolig extends Component{
  constructor() {
    super();
    //Set default message
    this.state = {
        openFilter: false,
        bolig: [],
        filterBolig: [],
        mMin: '',
        mMax: '',
        PrisantydningMin: '',
        PrisantydningMax: '',
        kvmPrisMin: '',
        kvmPrisMax: '',
        ByggeaarMin: '',
        ByggeaarMax: '',
        SoveromMin: '',
        SoveromMax: '',
    }
    this.openFilter = this.openFilter.bind(this);
    this.MinMax = this.MinMax.bind(this);
  }

    componentDidMount() {
        axios.get('/boliger')
        .then(res => {
            const bolig = res.data;
            this.setState({ bolig: bolig, filterBolig: bolig });
        })
    }

    openFilter() {
        this.setState(state => ({
            openFilter: !this.state.openFilter,
        }));
    }


    MinMax(event){
        if (event.target.value == ''){
            this.setState({
                [event.target.name]: event.target.value, 
            });
        } else{
            this.setState({
                [event.target.name]: parseInt(event.target.value), 
            });
        }
    }

    search(event){
        var key = event
        var Min = key + 'Min'
        var Max = key + 'Max'

        if (this.state[Max] == ''){
                this.setState({
                    bolig: this.state.filterBolig.filter(x => parseFloat(x[key].replace(/,/g, ''))  >= this.state[Min]),
                    openFilter: !this.state.openFilter,
                });

        } else if (this.state[Min] == ''){
                this.setState({
                    bolig: this.state.filterBolig.filter(x => parseFloat(x[key].replace(/,/g, ''))  <= this.state[Max]),
                    openFilter: !this.state.openFilter,
                });

        } else {
                this.setState({
                    bolig: this.state.filterBolig.filter(x => parseFloat(x[key].replace(/,/g, ''))  >= this.state[Min] && parseFloat(x[key].replace(/,/g, ''))  <= this.state[Max]),
                    openFilter: !this.state.openFilter,
                });
            }
    }

  render(){
  return (
    <div class="bolig">
    <div class="bolig_info">
        <div class="bolig_info_item">
            <h3 class="bolig_info_item_tree">Søknader - Borettslagbrakkeveien 34A - Beslutningsstøtte</h3>
            <div class="bolig_info_btn--div">
                <button class="bolig_info_btn ">Beslutningssenter</button>
                <button class="bolig_info_btn">Gi tilbud</button>
            </div>
        </div>

        <div class="bolig_info_item">
            <div class="bolig_info_item_top">
                <p>Resultater: {this.state.bolig.length}</p>
                <div><select class="bolig_info_item_top_select">
                    <option disabled>Prisantydning</option>
                    <option value="HALA">Høy - Lav</option>
                    <option value="LAHA">Lav - Høy</option>
                </select>
                    <button class="openFilter_btn" onClick={this.openFilter}>Filter</button>
                </div>
            </div>
            <div class="bolig_table">
                <table>
                    <tr>
                        <th>#</th>
                        <th>Adresse</th>
                        <th>Areal (p-rom)</th>
                        <th>Soverom</th>
                        <th>kvm-pris</th>
                        <th>Bydel</th>
                        <th>Byggeår</th>
                        <th>Etasje</th>
                        <th>Prisantydning</th>
                    </tr>

                    {this.state.bolig.map((key, index) => 
                    <tr>
                        <td>{index}</td>
                        <td>{key.Adresse}</td>
                        <td>{key.m}</td>
                        <td>{key.Soverom}</td>
                        <td>{key.kvmPris}</td>
                        <td>{key.Bydel}</td>
                        <td>{key.Byggeaar}</td>
                        <td>{key.Etasje}</td>
                        <td>{key.Prisantydning}</td>
                    </tr>
                    )}
                </table>
            </div>
        </div>
    </div>
    <div class="bolig_filter" style={this.state.openFilter ? {width: '25%', visibility: 'visible'} : {width: '0%', visibility: 'hidden'} }>
        <button class="bolig_filter_input_reset--btn" onClick={this.openFilter}>Gjem meny</button>
        <div class="bolig_filter_input--container" style={this.state.openFilter ? {animation: 'fadeUp 0.5s 0.5s both'} : {animation: 'fadeAwayRight 0.1s both'}}>
            <div class="bolig_filter_input--item bolig_filter--top">
                <h3 class="bolig_filter_input_title">Filtrer på boliger</h3>
                <button class="bolig_filter_input_reset--btn" onClick={() => window.location.reload(false)}>Nullstill alle filtre</button>
            </div>
            <div class="bolig_filter_input--item">
                <p class="bolig_filter_input_label">Areal (p-rom)</p>
                <div class="bolig_filter_input--item_btn--div">
                    <div>
                        <input type="number" class="bolig_filter_input_input" 
                        name="mMin"
                        value={this.state.mMin}
                        onChange={this.MinMax}
                        />
                        <p class="bolig_filter_input_label">Fra kvadratmeter</p>
                    </div>

                    <div>
                        <input type="number" class="bolig_filter_input_input" 
                        name="mMax"
                        value={this.state.mMax}
                        onChange={this.MinMax}
                        />
                        <p class="bolig_filter_input_label">Til kvadratmeter</p>
                    </div>
                    <div>
                        <div class="grey-search-box" onClick={this.search.bind(this, 'm')}><img src={process.env.PUBLIC_URL + '/images/icons/searchFilter.png'}  class="search-filter--img" /></div>
                    </div>
                </div>
            </div>

            <div class="bolig_filter_input--item">
                <p class="bolig_filter_input_label">Prisantydning</p>
                <div class="bolig_filter_input--item_btn--div">
                    <div>
                        <input type="number" class="bolig_filter_input_input" 
                        name="PrisantydningMin"
                        value={this.state.PrisantydningMin}
                        onChange={this.MinMax}
                        />
                        <p class="bolig_filter_input_label">Fra kr</p>
                    </div>

                    <div>
                        <input type="number" class="bolig_filter_input_input" 
                        name="PrisantydningMax"
                        value={this.state.PrisantydningMax}
                        onChange={this.MinMax}
                        />
                        <p class="bolig_filter_input_label">Til kr</p>
                    </div>
                    <div>
                        <div class="grey-search-box" onClick={this.search.bind(this, 'Prisantydning')}><img src={process.env.PUBLIC_URL + '/images/icons/searchFilter.png'}  class="search-filter--img" /></div>
                    </div>
                </div>
            </div>

            <div class="bolig_filter_input--item">
                <p class="bolig_filter_input_label">Kvm-pris</p>
                <div class="bolig_filter_input--item_btn--div">
                    <div>
                        <input type="number" class="bolig_filter_input_input" 
                        name="kvmPrisMin"
                        value={this.state.kvmPrisMin}
                        onChange={this.MinMax}
                        />
                        <p class="bolig_filter_input_label">Fra kr</p>
                    </div>

                    <div>
                        <input type="number" class="bolig_filter_input_input" 
                        name="kvmPrisMax"
                        value={this.state.kvmPrisMax}
                        onChange={this.MinMax}
                        />
                        <p class="bolig_filter_input_label">Til kr</p>
                    </div>
                    <div>
                        <div class="grey-search-box" onClick={this.search.bind(this, 'kvmPris')}><img src={process.env.PUBLIC_URL + '/images/icons/searchFilter.png'}  class="search-filter--img" /></div>
                    </div>
                </div>
            </div>

            <div class="bolig_filter_input--item">
                <p class="bolig_filter_input_label">Område, by eller sted</p>
                <div class="bolig_filter_input--item_select--div">
                    <div>
                        <select class="bolig_filter_input_select">
                            <option value="Frogner">Frogner</option>
                        </select>
                    </div>
                    <div>
                        <div class="grey-search-box"><img src={process.env.PUBLIC_URL + '/images/icons/searchFilter.png'}  class="search-filter--img" /></div>
                    </div>
                </div>
            </div>

            <div class="bolig_filter_input--item">
                <p class="bolig_filter_input_label">Byggeår</p>
                <div class="bolig_filter_input--item_btn--div">
                    <div>
                        <input type="number" class="bolig_filter_input_input" 
                        name="ByggeaarMin"
                        value={this.state.ByggeaarMin}
                        onChange={this.MinMax}
                        />
                        <p class="bolig_filter_input_label">Fra år</p>
                    </div>

                    <div>
                        <input type="number" class="bolig_filter_input_input" 
                        name="ByggeaarMax"
                        value={this.state.ByggeaarMax}
                        onChange={this.MinMax}
                        />
                        <p class="bolig_filter_input_label">Til år</p>
                    </div>
                    <div>
                        <div class="grey-search-box" onClick={this.search.bind(this, 'Byggeaar')}><img src={process.env.PUBLIC_URL + '/images/icons/searchFilter.png'}  class="search-filter--img" /></div>
                    </div>
                </div>
            </div>
            <div class="bolig_filter_input--item">
                <p class="bolig_filter_input_label">Soverom</p>
                <div class="bolig_filter_input--item_btn--div">
                    <div>
                        <input type="number" class="bolig_filter_input_input" 
                        name="SoveromMin"
                        value={this.state.SoveromMin}
                        onChange={this.MinMax}
                        />
                        <p class="bolig_filter_input_label">Fra kr</p>
                    </div>

                    <div>
                        <input type="number" class="bolig_filter_input_input" 
                        name="SoveromMax"
                        value={this.state.SoveromMax}
                        onChange={this.MinMax}
                        />
                        <p class="bolig_filter_input_label">Til kr</p>
                    </div>
                    <div>
                        <div class="grey-search-box" onClick={this.search.bind(this, 'Soverom')}><img src={process.env.PUBLIC_URL + '/images/icons/searchFilter.png'} class="search-filter--img" /></div>
                    </div>
                </div>
            </div>

            <div class="bolig_filter_input--item">
                <p class="bolig_filter_input_label">Eieform</p>
                <div>
                    <div class="bolig_filter_input--item_eieform--div">
                        <label class="bolig_filter_eieform--text"> <input type="checkbox" name="selveier" class="bolig_filter_checkbox" /> Selveier</label>
                    </div>
                    <div class="bolig_filter_input--item_eieform--div">
                        <label class="bolig_filter_eieform--text"> <input type="checkbox" name="andelsleilighet" class="bolig_filter_checkbox" /> Andelsleilighet</label>
                    </div>
                    <div class="bolig_filter_input--item_eieform--div">
                        <label class="bolig_filter_eieform--text"> <input type="checkbox" name="borettslag" class="bolig_filter_checkbox" /> Borettslag</label>
                    </div>
                    <div class="bolig_filter_input--item_eieform--div">
                        <label class="bolig_filter_eieform--text"> <input type="checkbox" name="aksjeleilighet" class="bolig_filter_checkbox" /> Aksjeleilighet</label>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
  );
}
}

export default Bolig;
