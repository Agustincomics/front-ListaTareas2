import React from 'react';
import { useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {useParams, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const EditarTarea = () => {
    const {id}= useParams();
    const navegacion = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
      } = useForm();
      
      useEffect(()=>{
        obtenerTarea(id).then( (respuesta)=>{
            console.log(respuesta);
            setValue('nombreTarea', respuesta.nombreTarea)
            setValue('DescripcionTarea', respuesta.DescripcionTarea)
        })  
        console.log(id)
      }, [])

      const onSubmit = (tareaEditada) =>{
        console.log(tareaEditada);
        consultaeditarTarea(tareaEditada, id).then((respuesta)=>{
            if (respuesta) {
                if (respuesta.status === 200) {
                    Swal.fire('tarea actualizada', `La Tarea: ${tareaEditada.nombreTarea} fue editado correctamente`, 'success');
                    navegacion('/admin');
                }else{
                    Swal.fire('Se produjo un error', `La Tarea: ${tareaEditada.nombreTarea} no fue editado, intentelo mas tarde`, 'error');
                }
            }else{
                Swal.fire('Se produjo un error', `La Tarea: ${tareaEditada.nombreTarea} no fue editado, intentelo mas tarde`, 'error');
            }
            
        })
      }

    return (
        <section className="container mainSection">
            <h1 className="display-4 mt-5">Nueva Tarea</h1>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formNombreReceta">
                <Form.Label>Tarea*</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ej: Cafe"
                    {...register("nombreTarea", {
                    required: "El nombre de la tarea es obligatoria",
                    minLength: {
                        value: 2,
                        message: "La cantidad minima de caracteres es de 2 digitos",
                    },
                    maxLength: {
                        value: 100,
                        message: "La cantidad minima de caracteres es de 100 caracteres",
                    },
                    })}
                />
                <Form.Text className="text-danger">
                    {errors.nombreTarea?.message}
                </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formInstruccionesReceta">
                <Form.Label>Descripcion*</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ej: Cafe"
                    {...register("DescripcionTarea", {
                    required: "La Descripcion de la tarea es obligatorio",
                    minLength: {
                        value: 2,
                        message: "La cantidad minima de caracteres es de 2 digitos",
                    },
                    maxLength: {
                        value: 100000,
                        message: "La cantidad maxima es de 100.000 caracteres",
                    },
                    })}
                />
                <Form.Text className="text-danger">
                    {errors.DescripcionTarea?.message}
                </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                Guardar
                </Button>
            </Form>
        </section>
    );
};

export default EditarTarea;