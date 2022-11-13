import React, { createContext, useState, useEffect } from "react";
import images from "../images/imagenes"
//importamos imágenes y funciones que necesitamos

import {
    useTransition,
    config,
    animated,
} from 'react-spring'

//Creamos una variable vacía
let interval;
//Creamos el contexto
export const Context = createContext({});
//El provider herencia una propiedad prop (que adentro tiene los hijos del componente (Navigation y Focus))
export const Provider = props => {
    //Creamos el estado
    const [timer, setTimer] = useState(false);
    const [count, setCount] = useState(0);
    const [toggle, setToggle] = useState(true);
    const [selectedElement, setSelectedElement] = useState(images[0]);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState([]);

    //Destructuramos los hijos para llamarlos al final como hijos del Provider (podríamos llamar props.children también)
    const {
        children
    } = props;

    //Creamos funciones para el funcionamiento de la página
    //Los useEffect se ejecutan una vez al principio de la página y cuando la variable que está al final cambia de valor.
    useEffect(() => {
        //Si timer no es "stop" no paramos                                          
        if (timer !== "stop") {
            interval = setInterval(() => setCount(prevCount => {
                if (prevCount < images.length - 1) return prevCount + 1
                else return 0;
            }), 7000);                                                  //Le damos valor a la variable "interval" para que guarde la información 
            return () => clearInterval(interval);                       //de un intervalo de tiempo, cada vez que el intervalo de tiempo
        } else {                                                        //se cumple la variable "count" sube en 1 o vuelve a 0 si llega al final.
            clearInterval(interval)                                 //Despues de que se cumpla el tiempo volvemos a repetir después de 7000 milisegundos
        }  //si la variable es "stop", detenemos el intervalo       
    }, [timer]);                                                          


    //Cambiamos la imagen seleccionada cuando "count" cambia de valor
    useEffect(() => {
        if (setSelectedElement && images[count]) setSelectedElement(images[count])
    }, [count, setSelectedElement])

    useEffect(() => {
        const items = [];
        for (let i = page; i < page + 15; i++) {
            items.push(images[i]);
        }
        setPages(items)
    }, [page])

    //Al tocar en la galería el "count" deja de cambiar y contamos como seleccionado lo que el usuario haya tocado
    const onClickLabel = (e, key) => {
        setTimer("stop");
        setCount(key);
    };

    //Funcionabilidad del botón izquierdo de imagen previa, paramos el timer para que "count" no cambie
    const prev = () => {
        if (images) {
            setTimer(prev => !prev)
            if (count - 1 !== -1) setCount(prevCount => prevCount - 1)
            else setCount(images.length - 1)
            clearInterval(interval)
        }
    }

    //Lo mismo que el boton de imagen previa pero para la siguiente
    const next = () => {
        setTimer(!timer)
        if (count + 1 <= images.length - 1) setCount(prevCount => prevCount + 1)
        else setCount(0)
        clearInterval(interval)
    }

    const navPrev = () => {
        if (page > 0) setPage(prev => prev-1)
    }

    const navNext = () => {
        if (page < images.length-15) setPage(prev => prev + 1)
    }

    const transition = useTransition(selectedElement, {
        from: { position: 'absolute', opacity: 0, zIndex: 0},
        enter: { opacity: 1, zIndex: 0 },
        leave: { opacity: 0, zIndex: 0 },
        delay: 200,
        config: config.gentle,
    })

    const fragment = transition((style, item) => {
        // Renderizamos cada imagen
        return <animated.div style={style}><img className='imagen' alt="" src={item}></img></animated.div>
    });

    //Llamamos todo lo que queremos exportar a los hijos del provider
    const imagesContext = {
        images,
        selectedElement,
        setSelectedElement,
        onClickLabel,
        prev,
        next,
        toggle,
        setToggle,
        pages,
        navPrev,
        navNext,
        fragment
    };
    return <Context.Provider value={imagesContext}>{children}</Context.Provider>;
    //Metemos a los children (Navigation y Focus) dentro del Provider de información
};

//Exportamos el contexto para poder envolver con el provider a Navigation y Focus en App.js 
//y para poder llamar el contexto y nos traiga la información donde la necesitemos
export const { Consumer } = Context;