import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeProvider';
import Spinner from '../components/Spinner';
import MediaQuery from 'react-responsive';
import BarraDeBusqueda from '../components/BarraDeBusqueda';
import ArticulosRecientes from '../components/ArticulosRecientes';
import Carousel from '../components/carousel'
<<<<<<< HEAD
import Footer from '../components/Footer';
import ArticulosPopulares from '../components/ArticulosPopulares';
=======
import "../styles/Inicio.css";
>>>>>>> v1.0.0


function Inicio() {
  const [isLoading, setIsLoading] = useState(false);
  const { theme, toggleTheme, themeName } = useTheme();

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false); 
    }, 5000);
  }, []);

  return (
  <>
    {isLoading ? (
        <Spinner /> 
      ) : (

    <div className='Inicio' id={theme} >
      <MediaQuery maxDeviceWidth={768}>
        <BarraDeBusqueda />
      </MediaQuery>
<<<<<<< HEAD
=======

      <MediaQuery minDeviceWidth={768}>
        <div className='container-banner_inicio'>
          <div className='banner-text'>
            <h1>Tu enciclopedia virtual IT</h1>
            <h3>Una guía completa y actualizada sobre el mundo. <br /> Explora, aprende  y desarrolla.</h3>
          </div>
          <div className='banner-img'>
            <p>El modo actual es: "{themeName}"</p>
            <button onClick={toggleTheme} >Cambiar modo</button>
          </div>
        </div>
      </MediaQuery>

>>>>>>> v1.0.0
      <Carousel />
      <ArticulosRecientes/>
<<<<<<< HEAD
      <ArticulosPopulares/>
      <Footer />
=======

>>>>>>> v1.0.0
    </div>
    )}
  </>
  );
}

export default Inicio;


