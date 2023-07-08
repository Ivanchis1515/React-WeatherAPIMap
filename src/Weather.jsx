import React, { useEffect, useState } from 'react'
//iconos de react
import { WiStrongWind, WiCloud, WiRaindrop, WiHumidity } from "react-icons/wi";
//fontloader para cambiar de tipografia
import WebFont from 'webfontloader';
//importo una funcion que me permite cambiar el icono segun el tiempo
import iconosmovi from './componentes/iconos.js';
//estilos
import './App.css';
import fondosinfo from './componentes/fondo.js';

const Weather = () => {
  const [city, setcity] = useState(''); //ciudad
  const [pais, setpais] = useState(''); //pais
  const [lat, setlat] = useState(0); //latitud
  const [long, setlong] = useState(0); //longitud
  const [temperatura, settemperatura] = useState(0); //temperatura
  const [estado, setestado] = useState(''); //estado del clima
  const [desc, setdesc] = useState(''); // descripcion del cielo
  const [viento, setviento] = useState(0); //velocidad del viento
  const [humedad, sethumedad] = useState(0); //humedad
  const [iconos, seticonos] = useState('') //icono en mov
  const [min, setmin] = useState(0); //temp min
  const [max, setmax] = useState(0);//temp max
  const [fondo, setfondo] = useState(''); //fondo

  const llave = "67092dbddc839bf4c8a128a21a3c5094"; //llave de la API

  //esta funcion obtiene las coordenadas de la ciudad de puebla correcta
  const ObtenerCiudad = async (nombre = 'Puebla', pais='MX', estado = 'Puebla') =>{
    const urlgeocoding = `https://api.openweathermap.org/geo/1.0/direct?q=Puebla&limit=3&appid=${llave}&country=MX`;
    const respuesta = await fetch(urlgeocoding); //hacemos una peticion a la api y lo guardamos en una constante
    const datos = await respuesta.json() //Una vez que traiga los datos los asignamos como JSON y eso lo asignamos a otra variable
    console.log(datos); //aqui nos mostrará los datos segun los "Puebla" que encuentre 
    let latitud, longitud = 0; //creamos una variable en la que se guarden los datos que necesitamos para encontrar la ciudad
    datos.map(ciudad => {
      //asignamos una variable y por medio de esta entramos a los datos del json
      //si la ciudad/pais/nombre coinciden que guarde sus coordernadas en la variable anterior
      if(ciudad.country == pais && ciudad.state == estado && ciudad.name == nombre){
        latitud = ciudad.lat;
        longitud = ciudad.lon
      }
    });
    console.log(latitud, longitud);
    ObtenerDatos(latitud, longitud); //una vez vemos que coincide la ciudad de puebla se lo pasamos a la otra funcion para que los encuentre
  }

  const ObtenerDatos = async (latitud, longitud) =>{
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${llave}&lang=es&units=metric`;
    await fetch(URL)
    .then(respuesta => {return respuesta.json()})//hacemos una peticion
    .then(datos => {
      console.log(datos) //mostramos los datos del clima

      setcity(datos.name);
      setpais(datos.sys.country);
      setlat(datos.coord.lat);
      setlong(datos.coord.lon);
      settemperatura(datos.main.temp);
      setestado(datos.weather[0].description);
      setdesc(datos.weather[0].description);
      setviento(datos.wind.speed);
      sethumedad(datos.main.humidity);
      setmin(datos.main.temp_min)
      setmax(datos.main.temp_max)

      seticonos(datos.weather[0].description)
      setfondo(datos.weather[0].description)
    })
    .catch(error =>{
      console.log(error) //si ocurre un error en la petición que lo mande a consola
    }) 
  }
  useEffect(() => {
    ObtenerCiudad();
    ObtenerDatos();

    //cargamos las fuentes
    WebFont.load({
      google: {
        families: ['Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif', 'Times New Roman', 'Times', 'serif', 'Chilanka']
      }
    });
  },[])
  
  return (
    <> 
      <div className='fondo' style={{backgroundImage:`url(${fondosinfo(fondo)})`, width:"100%", height:"130vh"}}>

        <div className='titulo'>
          <div className='clima'>
            <h2>Clima con react Vite</h2>
          </div>
        </div>

        <div className='tarjeta bg-light'>

          <div className='informacion'>
            <h1 className='ciudad'>{city}, {pais}</h1>
            <label className='latlong'>Lat: {lat} || Long: {long}</label>
            <p className='temperactual'>{temperatura.toFixed(0)}&deg;</p><img className='termometro' src="../public/iconos/thermometer-celsius.svg" alt="termo"/>
            <img className='iconomovi' src={iconosmovi(iconos)} alt="icono chido UwU"/>
            <p className='estado'>Estado: {estado}</p> <label className='estadoicon'><WiCloud/></label>
            <p className='estado2'>Cielo: {desc}</p><label className='estadoicon2'><WiRaindrop/></label>
            <p className='viento'>Velocidad del viento: {viento} km/h</p> <label className='vientoicon'><WiStrongWind/></label>
            <p className='humedad'>Humedad: {humedad}%</p><label className='humedadicon'><WiHumidity/></label>
            <div className='parteabajo'>
              <label className='temp'>Temperatura para hoy</label>
              <label className='temp-min'>Minima: {min.toFixed(0)}&deg;</label>
              <p className='temp-max'>Máxima: {max.toFixed(0)}&deg;</p>
            </div>
          </div>

        </div>

      </div> 
    </>
  )
}
export default Weather;