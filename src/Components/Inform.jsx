//import { Text, StyleSheet, View } from 'react-native'
import React, { Component,useContext,useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import "../Styles/main.css";
import { DriverContext } from './Contexts/driverContext';
import axios from 'axios';
export default function Inform()  {
  const navigate = useNavigate();
  const {Driver, updateValues} = useContext(DriverContext);
  useEffect(() => {
    console.log("subcribe");
    subscribe();
  }, [])
  function WorkStatus(){
    if(Driver.is_sleeping){
      return <h1 className="info-main-h1">Водитель спит</h1>
    }
    if(Driver.is_breaking){
      return <h1 className="info-main-h1">Водитель отдыхает</h1>
    }
    return (
      <ul className="info-main-ul" id="info-main-ul">
      {Driver.currentPath.map((stopOver,index) => {
        if(index >= Driver.indexStopOver)
        return(
          <li key={stopOver+index} className="info-main-li" id="info-main-li"> 
          <p id="info-main-li-stopover">{stopOver}</p>
          <p id="info-main-li-count">{Driver.stopOversSizes[index]} чел.</p>
          </li>);
      })}
    </ul>
    )
  }
  async function subscribe(){
    try {
        if(!Driver.token) return false
        const {data} = await axios.get('/info',
        {headers: {Authorization: `Bearer ${Driver.token}`}}
        )
        updateValues({
          hours: data.Info[0].hours,
          minutes: data.Info[0].minutes,
          seconds: data.Info[0].seconds,
          koef: data.Info[0].koef,
          indexStopOver: data.Info[1].indexStopOver,
          is_recursive: data.Info[1].is_recursive,
          is_breaking: data.Info[1].is_breaking,
          breaking_in_min: data.Info[1].breaking_in_min,
          is_sleeping: data.Info[1].is_sleeping,
          sizeOfPaths: data.Info[1].sizeOfPaths,
          currentPath: data.Info[1].currentPath,
          passengersSize: data.Info[1].PassengersIndexes.length,
          stopOversSizes: data.Info[2],
        });
        setTimeout(() => {
           subscribe();
        }, (1000/Driver.koef));
        
    } catch (e) {
        setTimeout(() => {
            subscribe();
        }, (1000/Driver.koef))
    }
  }
  function Exit(){
    console.log('Exit');
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
        <div className="info-div" id="info-div">
        <div className="info-header">
          <div className="info-header-div-imgName"id="info-header-div-imgName">
          
          <p className="info-header-count" id="info-header-name">{Driver.fullname}</p>
          
          </div>
          <div className="info-header-count">
            <p className="info-header-count-p" id="info-header-count-p"> Такси №{Driver.busId} | Занятость: {Driver.passengersSize}/{Driver.max_passengers} </p>
          </div>
          <div className="info-header-count">
            <p className="info-header-count-p" id="info-header-count-time"> {Driver.hours} : {Driver.minutes} : {Driver.seconds} , {Driver.koef} </p>
          </div>
        </div>
        <div className="info-main">
          <WorkStatus/>
        </div>
        <div className='info-main'>
              <button onClick={Exit} className='info-main-button'> Выйти </button>
        </div>
      </div>
    )
}