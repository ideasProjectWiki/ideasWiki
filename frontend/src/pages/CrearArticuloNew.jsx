import React, { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { useTitlePost } from '../hooks/useTitlePost';
import { useTitleGET } from '../hooks/useTitleGET';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BiLink, BiBold, BiFont, BiItalic } from 'react-icons/bi';
import axios from 'axios';
import "../styles/crearArticulo.css";
import "../styles/carouselCrearArticulo.css";

const CrearArticuloNew = () => {
  const [width, setWidth] = useState({ right: 0, left: -770 });
  const [articleName, setArticleName] = useState('');
  const [secciones, setSecciones] = useState([]);
  const [isInputEmpty, setIsInputEmpty] = useState(false); // Estado para controlar si el primer input está vacío

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;

      if (innerWidth <= 600) {
        setWidth({ right: 10, left: -500 });
      } else if (innerWidth <= 768) {
        setWidth({ right: 250, left: -250 });
      } else if (innerWidth <= 992) {
        setWidth({ right: 100, left: -100 });
      } else if (innerWidth <= 1200) {
        setWidth({ right: 0, left: -288 });
      } else {
        setWidth({ right: 0, left: -100 });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data: category } = useApi('https://serviceone.onrender.com/api-wikideas/categories');
  const [idCategory, setIdCategory] = useState(null);

  const handleIdCategory = (categoryId) => {
    setIdCategory(categoryId);
  };

  const { data: listadoTitulos } = useTitleGET("https://serviceone.onrender.com/api-wikideas/section-titles");

  const handleAddSection = () => {
    setSecciones([...secciones, { idTitle: null, content: '' }]);
  };

  const handleSelectSection = (e, index) => {
    const selectedIndex = e.target.selectedIndex;
    const nextIndex = selectedIndex;
    if (nextIndex < listadoTitulos.length) {
      const nextId = listadoTitulos[nextIndex]._id;
      const updatedSecciones = [...secciones];
      updatedSecciones[index].idTitle = nextId;
      setSecciones(updatedSecciones);
    } else {
      const updatedSecciones = [...secciones];
      updatedSecciones[index].idTitle = null;
      setSecciones(updatedSecciones);
    }
    const selectTitle = e.target.value;
    const updatedSecciones = [...secciones];
    updatedSecciones[index].title = selectTitle;
    setSecciones(updatedSecciones);
  };

  const handleContentChange = (e, index) => {
    const content = e.target.value;
    const updatedSecciones = [...secciones];
    updatedSecciones[index].content = content;
    setSecciones(updatedSecciones);
  };

  const handleArticleName = (e) => {
    setArticleName(e.target.value);
    setIsInputEmpty(false);
  };

  const { postRequest } = useTitlePost();

  const handleSaveSection = async () => {
    if (secciones.length > 0) {
      const sectionRequests = secciones.map((seccion) => {
        return postRequest(
          'https://serviceone.onrender.com/api-wikideas/sections/',
          {
            sectionTitleId: seccion.idTitle,
            sectionDetail: seccion.content,
          }
        );
      });

      try {
        const responses = await Promise.all(sectionRequests);
        responses.forEach((response, index) => {});
        const lastIds = responses.map((response) => response.idCreatedSection);
        const publicationData = {
          topic: articleName,
          categoryId: idCategory,
          detail: lastIds,
        };

        try {
          const publicationResponse = await axios.post(
            "https://serviceone.onrender.com/api-wikideas/publications", publicationData,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
        } catch (error) {}
      } catch (error) {}
    } else {
      console.log("No se pueden guardar las secciones sin título y contenido");
    }
  };

  const handlePublishClick = () => {
    if (articleName.trim() === '') {
      setIsInputEmpty(true);
      return;
    }

    handleSaveSection();
  };

  return (
    <div className="container CrearArticulo">
      <div className="container CrearArticulo">
        <div className="imgCont">
          <div className="buttonsContainer">
            <i className="bi bi-x-lg"></i>
            <button className="botonSubirImagen">Subir imagen</button>
          </div>
          <input
            type="text"
            placeholder="Nombre del artículo"
            className={`imgText ${isInputEmpty ? 'inputError shadow' : ''}`}
            value={articleName}
            onChange={handleArticleName}
          />
        </div>

        {/* Carousel */}
        <div className="contenedor-carousel container">
          <h5 className='seleccioneCat fw-bold'>Seleccione una categoría:</h5>
          <motion.div className="slider_container">
            <motion.div className="slider" drag="x" dragConstraints={width}>
              {category.map((categoria) => {
                return (
                  <motion.div className="itemCarousel shadow">
                    <li
                      className="carouselLi text-center "
                      onClick={() => handleIdCategory(categoria._id)}
                      key={categoria._id}
                    >
                      {categoria.nameCategory}
                    </li>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
          {/* <p>Id de la categoría {idCategory}</p> */}
          <div className="contenedor-NoCarousel">
            {category.map((categorias) => {
              return (
                <div className="item" key={categorias._id}>
                  <Link
                    to={`/categorias/${categorias.nameCategory}/${categorias._id}`}
                  >
                    {categorias.nameCategory}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {secciones.map((seccion, index) => (
          <div className="selected " key={index}>
            <select
              className="section shadow"
              onChange={(e) => handleSelectSection(e, index)}
            >
              {listadoTitulos.map((listado) => (
                <option key={listado._id} value={listado.sectionTitle}>
                  {listado.sectionTitle}
                </option>
              ))}
            </select>

            <textarea
              className={`textArea shadow ${seccion.content.trim() === '' ? 'inputError' : ''}`}
              value={seccion.content}
              onChange={(e) => handleContentChange(e, index)}
            ></textarea>
            
          </div>
        ))}

        <div className="agregarSeccion" >
          <i className="bi bi-plus-circle agregarIcon" onClick={handleAddSection}></i>
          <p>Agregar sección</p>
        </div>
        <div className='butonsContainer'>
          <button
            className='botonCancelar shadow-lg'
          >
            Cancelar
          </button>
        {secciones.length > 0 && (
        
          <button
            className="botonPublicar shadow-lg ms-4"
            onClick={handlePublishClick}
          >
            Publicar
          </button>
        )}
          </div>
      </div>
    </div>
  );
};

export default CrearArticuloNew;






            
          
