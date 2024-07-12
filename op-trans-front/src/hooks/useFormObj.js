import { useState } from "react";
import Swal from "sweetalert2";

export const useForm = (initialForm, validateForm, sendPostPut) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  

  const handleChange = (e, callback) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (callback) callback();
  };

  const handleBlur = (e, callback) => {
    handleChange(e);
    setErrors(validateForm(form));

    if (callback) callback();
  };

  const handleSubmit = async (
    e,
    actionServer,
    name,
    value,
    actionPost = null,
    actionPrev = null,
    headers = {}
  ) => {
    e.preventDefault();

    const errResult = await validateForm(form);
    if (Object.keys(errResult).length === 0) {
      try {
        Swal.fire({
          title: "...!",
          html: "Espere mientras se cargan los datos...",
          timerProgressBar: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const newForm = actionPrev ? await actionPrev() : form;
        const res = await sendPostPut(actionServer, newForm, name, value, headers);
        
        Swal.close();
        const { err, msg } = res.data;
        if (err) {
          Swal.fire(err);
        } else {
          e.target.reset();
          Swal.fire(msg);
          setForm(initialForm);
          if (actionPost) actionPost();
        }
      } catch (err) {
        console.error(
          `Ocurrió un error al realizar el post del hook useForm: ${actionServer} Err: ${err}`
        );
      }
    } else {
      setErrors(errResult);
      return false;
    }
  };

  const handleSubmitWithObject = async (
    e,
    actionServer,
    newForm,
    name,
    value,
    actionPost = null,
    headers = {}
  ) => {
    e.preventDefault();

    const errResult = await validateForm(newForm);
    if (Object.keys(errResult).length === 0) {
      try {
        Swal.fire({
          title: "...!",
          html: "Espere mientras se cargan los datos...",
          timerProgressBar: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const res = await sendPostPut(actionServer, newForm, name, value, headers);
        
        Swal.close();
        const { err, msg } = res.data;
        if (err) {
          Swal.fire(err);
        } else {
          e.target.reset();
          Swal.fire(msg);
          setForm(initialForm);
          if (actionPost) actionPost();
        }
      } catch (err) {
        console.error(
          `Ocurrió un error al realizar el post del hook useForm: ${actionServer} Err: ${err}`
        );
      }
    } else {
      setErrors(errResult);
      return false;
    }
  };

  return {
    form,
    setForm,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleSubmitWithObject,
  };
};
