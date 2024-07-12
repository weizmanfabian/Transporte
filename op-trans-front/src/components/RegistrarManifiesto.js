import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TemplateAdmin from "../pages/TemplateAdmin";
import { UnidadDeMedidaEnum } from "../resources/resources";
import { Input, Select, Textarea } from './forms/Input';

// value= valor a validar
// expresionesRegulares= [array de expresiones regulares]
// messages= [array de mensajes que quiere imprimir]. Para tener en cuenta que debe coincidir la posición con el array de expresiones
const validateErr = (
    value,
    expresionesRegulares,
    messages
) => {
    let res = '';
    expresionesRegulares.map(
        (ex, index) => {
            res = !ex.test(value) ? messages[index] : res
        }
    )

    if (!value) {
        res = "Campo requerido"
    }
    return res
}

const RegistrarRemision = () => {
    const URL_BASE = "http://localhost:8084/OperacionDeTransporte";

    const { idManifiesto } = useParams();
    const navigate = useNavigate();


    const initialForm = {
        idTitular: '',
        valorDelViaje: '',
        idVehiculo: '',
        idConductor: '',
        remitente: '',
        destinatario: '',
        remesas: [
        ]
    };

    const initialRemesa = {
        tipoDeMercancia: '',
        caracteristicas: '',
        peso: '',
        unidadDeMedida: '',
        volumen: '',
        empaque: ''
    };

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [errorsRemesa, setErrorsRemesa] = useState({});
    const [titulares, setTitulares] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [conductores, setConductores] = useState([]);
    const [remesa, setRemesa] = useState(initialRemesa);
    const [isAddRemesa, setIsAddRemesa] = useState(true);
    const [isUpdateRemesa, setIsUpdateRemesa] = useState(false);
    const [isAddManifiesto, setIsAddManifiesto] = useState(true);
    const [isUpdateManifiesto, setIsUpdateManifiesto] = useState(false);
    const [viewFormRemesa, setViewFormRemesa] = useState(true);

    const handleChange = (e, callback) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
        if (callback) {
            callback();
        }
    };

    const handleRemesaChange = (e) => {
        const { name, value } = e.target;
        setRemesa({
            ...remesa,
            [name]: value,
        });
    };

    const validateForm = (form) => {
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

        errors.peso = validateErr(
            remesa.peso,
            [lengthPeso],
            ["Debe tener una longitud entre 1 y 10 caracteres"]
        );

        errors.unidadDeMedida = validateErr(
            remesa.unidadDeMedida,
            [],
            ["Campo requerido"]
        );

        errors.volumen = validateErr(
            remesa.volumen,
            [lengthVolumen],
            ["Debe tener una longitud entre 1 y 10 caracteres"]
        );

        errors.empaque = validateErr(
            remesa.empaque,
            [lengthEmpaque],
            ["Debe tener una longitud entre 1 y 50 caracteres"]
        );

        return errors;
    };


    const handleBlur = (e, callback) => {
        setErrors(validateForm(form));
        if (callback) callback();
    };

    const handleBlurRemesa = (e, callback) => {
        setErrorsRemesa(validateFormRemesa(remesa));
        if (callback) callback();
    };

    const submitRemesa = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            remesas: [...form.remesas, { ...remesa, num: form.remesas.length + 1 }],
        });
        setRemesa(initialRemesa);
        setViewFormRemesa(false)
        setIsAddRemesa(false)
    };

    const preEditRemesa = async (remesa) => {
        setViewFormRemesa(true)
        setRemesa(remesa)
        setIsUpdateRemesa(true)
        setIsAddRemesa(false)
    }


    const editRemesa = (e) => {
        e.preventDefault();
        const updatedRemesas = form.remesas.map((rem) =>
            rem.num === remesa.num ? { ...rem, ...remesa } : rem
        );

        setForm({
            ...form,
            remesas: updatedRemesas
        });

        setRemesa(initialRemesa);
        setViewFormRemesa(false);
        setIsUpdateRemesa(false);
    };

    const submitManifiesto = async (e) => {
        e.preventDefault();
        try {
            if (Object.values(errors).some(error => error !== '')
                || JSON.stringify(form) === JSON.stringify(initialForm)
                || form.remesas.length === 0) {
                //console.log(`Object.values(errors).some(error => error !== ''): ${Object.values(errors).some(error => error !== '')}`)
                //console.log(`JSON.stringify(form) === JSON.stringify(initialForm): ${JSON.stringify(form) === JSON.stringify(initialForm)}`)
                //console.log(`form.remesas.length === 0: ${form.remesas.length === 0}`)
                //console.log(`NO pasó `)
                return;
            }
            if (idManifiesto) {
                await axios.put(`${URL_BASE}/manifiestos/${idManifiesto}`, form);
            } else {
                await axios.post(`${URL_BASE}/manifiestos`, form);
            }
            setForm(initialForm);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: idManifiesto ? "Actualización exitosa" : "Registro exitoso",
                showConfirmButton: false,
                toast: true,
                timer: 1500
            });
            navigate('/app/home');  // Redireccionar a la página de inicio
        } catch (err) {
            console.warn(`Error saving manifiesto: ${err}`);
        }
    }

    const put = async (e) => {
        e.preventDefault();
        try {
            // Validaciones antes de enviar el formulario
            if (JSON.stringify(errors) === "{}"
                || Object.values(errors).every(error => error !== '')
                || JSON.stringify(form) === JSON.stringify(initialForm)
                || form.remesas.length === 0) {
                return;
            }

            let res = await axios.put(`${URL_BASE}/manifiestos/${idManifiesto}`, form);

            if (!res.ok) {
                console.log(JSON.stringify(`res: ${res}`))
                console.log(JSON.stringify(`res.data: ${res.data}`))
                return;
            }

            // Si el registro es exitoso
            setForm(initialForm);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Actualización exitosa",
                showConfirmButton: false,
                timer: 1500
            });

        } catch (err) {
            console.warn(`Err submitManifiesto: ${JSON.stringify(err)}`);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response?.data?.message || 'Error interno',
                footer: 'Error interno'
            });
        }
    }


    const post = async (e) => {
        e.preventDefault();
        try {
            // Validaciones antes de enviar el formulario
            if (JSON.stringify(errors) === "{}"
                || Object.values(errors).every(error => error !== '')
                || JSON.stringify(form) === JSON.stringify(initialForm)
                || form.remesas.length === 0) {
                //console.log(`JSON.stringify(errors) == "{}": ${JSON.stringify(errors) == "{}"}`)
                //console.log(`Object.values(errors).every(error => error === ''): ${Object.values(errors).every(error => error !== '')}`)
                //console.log(`JSON.stringify(form) !== JSON.stringify(initialForm): ${JSON.stringify(form) === JSON.stringify(initialForm)}`)
                //console.log(`form.remesas.length == 0: ${form.remesas.length == 0}`)
                //console.log(`NO pasó `)
                return;
            }

            let res = await axios.post(`${URL_BASE}/manifiestos`, form);

            if (!res.ok) {
                console.log(JSON.stringify(`res: ${res}`))
                console.log(JSON.stringify(`res.data: ${res.data}`))
                //throw new Error(`Response status: ${res.status}`);
                //Swal.fire({
                //    icon: "error",
                //    title: "Oops...",
                //    html: Object.values(res.errors).map(err => `<p>${err}</p>`).join(''),
                //    footer: 'Corrija los errores en los respectivos campos'
                //});
                return;
            }

            //if (data.code === 400 || data.code === 500) {
            //    // Actualizar el estado de los errores con los errores devueltos por el servidor
            //    setErrors(prevErrors => ({
            //        ...prevErrors,
            //        ...data.errors
            //    }));
            //    Swal.fire({
            //        icon: "error",
            //        title: "Oops...",
            //        html: Object.values(data.errors).map(err => `<p>${err}</p>`).join(''),
            //        footer: 'Corrija los errores en los respectivos campos'
            //    });
            //    return;
            //}

            // Si el registro es exitoso
            setForm(initialForm);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registro exitoso",
                showConfirmButton: false,
                timer: 1500
            });
        } catch (err) {
            console.warn(`Err submitManifiesto: ${JSON.stringify(err)}`);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: err.response?.data?.message || 'Error interno',
                footer: 'Error interno'
            });
        }
    };


    const getAllTitulares = async () => {
        try {
            const { data } = await axios.get(`${URL_BASE}/titulares`);
            setTitulares(data);
        } catch (err) {
            console.warn(`err getAllTitulares ${err}`)
        }
    };

    const getAllVehiculos = async () => {
        try {
            const { data } = await axios.get(`${URL_BASE}/vehiculos`);
            setVehiculos(data);
        } catch (err) {
            console.warn(`err getAllVehiculos ${err}`)
        }
    };

    const getAllConductores = async () => {
        try {
            const { data } = await axios.get(`${URL_BASE}/conductores`);
            setConductores(data);
        } catch (err) {
            console.warn(`err getAllConductores ${err}`)
        }
    };

    const getManifiestoById = async () => {
        try {
            const { data } = await axios.get(`${URL_BASE}/manifiestos/${idManifiesto}`);

            const initialForm = {
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

            setForm(initialForm);
        } catch (err) {
            console.warn(`Error en getManifiestoById: ${err}`);
        }
    };

    const removeRemesa = (num) => {
        console.log(`removeRemesa.num: ${num}`)
        setForm({
            ...form,
            remesas: form.remesas.filter(rem => rem.num !== num),
        });
    };


    const botonAgregarRemesa = () => {
        setRemesa(initialRemesa);
        setErrorsRemesa({});
        setViewFormRemesa(true);
        setIsAddRemesa(true)
    }

    const cargaInicial = () => {
        console.log("Weizman");
        getAllTitulares();
        getAllVehiculos();
        getAllConductores();
        if (idManifiesto) {
            setIsUpdateManifiesto(true)
            getManifiestoById();
            setIsAddRemesa(false)
            setIsUpdateRemesa(false)
            setViewFormRemesa(false)
        }
    }

    useEffect(() => {
        console.log(`isAddRemesa: ${isAddRemesa}`)
        return () => cargaInicial();
    }, []);


    return (
        <TemplateAdmin>
            <h2>{idManifiesto ? "Actualizar Remisión" : "Registrar Remisión"}</h2>
            <form onSubmit={submitManifiesto}>
                <div className="row">

                    <Select
                        items={titulares}
                        classNameDiv="col-md-4"
                        label="Titular"
                        classNameLabel=""
                        value={form.idTitular}
                        name="idTitular"
                        classNameSelect="form-control"
                        required={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        err={errors.idTitular}
                        itemKey="id"
                        itemLabel={item => `${item.nombre} ${item.apellido}`}
                    />
                    <Input
                        classNameDiv="col-md-4"
                        label="Valor del viaje"
                        type="number"
                        required={true}
                        onBlur={handleBlur}
                        name="valorDelViaje"
                        value={form.valorDelViaje}
                        onChange={handleChange}
                        classNameInput="form-control"
                        err={errors.valorDelViaje}
                    />
                    <Select
                        items={vehiculos}
                        classNameDiv="col-md-4"
                        label="Vehiculo"
                        classNameLabel=""
                        value={form.idVehiculo}
                        name="idVehiculo"
                        classNameSelect="form-control"
                        required={true}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        err={errors.idVehiculo}
                        itemKey="id"
                        itemLabel={item => `${item.nombre} ${item.marca}`}
                    />
                    <Select
                        items={conductores}
                        classNameDiv="col-md-4"
                        label="Conductor"
                        classNameLabel=""
                        value={form.idConductor}
                        name="idConductor"
                        classNameSelect="form-control"
                        required={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        err={errors.idConductor}
                        itemKey="id"
                        itemLabel={item => `${item.nombre} ${item.apellido}`}
                    />
                    <Input
                        classNameDiv="col-md-4"
                        label="Remitente"
                        type="text"
                        required={true}
                        onBlur={handleBlur}
                        name="remitente"
                        value={form.remitente}
                        onChange={handleChange}
                        classNameInput="form-control"
                        err={errors.remitente}
                    />
                    <Input
                        classNameDiv="col-md-4"
                        label="Destinatario"
                        type="text"
                        required={true}
                        onBlur={handleBlur}
                        name="destinatario"
                        value={form.destinatario}
                        onChange={handleChange}
                        classNameInput="form-control"
                        err={errors.destinatario}
                    />
                </div>
            </form>
            <hr />

            {
                viewFormRemesa ? (
                    <form onSubmit={isAddRemesa ? submitRemesa : editRemesa}>
                        <h2>{isAddRemesa ? "Agregar Remesa" : isUpdateRemesa ? "Actualizar Remesa" : ""}</h2>
                        <div className="row">
                            <Input
                                classNameDiv="col-md-4"
                                label="Tipo de Mercancía"
                                type="text"
                                required={true}
                                onBlur={handleBlurRemesa}
                                name="tipoDeMercancia"
                                value={remesa.tipoDeMercancia}
                                onChange={handleRemesaChange}
                                classNameInput="form-control"
                                err={errorsRemesa.tipoDeMercancia}
                            />
                            <Textarea
                                classNameDiv="col-md-4"
                                label="Características"
                                required={true}
                                name="caracteristicas"
                                value={remesa.caracteristicas}
                                onBlur={handleBlurRemesa}
                                onChange={handleRemesaChange}
                                classNameInput="form-control"
                                err={errorsRemesa.caracteristicas}
                            />
                            <Input
                                classNameDiv="col-md-4"
                                label="Peso"
                                type="number"
                                required={true}
                                name="peso"
                                value={remesa.peso}
                                onBlur={handleBlurRemesa}
                                onChange={handleRemesaChange}
                                classNameInput="form-control"
                                err={errorsRemesa.peso}
                            />
                            <Select
                                items={UnidadDeMedidaEnum}
                                classNameDiv="col-md-4"
                                label="Unidad de Medida"
                                classNameLabel=""
                                value={remesa.unidadDeMedida}
                                name="unidadDeMedida"
                                classNameSelect="form-control"
                                required={true}
                                onBlur={handleBlurRemesa}
                                onChange={handleRemesaChange}
                                err={errorsRemesa.unidadDeMedida}
                                itemKey="name"
                                itemLabel={item => `${item.name}`}
                            />
                            <Input
                                classNameDiv="col-md-4"
                                label="Volumen"
                                type="text"
                                required={true}
                                name="volumen"
                                onBlur={handleBlurRemesa}
                                value={remesa.volumen}
                                err={errorsRemesa.volumen}
                                onChange={handleRemesaChange}
                                classNameInput="form-control"
                            />
                            <Input
                                classNameDiv="col-md-4"
                                label="Empaque"
                                type="text"
                                required={true}
                                onBlur={handleBlurRemesa}
                                name="empaque"
                                value={remesa.empaque}
                                err={errorsRemesa.empaque}
                                onChange={handleRemesaChange}
                                classNameInput="form-control"
                            />
                            <div className="col-12 d-flex justify-content-end">
                                <button className="btn btn-secondary" onClick={() => { setRemesa(initialRemesa); setErrorsRemesa({}); setViewFormRemesa(false); setIsAddRemesa(false); setIsUpdateRemesa(false) }}>
                                    Limpiar formulario
                                </button>
                                <button className="btn btn-primary" >
                                    {isAddRemesa ? "Agregar" : isUpdateRemesa ? "Actualizar" : "Agregar"}
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
                    {form.remesas.map((remesa, index) => (
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
                    <button className="btn btn-success" onClick={submitManifiesto} >
                        {isUpdateManifiesto ? "Actualizar Remisión" : "Registrar Remisión"}
                    </button>
                </div>
            </div>
        </TemplateAdmin>
    );
};

export default RegistrarRemision;
