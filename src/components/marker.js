import React, { Component } from 'react'
import './marker.css';

export default class Marker extends Component {
  render() {

    let clases = "map-icon";
    if(this.props.selClass) {
        clases += " sel";
    }

    return (
      <div>
        <div className={clases}>
            {this.props.text}€
        </div>
      </div>
    )
  }
}
