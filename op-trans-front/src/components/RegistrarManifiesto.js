import React, { useCallback } from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TemplateAdmin from "../pages/TemplateAdmin";
import { UnidadDeMedidaEnumNew } from "../resources/resources";
import { Input, Select, Textarea } from './forms/Input';
import { useForm } from '../hooks/useFormObj';

const URL_BASE = "http://localhost:8084/OperacionDeTransporte";

// value= valor a validar
// expresionesRegulares= [array de expresiones regulares]
// messages= [array de mensajes que quiere imprimir]. Para tener en cuenta que debe coincidir la posición con el array de expresiones
const validateErr = (value, expresionesRegulares, messages) => {
    let res = '';

    expresionesRegulares.forEach((ex, index) => {
        if (!ex.test(value)) {
            res = messages[index];
        }
    });

    if (!value) {
        res = "Campo requerido";
    }

    return res;
};




const RegistrarManifiesto = () => {
    const { idManifiesto } = useParams();
    const navigate = useNavigate();

    const initialFormManifiesto = {
        idTitular: "",
        valorDelViaje: "",
        idVehiculo: "",
        idConductor: "",
        remitente: "",
        destinatario: "",
        remesas: [],
    };

    const initialFormRemesa = {
        tipoDeMercancia: "",
        caracteristicas: "",
        peso: "",
        unidadDeMedida: "",
        volumen: "",
        empaque: "",
    };

    const validateFormManifiesto = (form) => {
        let errors = {};

        // Expresiones regulares
        let lengthNombre = /^.{7,150}$/;
        let valorViajeRegex = /^(50|[1-9]\d{1,7}|1000000000)$/;

        // Validaciones para cada campo
        errors.idTitular = validateErr(
            form.idTitular,
            [],
            ["Debe tener una longitud entre 7 y 150 caracteres"]
        );

        errors.valorDelViaje = validateErr(
            form.valorDelViaje,
            [valorViajeRegex],
            ["Debe ser valores mayores a $50"]
        );

        errors.idVehiculo = validateErr(
            form.idVehiculo,
            [],
            ["Debe tener una longitud entre 7 y 150 caracteres"]
        );

        errors.idConductor = validateErr(
            form.idConductor,
            [],
            ["Debe tener una longitud entre 7 y 150 caracteres"]
        );

        errors.remitente = validateErr(
            form.remitente,
            [lengthNombre],
            ["Debe tener una longitud entre 7 y 150 caracteres"]
        );

        errors.destinatario = validateErr(
            form.destinatario,
            [lengthNombre],
            ["Debe tener una longitud entre 7 y 150 caracteres"]
        );

        return errors;
    };

    const validateFormRemesa = (remesa) => {
        let errors = {};

        // Expresiones regulares
        let lengthMercancia = /^.{1,150}$/;
        let lengthCaracteristicas = /^.{1,150}$/;
        let lengthPeso = /^.{1,10}$/;
        let lengthVolumen = /^.{1,10}$/;
        let lengthEmpaque = /^.{1,50}$/;

        // Validaciones para cada campo de la remesa
        errors.tipoDeMercancia = validateErr(
            remesa.tipoDeMercancia,
            [lengthMercancia],
            ["Debe tener una longitud entre 1 y 150 caracteres"]
        );

        errors.caracteristicas = validateErr(
            remesa.caracteristicas,
            [lengthCaracteristicas],
            ["Debe tener una longitud entre 1 y 150 caracteres"]
        );

        errors.peso = validateErr(remesa.peso, [lengthPeso], [
            "Debe tener una longitud entre 1 y 10 caracteres",
        ]);

        errors.unidadDeMedida = validateErr(remesa.unidadDeMedida, [], [
            "Campo requerido",
        ]);

        errors.volumen = validateErr(remesa.volumen, [lengthVolumen], [
            "Debe tener una longitud entre 1 y 10 caracteres",
        ]);

        errors.empaque = validateErr(remesa.empaque, [lengthEmpaque], [
            "Debe tener una longitud entre 1 y 50 caracteres",
        ]);

        return errors;
    };

    const {
        form: manifiestoForm,
        setForm: setManifiestoForm,
        errors: manifiestoErrors,
        setErrors: setManifiestoErrors,
        handleChange: handleManifiestoChange,
        handleBlur: handleManifiestoBlur,
        handleSubmit: handleManifiestoSubmit,
        isSubmitting: isManifiestoSubmitting
    } = useForm(initialFormManifiesto, validateFormManifiesto);

    const {
        form: remesaForm,
        setForm: setRemesaForm,
        errors: remesaErrors,
        setErrors: setRemesaErrors,
        handleChange: handleRemesaChange,
        handleBlur: handleRemesaBlur,
        handleSubmit: handleRemesaSubmit,
        isSubmitting: isRemesaSubmitting
    } = useForm(initialFormRemesa, validateFormRemesa);

    // Additional state
    const [titulares, setTitulares] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [conductores, setConductores] = useState([]);
    const [isAddRemesa, setIsAddRemesa] = useState(true);
    const [isUpdateRemesa, setIsUpdateRemesa] = useState(false);
    const [viewFormRemesa, setViewFormRemesa] = useState(true);

    const botonAgregarRemesa = () => {
        setRemesaForm(initialFormRemesa);
        setRemesaErrors({});
        setViewFormRemesa(true);
        setIsAddRemesa(true)
    }

    const submitRemesa = () => {
        setManifiestoForm({
            ...manifiestoForm,
            remesas: [
                ...manifiestoForm.remesas,
                { ...remesaForm, num: manifiestoForm.remesas.length + 1 },
            ],
        });
        setRemesaForm(initialFormRemesa);
        setViewFormRemesa(false);
        setIsAddRemesa(false);
    };

    const preEditRemesa = async (remesa) => {
        setViewFormRemesa(true);
        setRemesaForm(remesa);
        setIsUpdateRemesa(true);
        setIsAddRemesa(false);
    };

    const editRemesa = () => {
        const updatedRemesas = manifiestoForm.remesas.map((rem) =>
            rem.num === remesaForm.num ? { ...rem, ...remesaForm } : rem
        );

        setManifiestoForm({
            ...manifiestoForm,
            remesas: updatedRemesas,
        });

        setRemesaForm(initialFormRemesa);
        setViewFormRemesa(false);
        setIsUpdateRemesa(false);
    };


    const removeRemesa = (num) => {
        console.log(`removeRemesa.num: ${num}`)
        setManifiestoForm({
            ...manifiestoForm,
            remesas: manifiestoForm.remesas.filter(rem => rem.num !== num),
        });
    };

    const submitManifiesto = async () => {
        try {
            if (
                Object.values(manifiestoErrors).some((error) => error !== "") ||
                JSON.stringify(manifiestoForm) === JSON.stringify(initialFormManifiesto) ||
                manifiestoForm.remesas.length === 0
            ) {
                return;
            }

            if (idManifiesto) {
                await axios.put(
                    `${URL_BASE}/manifiestos/${idManifiesto}`,
                    manifiestoForm
                );
            } else {
                await axios.post(`${URL_BASE}/manifiestos`, manifiestoForm);
            }

            setManifiestoForm(initialFormManifiesto);

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: idManifiesto ? "Actualización exitosa" : "Registro exitoso",
                showConfirmButton: false,
                toast: true,
                timer: 1500,
            });
            navigate("/");
        } catch (error) {
            console.error("Error al enviar el manifiesto:", error);

            if (error.response && error.response.data && error.response.data.errors) {
                const serverErrors = error.response.data.errors;

                // Actualiza el objeto de errores según la respuesta del servidor
                setManifiestoErrors((prevErrors) => ({
                    ...prevErrors,
                    ...serverErrors,
                }));
            } else {
                // Manejo de errores genéricos
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Ocurrió un error al enviar el formulario",
                    showConfirmButton: true
                });
            }
        }
    };

    const fetchData = useCallback(async () => {
        try {
            const [{ data: titulares }, { data: vehiculos }, { data: conductores }] =
                await Promise.all([
                    axios.get(`${URL_BASE}/titulares`),
                    axios.get(`${URL_BASE}/vehiculos`),
                    axios.get(`${URL_BASE}/conductores`),
                ]);

            setTitulares(titulares);
            setVehiculos(vehiculos);
            setConductores(conductores);
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    }, []);

    const fetchManifiesto = useCallback(async () => {
        if (idManifiesto) {
            try {
                const { data } = await axios.get(
                    `${URL_BASE}/manifiestos/${idManifiesto}`
                );
                const initialFormManifiesto = await {
                    idTitular: data.titular.id,
                    valorDelViaje: data.valorDelViaje,
                    idVehiculo: data.vehiculo.id,
                    idConductor: data.conductor.id,
                    remitente: data.remitente,
                    destinatario: data.destinatario,
                    remesas: data.remesas.map((remesa, item) => ({
                        num: item + 1,
                        id: remesa.id,
                        tipoDeMercancia: remesa.tipoDeMercancia,
                        caracteristicas: remesa.caracteristicas,
                        peso: remesa.peso,
                        unidadDeMedida: remesa.unidadDeMedida,
                        volumen: remesa.volumen,
                        empaque: remesa.empaque
                    }))
                };
                setManifiestoForm(initialFormManifiesto);
            } catch (error) {
                console.error("Error al obtener el manifiesto:", error);
            }
        }
    }, []);

    useEffect(() => {
        fetchData();
        if (idManifiesto) {
            fetchManifiesto();
            setViewFormRemesa(false);
        }
    }, [idManifiesto, fetchManifiesto]);


    return (
        <TemplateAdmin>
            <h2>{idManifiesto ? "Actualizar Remisión" : "Registrar Remisión"}</h2>
            <form >
                <div className="row">

                    <Select
                        items={titulares}
                        classNameDiv="col-md-4"
                        label="Titular"
                        classNameLabel=""
                        value={String(manifiestoForm.idTitular)}
                        name="idTitular"
                        classNameSelect="form-control"
                        required={true}
                        onChange={handleManifiestoChange}
                        onBlur={handleManifiestoBlur}
                        err={manifiestoErrors.idTitular}
                        itemKey="id"
                        itemLabel={item => `${item.nombre} ${item.apellido}`}
                    />

                    <Input
                        classNameDiv="col-md-4"
                        label="Valor del viaje"
                        type="number"
                        required={true}
                        onBlur={handleManifiestoBlur}
                        name="valorDelViaje"
                        value={manifiestoForm.valorDelViaje}
                        onChange={handleManifiestoChange}
                        classNameInput="form-control"
                        err={manifiestoErrors.valorDelViaje}
                    />
                    <Select
                        items={vehiculos}
                        classNameDiv="col-md-4"
                        label="Vehiculo"
                        classNameLabel=""
                        value={manifiestoForm.idVehiculo + ""}
                        name="idVehiculo"
                        classNameSelect="form-control"
                        required={true}
                        onBlur={handleManifiestoBlur}
                        onChange={handleManifiestoChange}
                        err={manifiestoErrors.idVehiculo}
                        itemKey="id"
                        itemLabel={item => `${item.nombre} ${item.marca}`}
                    />
                    <Select
                        items={conductores}
                        classNameDiv="col-md-4"
                        label="Conductor"
                        classNameLabel=""
                        value={manifiestoForm.idConductor + ""}
                        name="idConductor"
                        classNameSelect="form-control"
                        required={true}
                        onChange={handleManifiestoChange}
                        onBlur={handleManifiestoBlur}
                        err={manifiestoErrors.idConductor}
                        itemKey="id"
                        itemLabel={item => `${item.nombre} ${item.apellido}`}
                    />
                    <Input
                        classNameDiv="col-md-4"
                        label="Remitente"
                        type="text"
                        required={true}
                        onBlur={handleManifiestoBlur}
                        name="remitente"
                        value={manifiestoForm.remitente}
                        onChange={handleManifiestoChange}
                        classNameInput="form-control"
                        err={manifiestoErrors.remitente}
                    />
                    <Input
                        classNameDiv="col-md-4"
                        label="Destinatario"
                        type="text"
                        required={true}
                        onBlur={handleManifiestoBlur}
                        name="destinatario"
                        value={manifiestoForm.destinatario}
                        onChange={handleManifiestoChange}
                        classNameInput="form-control"
                        err={manifiestoErrors.destinatario}
                    />
                </div>
            </form>
            <hr />

            {
                viewFormRemesa ? (
                    <form onSubmit={(e) => handleRemesaSubmit(e, !idManifiesto ? submitRemesa : editRemesa)}>
                        <h2>{isAddRemesa ? "Agregar Remesa" : isUpdateRemesa ? "Actualizar Remesa" : ""}</h2>
                        <div className="row">
                            <Input
                                classNameDiv="col-md-4"
                                label="Tipo de Mercancía"
                                type="text"
                                required={true}
                                onBlur={handleRemesaBlur}
                                name="tipoDeMercancia"
                                value={remesaForm.tipoDeMercancia}
                                onChange={handleRemesaChange}
                                classNameInput="form-control"
                                err={remesaErrors.tipoDeMercancia}
                            />
                            <Textarea
                                classNameDiv="col-md-4"
                                label="Características"
                                required={true}
                                name="caracteristicas"
                                value={remesaForm.caracteristicas}
                                onBlur={handleRemesaBlur}
                                onChange={handleRemesaChange}
                                classNameInput="form-control"
                                err={remesaErrors.caracteristicas}
                            />
                            <Input
                                classNameDiv="col-md-4"
                                label="Peso"
                                type="number"
                                required={true}
                                name="peso"
                                value={remesaForm.peso}
                                onBlur={handleRemesaBlur}
                                onChange={handleRemesaChange}
                                classNameInput="form-control"
                                err={remesaErrors.peso}
                            />
                            <Select
                                items={UnidadDeMedidaEnumNew}
                                classNameDiv="col-md-4"
                                label="Unidad de Medida"
                                classNameLabel=""
                                value={remesaForm.unidadDeMedida + ""}
                                name="unidadDeMedida"
                                classNameSelect="form-control"
                                required={true}
                                onBlur={handleRemesaBlur}
                                onChange={handleRemesaChange}
                                err={remesaErrors.unidadDeMedida}
                            />
                            <Input
                                classNameDiv="col-md-4"
                                label="Volumen"
                                type="text"
                                required={true}
                                name="volumen"
                                onBlur={handleRemesaBlur}
                                value={remesaForm.volumen}
                                err={remesaErrors.volumen}
                                onChange={handleRemesaChange}
                                classNameInput="form-control"
                            />
                            <Input
                                classNameDiv="col-md-4"
                                label="Empaque"
                                type="text"
                                required={true}
                                onBlur={handleRemesaBlur}
                                name="empaque"
                                value={remesaForm.empaque}
                                err={remesaErrors.empaque}
                                onChange={handleRemesaChange}
                                classNameInput="form-control"
                            />
                            <div className="col-12 d-flex justify-content-end">
                                <button className="btn btn-secondary" onClick={() => { setRemesaForm(initialFormRemesa); setRemesaErrors({}); setViewFormRemesa(false); setIsAddRemesa(false); setIsUpdateRemesa(false) }}>
                                    Cancelar
                                </button>
                                <button className="btn btn-primary" disabled={isRemesaSubmitting}>
                                    {isRemesaSubmitting ? "Enviando..." : isUpdateRemesa ? "Actualizar remesa" : "Agregar remesa"}
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <button className="btn btn-info col-2" onClick={botonAgregarRemesa}>
                        <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: '5px' }} />
                        Agregar Remesa
                    </button>
                )
            }
            <hr />
            <br />
            <h4>Remesas Agregadas</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tipo de Mercancía</th>
                        <th scope="col">Características</th>
                        <th scope="col">Peso</th>
                        <th scope="col">Unidad de Medida</th>
                        <th scope="col">Volumen</th>
                        <th scope="col">Empaque</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {manifiestoForm.remesas.map((remesa, index) => (
                        <tr key={index}>
                            <th scope="row">{remesa.num}</th>
                            <td>{remesa.tipoDeMercancia}</td>
                            <td>{remesa.caracteristicas}</td>
                            <td>{remesa.peso}</td>
                            <td>{remesa.unidadDeMedida}</td>
                            <td>{remesa.volumen}</td>
                            <td>{remesa.empaque}</td>
                            <td className="text-center">
                                <button className="btn btn-info" onClick={() => { preEditRemesa(remesa) }}>
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => { removeRemesa(remesa.num) }}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="row text-center">
                <div className="col-12 pt-3">
                    <button className="btn btn-primary" disabled={isManifiestoSubmitting} type='button' onClick={(e) => handleManifiestoSubmit(e, submitManifiesto)}>
                        {isManifiestoSubmitting ? "Enviando..." : idManifiesto ? "Actualizar Remisión" : "Registrar Remisión"}
                    </button>

                </div>
            </div>
        </TemplateAdmin>
    )
}

export default RegistrarManifiesto
