import React from 'react';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { obtenerTareas } from './helpers/queries';
import { consultaBorrarTarea } from './helpers/queries';

const ItemTareas = ({tarea, setTareas}) => {
    const borrarTarea =()=>{
        Swal.fire({
            title: '¿Esta seguro de eliminar la tarea?',
            text: "No se puede revertir este paso",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
            
              consultaBorrarTarea(tarea._id).then( (respuesta) =>{
                if(respuesta.status === 200){
                  Swal.fire(
                    'Tarea eliminado',
                    `La tarea ${tarea.nombreTarea} fue eliminado`,
                    'success'
                  );
                  obtenerTareas().then((respuesta)=> setTareas(respuesta) )

                }else{
                  Swal.fire(
                    'Se produjo un error',
                    `Intente realizar esta operacion mas tarde`,
                    'error'
                  )
                }
              })
            }
          })
    }

    return (
        <tr>
            <td>{tarea._id}</td>
            <td>{tarea.nombreTarea}</td>
            <td>{tarea.DescripcionTarea}</td>
            <td>
                <Button variant="danger" onClick={borrarTarea}>
                Borrar
                </Button>
            </td>
        </tr>
    );
};

export default ItemTareas;