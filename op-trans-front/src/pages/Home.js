import React, { useEffect, useState } from 'react';
import TemplateAdmin from "../pages/TemplateAdmin";
import { Link } from 'react-router-dom';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import axios from 'axios';

const HomeApp = () => {
    const URL_BASE = "http://localhost:8084/OperacionDeTransporte";

    const [manifiestos, setManifiestos] = useState([]);

    const getAllManifiestos = async () => {
        try {
            const url = `${URL_BASE}/manifiestos`;
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Response status: ${res.status}`);
            }
            const data = await res.json();
            setManifiestos(data);
        } catch (err) {
            console.warn(`Error en getAllManifiestos: ${err}`);
        }
    };

    const removeManifiesto = async (id) => {
        const res = await axios.delete(`${URL_BASE}/manifiestos/${id}`);
        //if (!res.ok) {
        //    throw new Error(`Response status: ${res.status}`);
        //}
        getAllManifiestos();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registro eliminado exitosamente",
            showConfirmButton: false,
            toast: true,
            timer: 1500
        });
    }

    useEffect(() => {
        getAllManifiestos();
    }, []);



    return (
        <TemplateAdmin>
            <Link className=" btn btn-primary" to="/app/registrar">
                <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
                Registrar Manifiesto
            </Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titular</th>
                        <th scope="col">Valor del Viaje</th>
                        <th scope="col">Vehículo</th>
                        <th scope="col">Conductor</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Remitente</th>
                        <th scope="col">Destinatario</th>
                        <th scope="col"># Remesas</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {manifiestos.map((man, index) => (
                        <tr key={man.id || index}>
                            <th scope="row">{man.id}</th>
                            <td>{`${man.titular.nombre} ${man.titular.apellido}`}</td>
                            <td>{man.valorDelViaje}</td>
                            <td>{`${man.vehiculo.nombre} (${man.vehiculo.marca} ${man.vehiculo.modelo})`}</td>
                            <td>{`${man.conductor.nombre} ${man.conductor.apellido}`}</td>
                            <td>{man.fecha}</td>
                            <td>{man.remitente}</td>
                            <td>{man.destinatario}</td>
                            <td>{man.remesas.length}</td>
                            <td className="text-center">
                                <Link className="btn btn-info" to={`/app/registrar/${man.id}`}>
                                    Editar
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        Swal.fire({
                                            title: "Está seguro?",
                                            text: "No habrá marcha atrás, así que pilas!",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Si, eliminar!"
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                removeManifiesto(man.id)
                                            }
                                        });
                                    }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </TemplateAdmin>
    );
}

export default HomeApp;
