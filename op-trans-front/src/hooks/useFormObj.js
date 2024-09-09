import { useState } from "react";

export const useForm = (initialForm, validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = async (e, callback) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    if (callback) await callback();
  };

  const handleBlur = async (e, callback) => {
    handleChange(e);
    setErrors(validateForm(form));

    if (callback) await callback();
  };

  const handleSubmit = async (
    e,
    sendPostPutForm, // Función a ejecutar (POST, PUT o cualquier otra)
    actionPrev = null,
    actionPost = null
  ) => {
    e.preventDefault();
    const errResult = await validateForm(form);
    if ((errResult && Object.values(errResult).some((error) => error !== "")) ||
      JSON.stringify(form) !== JSON.stringify(initialForm)) {
      try {
        setIsSubmitting(true); // Inicia el estado de envío

        // Swal.fire({
        //   title: "...!",
        //   html: "Espere mientras se cargan los datos...",
        //   timerProgressBar: false,
        //   didOpen: () => {
        //     Swal.showLoading();
        //   },
        // });

        if (actionPrev) await actionPrev();

        // Ejecutar la función pasada como sendPostPutForm
        await sendPostPutForm();

        if (actionPost) await actionPost();

      } catch (err) {
        console.error(`Ocurrió un error: ${err}`);
      } finally {
        //Swal.close();
        setIsSubmitting(false); // Finaliza el estado de envío
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
    setErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setIsSubmitting
  };
};
