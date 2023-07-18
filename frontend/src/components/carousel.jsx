
import React, { useState, useEffect, useRef} from "react";

import React, { useState, useEffect } from "react";
0
import "../styles/carousel.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useApiCategory } from "../hooks/useApiCategory";
import LoaderDisenio from "./Loader/LoaderDisenio";
import Loader from "./Loader/Loader";


const Carousel = () => {
 

 
  const { loading, data: category } = useApiCategory(`https://serviceone.onrender.com/api-wikideas/categories`)


  /* funcion para manejo de arrastre */
  const sliderRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false);
  console.log('isDragging', isDragging)

  const handleDragStart = () => {
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleCategoryClick = (event) => {
    if (isDragging) {
      event.stopPropagation()
    }
  };

  const handleSliderClick = () => {
    sliderRef.current.style.pointerEvent = "none";
    setTimeout(() => {
      sliderRef.current.style.pointerEvent = "auto";
    }, 500)
  }

import { backendImage, datascienceImage, developerImage, diseñouxuiImage, frontendImage, programasIAImage, QAtestingmanualImage } from "../styles/assets/categoriesImg";

const Carousel = () => {
  const { loading, data: categories } = useApiCategory("https://serviceone.onrender.com/api-wikideas/categories");


  //Medidas para el carousel
  const [width, setWidth] = useState({ right: 0, left: -770 });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;

      if (innerWidth < 500) {
        setWidth({ right: 0, left: -770 });
      } else if (innerWidth < 600) {
        setWidth({ right: 0, left: -599 });
      } else if (innerWidth < 700) {
        setWidth({ right: 0, left: -599 });
      } else if (innerWidth < 800) {
        setWidth({ right: 0, left: -387 });
      } else if (innerWidth < 900) {
        setWidth({ right: 0, left: -288 });
      } else if (innerWidth < 1000) {
        setWidth({ right: 0, left: -185 });
      } else if (innerWidth < 1100) {
        setWidth({ right: 0, left: -128 });
      } else {
        setWidth({ right: 0, left: -100 });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("DOMContentLoaded", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("DOMContentLoaded", handleResize);
    };
  }, [setWidth]);

  // Objeto que mapea nombres de categoría con las imágenes correspondientes
  const categoryImages = {
    1: backendImage,
    2: datascienceImage,
    3: developerImage,
    4: diseñouxuiImage,
    5: frontendImage,
    6: programasIAImage,
    7: QAtestingmanualImage,
  };

  return (
    <div className="contenedor-carousel">
      <div className="title-cat">Categorias</div>

      {loading ? (
        <Loader cargando={LoaderDisenio} />
      ) : (

        <motion.div className="slider_container" >{/*  ref={slider_container} */}
        {/*div que contendra las propiedades y funcionalida
        des de motion*/}
        <motion.div
          className="slider"
          drag="x"
          dragConstraints={width} 
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={handleSliderClick}
          ref={sliderRef}
        >
          {/* contenedor div para las category */}
          {category.map((categorias) => {
            return (
              <motion.div className="cont-item">
                <Link 
                 to= {`/articulos/${categorias._id}`} 
                 className="p" 
                 key={category._id}
                 onClick={() => {
                  handleCategoryClick()
                 }}>
                 {categorias.nameCategory}
                 </Link>

        <motion.div className="slider_container">
          {/* Contenedor div para las categorías */}
          <motion.div className="slider" drag="x" dragConstraints={width}>
            {categories.map((categoria, index) => (
              <motion.div className="cont-item" key={index}>
                <img
                  src={categoryImages[categoria.categoryId]}
                  alt={categoria.nameCategory}
                />
                <p>{categoria.nameCategory}</p>

              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

      <div className="contenedor-NoCarousel">

      {category.map((categorias) => {
          return (
            <div className="item"
              key={categorias.categoryId}>
              <Link to={`/categorias/${categorias.nameCategory}/${categorias.categoryId}`}>              
              {categorias.nameCategory}
              </Link>
            </div>
          );
        })}

        {categories.map((categoria, index) => (
          <div className="item" key={index}>
            <img
              src={categoryImages[categoria.categoryId]}
              alt={categoria.nameCategory}
            />
            <Link to={`/categorias/${categoria.nameCategory}/${categoria._id}`} key={categoria._id}>
              {categoria.nameCategory}
            </Link>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Carousel;