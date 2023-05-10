import React, { Component, createRef } from 'react';
import { touchProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import "../Styles/main.css";
import Shamanvideo from "../Videos/ramazan.mp4";
export default class Shaman extends Component {
  render() {
    return (
        <div className="shaman" id="shaman">
            <video autoPlay loop id="shamanvideo" src={Shamanvideo}/>
        </div>
    )
  }
}
