import React from 'react';
import { Field } from 'redux-form';

function InputFieldTemplate(field) {
  const {
    meta: { touched, error },
    label,
    input
  } = field;
  const placeholder = `Enter the ${label}`;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;

  return (
    <div className={className}>
      <label>{label}</label>
      <input
        className="form-control"
        type="text"
        placeholder={placeholder}
        {...input}
      />
      {touched && <div className="text-help">{error}</div>}
    </div>
  );
}

export default function InputField(props) {
  return (
    <Field
      label={props.label}
      name={props.name}
      component={InputFieldTemplate}
    />
  );
}
