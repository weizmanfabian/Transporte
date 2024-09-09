import React from 'react';
import PropTypes from 'prop-types';

// Estilo para el mensaje de error
const styleError = {
  fontWeight: 'bold',
  color: '#dc3545',
};

// Componente para mostrar mensajes de error
export const Err = ({ err }) => {
  return <p style={styleError}>{err}</p>;
};

Err.propTypes = {
  err: PropTypes.string, // El mensaje de error es un string
};
// Componente de entrada de texto
export const Input = ({
  label, // Etiqueta para el campo
  type, // Tipo de input (ej. text, number)
  name, // Nombre del input
  err, // Mensaje de error
  value, // Valor del input
  classNameDiv, // Clase CSS para el contenedor
  classNameInput, // Clase CSS para el input
  required, // Indica si es requerido
  onChange, // Función para manejar cambios
  onBlur, // Función para manejar evento de perder foco
  onKeyUp, // Función para manejar evento de tecla levantada
  classNameLabel, // Clase CSS para la etiqueta
  maxLength, // Longitud máxima del texto
  id, // Identificador único
  disabled, // Indica si el input está deshabilitado
  placeholder, // Texto de marcador de posición
}) => {
  return (
    <div className={classNameDiv}>
      <small className={classNameLabel}>{label}</small>
      <input
        value={type === 'number' ? value : String(value)}
        className={classNameInput}
        type={type}
        name={name}
        required={!!required}
        disabled={!!disabled}
        onChange={onChange}
        maxLength={maxLength}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        id={id}
        placeholder={placeholder}
      />
      <Err err={err} />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  err: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  classNameDiv: PropTypes.string,
  classNameInput: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  classNameLabel: PropTypes.string,
  maxLength: PropTypes.number,
  id: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  placeholder: PropTypes.string,
};

/**
 * Componente Select para desplegar opciones de selección
 * 
 * @param {Object} props - Propiedades del componente
 * @returns JSX.Element
 */
export const Select = ({
  items,            // Array de opciones a mostrar
  classNameDiv,     // Clase CSS para el contenedor
  label,            // Etiqueta del select
  classNameLabel,   // Clase CSS para la etiqueta
  value,            // Valor seleccionado
  name,             // Nombre del select
  classNameSelect,  // Clase CSS para el select
  required,         // Indica si es requerido
  onChange,         // Función para manejar cambios
  onBlur,           // Función para manejar evento de perder foco
  onKeyUp,          // Función para manejar evento de tecla levantada
  id,               // Identificador único
  disabled,         // Indica si el select está deshabilitado
  err,              // Mensaje de error
  itemKey,          // Clave para obtener el valor de cada opción si es un objeto
  itemLabel,        // Función para obtener la etiqueta de cada opción si es un objeto
}) => {
  return (
    <div className={classNameDiv}>
      <small className={classNameLabel}>{label}</small>
      <select
        value={value} // El valor seleccionado se controla aquí
        className={classNameSelect}
        name={name}
        required={required === "true" || required ? true : false}
        disabled={disabled === "true" || disabled ? true : false}
        onChange={onChange}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        id={id}
      >
        <option value="" disabled>
          Seleccione
        </option>
        {items.map((item, index) => {
          // Verificar si el item es un objeto o un string
          const key = typeof item === "object" ? item[itemKey] : index;
          const label = typeof item === "object" ? itemLabel(item) : item;
          const optionValue = typeof item === "object" ? item[itemKey] : item;

          return (
            <option key={key} value={optionValue}>
              {label}
            </option>
          );
        })}
      </select>
      <Err err={err} />
    </div>
  );
};

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])).isRequired, // Array de opciones
  classNameDiv: PropTypes.string,
  label: PropTypes.string,
  classNameLabel: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // El valor seleccionado es obligatorio y puede ser string o number
  name: PropTypes.string.isRequired,  // El nombre es obligatorio
  classNameSelect: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func.isRequired, // La función de cambio es obligatoria
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  id: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  err: PropTypes.string,
  itemKey: PropTypes.string, // La clave para obtener el valor de cada opción si es un objeto
  itemLabel: PropTypes.func, // Función para obtener la etiqueta de cada opción si es un objeto
};

// Componente de área de texto
export const Textarea = ({
  classNameDiv,     // Clase CSS para el contenedor
  label,            // Etiqueta para el textarea
  classNameLabel,   // Clase CSS para la etiqueta
  value,            // Valor del textarea
  name,             // Nombre del textarea
  classNameInput,   // Clase CSS para el textarea
  required,         // Indica si es requerido
  onChange,         // Función para manejar cambios
  maxLength,        // Longitud máxima del texto
  onBlur,           // Función para manejar evento de perder foco
  onKeyUp,          // Función para manejar evento de tecla levantada
  id,               // Identificador único
  disabled,         // Indica si el textarea está deshabilitado
  err,              // Mensaje de error
  placeholder,      // Texto de marcador de posición
}) => {
  return (
    <div className={classNameDiv}>
      <small className={classNameLabel}>{label}</small>
      <textarea
        value={value}
        className={classNameInput}
        name={name}
        required={!!required}
        disabled={!!disabled}
        onChange={onChange}
        onKeyUp={onKeyUp}
        maxLength={maxLength}
        onBlur={onBlur}
        id={id}
        placeholder={placeholder}
      />
      <Err err={err} />
    </div>
  );
};

Textarea.propTypes = {
  classNameDiv: PropTypes.string,
  label: PropTypes.string,
  classNameLabel: PropTypes.string,
  value: PropTypes.string.isRequired, // El valor es obligatorio
  name: PropTypes.string.isRequired,  // El nombre es obligatorio
  classNameInput: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func.isRequired, // La función de cambio es obligatoria
  maxLength: PropTypes.number,
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  id: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  err: PropTypes.string,
  placeholder: PropTypes.string,
};
