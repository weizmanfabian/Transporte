import React from 'react';
import PropTypes from 'prop-types';

const styleError = {
  fontWeight: 'bold',
  color: '#dc3545',
};

export const Err = ({ err }) => {
  return <p style={styleError}>{err}</p>;
};

Err.propTypes = {
  err: PropTypes.string,
};

export const Input = ({
  label,
  type,
  name,
  err,
  value,
  classNameDiv,
  classNameInput,
  required,
  onChange,
  onBlur,
  onKeyUp,
  classNameLabel,
  maxLength,
  id,
  disabled,
  placeholder,
}) => {
  return (
    <div className={classNameDiv}>
      <small className={classNameLabel}>{label}</small>
      <input
        value={value}
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
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  err: PropTypes.string,
  value: PropTypes.string.isRequired,
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

export const Select = ({
  items,
  classNameDiv,
  label,
  classNameLabel,
  value,
  name,
  classNameSelect,
  required,
  onChange,
  onBlur,
  onKeyUp,
  id,
  disabled,
  err,
  itemKey, 
  itemLabel
}) => {
  return (
    <div className={classNameDiv}>
      <small className={classNameLabel}>{label}</small>
      <select
        value={value}
        className={classNameSelect}
        name={name}
        required={required === "true" || required ? true : false}
        disabled={disabled === "true" || disabled ? true : false}
        onChange={onChange}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        id={id}
      >
        <option disabled selected value={""}>
          Seleccione
        </option>
        {items.map((item, index) => (
          <option key={item[itemKey] || index} value={item[itemKey]}>
            {itemLabel(item)}
          </option>
        ))}
      </select>
      <Err err={err} />
    </div>
  );
};

Select.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  classNameDiv: PropTypes.string,
  label: PropTypes.string,
  classNameLabel: PropTypes.string,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  classNameSelect: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  id: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  err: PropTypes.string,
};

export const Textarea = ({
  classNameDiv,
  label,
  classNameLabel,
  value,
  name,
  classNameInput,
  required,
  onChange,
  maxLength,
  onBlur,
  onKeyUp,
  id,
  disabled,
  err,
  placeholder,
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
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  classNameInput: PropTypes.string,
  required: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  onBlur: PropTypes.func,
  onKeyUp: PropTypes.func,
  id: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  err: PropTypes.string,
  placeholder: PropTypes.string,
};
