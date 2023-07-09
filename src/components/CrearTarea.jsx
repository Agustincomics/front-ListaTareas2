import React from 'react';
import { consultaCrearTarea } from './helpers/queries';
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const CrearTarea = () => {
    const navegacion = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();

    const onSubmit = (tareaNueva) => {
        console.log(tareaNueva);
        consultaCrearTarea(tareaNueva).then((respuesta)=>{
          if(respuesta.status === 201){
            Swal.fire(
              'Tarea Creada',
              `La Tarea ${tareaNueva.nombreTarea} fue creada`,
              'success'
            );
            navegacion('/');
            reset();
          }else{
            Swal.fire(
              'Se produjo un error',
              `Intente realizar esta operacion mas tarde`,
              'error'
            )
          }
        })
      };

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

export default CrearTarea;