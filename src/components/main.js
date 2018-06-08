import React, { Component } from 'react'
import './main.css'
import Flat from './flat'
import GoogleMapReact from 'google-map-react';
import Marker from './marker'


//const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            flats: [],
            selectedFlats: null 
        };
    }

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json')
            .then(response => response.json())
            .then(data => this.setState({
                flats: data
            }))

    }

    static defaultProps = {
        zoom: 13
      };

    selectFlat = (e) => {
        this.setState({
            selectedFlats: e
        })
    }

  render() {
    let center = {
        lat: 48.864716,
        lng: 2.349014
    };

    if(this.state.selectedFlats) {
        center = {
            lat: this.state.selectedFlats.lat,
            lng: this.state.selectedFlats.lng
        };
    }

    return (
      <div>
          <div className="flat-col">
            <div className="flat-search"></div>
            <div className="flat-row">
                {this.state.flats.map((e,i) => {
                    return <Flat 
                    key={i} 
                    flat={e}
                    selFlat={this.selectFlat}
                    />
                })}
            </div>
            <div className="flat-map">
            <GoogleMapReact
            center={center}
            defaultZoom={this.props.zoom}
            >
                {this.state.flats.map((fl, flkey) => {
                    return (
                        <Marker 
                        key={flkey}
                        lat={fl.lat}
                        lng={fl.lng}
                        text={fl.price}
                        selClass={fl === this.state.selectedFlats}
                        />
                    );
                })}
            </GoogleMapReact>
            </div>
          </div>
      </div>
    )
  }
}
