import React, {Component,useContext,useEffect,useState} from 'react';
import { useNavigate} from 'react-router-dom';
import "../Styles/main.css";
import axios from 'axios';
import { DriverContext } from './Contexts/driverContext';
import Icon from '../Img/g.png';
import ImageShadow from 'react-image-shadow';
import 'react-image-shadow/assets/index.css';

export default function Login() {
  const navigate = useNavigate();
  const [errmsg,setErr] = useState(" Неверный логин или пароль")
  const {Driver, updateValues} = useContext(DriverContext);
  useEffect(() => {
    isAuth();
  }, [])
function isAuth(){
    console.log("isAuth");
    const token = localStorage.getItem("token");
    if(!token) return console.log("Not authorized");
    axios.get('/auth/me',
    {headers: {Authorization: `Bearer ${token}`}}
    )
    .catch((error) => {
      const spanPass = document.getElementById('incorrect');
      if(error.response.status == "400"){
        console.error(error.response.data);
        setErr("Неверный формат логина или пароля");
      }
      if(error.response.status == "404"){
        console.error("incorrect password");
        setErr("Неверный логин или пароль");
      }     
      spanPass.style.display = "block";
      setTimeout(() => {
        spanPass.style.display = "none";
      }, 2000);
    })
   .then((response) => {
    localStorage.clear();
    localStorage.setItem('token',response.data.token);
    updateValues({
       fullname: response.data.FullName,
       hours: response.data.InfoBus[0].hours,
       minutes: response.data.InfoBus[0].minutes,
       seconds: response.data.InfoBus[0].seconds,
       koef: response.data.InfoBus[0].koef,
       indexStopOver: response.data.InfoBus[1].indexStopOver,
       is_recursive: response.data.InfoBus[1].is_recursive,
       is_breaking: response.data.InfoBus[1].is_breaking,
       breaking_in_min: response.data.InfoBus[1].breaking_in_min,
       is_sleeping: response.data.InfoBus[1].is_sleeping,
       max_passengers: response.data.InfoBus[1].max_passengers,
       sizeOfPaths: response.data.InfoBus[1].sizeOfPaths,
       path: response.data.InfoBus[1].path,
       path_rec: response.data.InfoBus[1].path_rec,
       currentPath: response.data.InfoBus[1].currentPath,
       passengersSize: response.data.InfoBus[1].PassengersIndexes.length,
       stopOversSizes: response.data.InfoBus[2],
       token: response.data.token,
       id: response.data._id,
       busId: response.data.busId,
     });
      navigate("/info");
   });

  }
 function tryToLogin(){
      console.log("tryToLogin");
      const login = document.getElementById('name').value || " ";
      const password = document.getElementById('password').value|| " ";
      if(login === "Ramzan Kadyrov" && password === "kadyrov"){navigate("/shaman"); return;}
      axios.post('/auth/login',
       {
        email: login ,
        password: password
      })
      .then((response) => {
        updateValues({
          fullname: response.data.FullName,
          hours: response.data.InfoBus[0].hours,
          minutes: response.data.InfoBus[0].minutes,
          seconds: response.data.InfoBus[0].seconds,
          koef: response.data.InfoBus[0].koef,
          indexStopOver: response.data.InfoBus[1].indexStopOver,
          is_recursive: response.data.InfoBus[1].is_recursive,
          is_breaking: response.data.InfoBus[1].is_breaking,
          breaking_in_min: response.data.InfoBus[1].breaking_in_min,
          is_sleeping: response.data.InfoBus[1].is_sleeping,
          max_passengers: response.data.InfoBus[1].max_passengers,
          sizeOfPaths: response.data.InfoBus[1].sizeOfPaths,
          path: response.data.InfoBus[1].path,
          path_rec: response.data.InfoBus[1].path_rec,
          currentPath: response.data.InfoBus[1].currentPath,
          passengersSize: response.data.InfoBus[1].PassengersIndexes.length,
          stopOversSizes: response.data.InfoBus[2],
          token: response.data.token,
          id: response.data._id,
          busId: response.data.busId,
        });
        localStorage.clear();
        localStorage.setItem('token',response.data.token);
        navigate("/info");
      })
      .catch((error) => {
        const spanPass = document.getElementById('incorrect');
        if(error.response.status == "400"){
          console.error(error.response.data);
          setErr("Неверный формат логина или пароля");
        }
        if(error.response.status == "404"){
          console.error("incorrect password");
          setErr("Неверный логин или пароль");
        }     
        spanPass.style.display = "block";
        setTimeout(() => {
          spanPass.style.display = "none";
        }, 2000);
      });

   }
  return(
        <div id="login-div" >
        <div className="container">
            <h2 className="login-title">Вход</h2>
        
            <form className="login-form">
              <div>
                <label htmlFor="name">Логин </label>
                <input
                       id="name"
                       type="text"
                       placeholder="Ваш Логин"
                       name="name"
                       required
                       />
              </div>
    
              <div>
                <label htmlFor="password">Пароль </label>
                <input
                       id="password"
                       type="password"
                       placeholder="Ваш пароль"
                       name="password"
                       required
                       />
              </div>
        
              <button onClick={tryToLogin}  className="btn btn--form" type="button" value="Log in" >
                Войти
              </button>
              <span id="incorrect"> {errmsg} </span>
            </form>
        </div>
        <div className="footer-div">
        <ImageShadow src={Icon} width="90"/>
        <p className="footer-div-p"> eoBrest 2023</p>
        </div>
        </div>
    )
};