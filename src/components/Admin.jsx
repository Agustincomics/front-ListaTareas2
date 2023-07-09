import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {Link} from 'react-router-dom'
import { Table } from 'react-bootstrap';
import { obtenerTareas } from './helpers/queries';
import ItemTareas from './ItemTareas';

const Admin = () => {
    const [tareas, setTareas] = useState([]);

    useEffect(()=>{
            obtenerTareas().then((respuesta)=>{
            console.log(respuesta)
            setTareas(respuesta);
            console.log(tareas)
        })
    },[])
    return (
    <section className='with-background'>
        <section className="container mainSection " >
            <div className="d-flex justify-content-between align-items-center mt-5">
            <h1 className="display-4">Lista de Tareas</h1>
            <Link className="btn btn-primary" to="/crear">
                Agregar
            </Link>
            </div>
            <hr />
            <Table responsive striped bordered hover>
            <thead>
                <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                </tr>
            </thead>
            <tbody>
                {
                    tareas.map((tarea)=> <ItemTareas key={tarea._id} tarea={tarea} setTareas={setTareas}></ItemTareas>)
                }
            </tbody>
            </Table>
      </section>
    </section>
    );
};

export default Admin;