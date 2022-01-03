import React from "react";
import ReactDOM from 'react-dom';
import {Modal} from "bootstrap/dist/js/bootstrap";

var myModal; // variable del modal principal

// modelchange
// nos permite inicializar el modal y pasarle como parametro el children del mode-body
export function showmodalinit(titl,labelbotton,bod,accion){
    myModal = new Modal(document.getElementById('staticBackdrop'), {
        keyboard: false
    });
    // Inivializar cambiar el title
    const title = document.getElementById('modaltitle');
    title.innerHTML = titl;
    // Inivizualizar cambiar boton
    // const bottonchange = document.getElementById('subminchan');
    // bottonchange.innerHTML = labelbotton;
    // bottonchange.onclick = () => {
    //     accion();
    //     myModal.hide();
    // };
    // Inivializar cambiar el body
    const body = document.getElementById('modalbody');
    ReactDOM.render(
        bod
    ,body);
    myModal.show()
}
// este metodo cierra el modal, el cual se le pasa un metodo, tanto para liempieza o actualizacion de los datos
export function hidenmodel(onupdate){
    onupdate();
    myModal.hide();
}