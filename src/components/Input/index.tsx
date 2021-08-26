import React, { InputHTMLAttributes } from 'react';

import './style.css';

interface InputText extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const Input = ({ label, ...props } : InputText ) => {
  return <div className="input-container">
      <label>{label}</label>
      <input {...props} />
  </div>;
}

export default Input;