import { View } from 'react-native';
import React, { Component,useEffect } from 'react';
import {BrowserRouter,NavLink,Route,Routes,useNavigate} from 'react-router-dom';
import Login from './Login.jsx'; 
import Inform from "./Inform.jsx"
import Shaman from "./Shaman.jsx"
import axios  from 'axios';
import { DriverContextProvider } from './Contexts/driverContext.jsx';

export default function App(){
 function RedirectOnLoad() {
    const navigate = useNavigate();
    useEffect(() => {
      try{
      const {data} = axios.get("/init");
      console.log(data);
      }
      catch(err){console.error(err.response.data);}
      navigate("/login");
    },[]);
    return null;
  }
    return (
      <DriverContextProvider>
        <BrowserRouter>
      <View>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/info' element={<Inform/>}/>
          <Route path='/shaman' element={<Shaman/>}/>
        </Routes>
      </View>
      <RedirectOnLoad />
      </BrowserRouter>
      </DriverContextProvider>
    )

};
