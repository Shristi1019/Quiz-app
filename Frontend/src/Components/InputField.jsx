import React from "react";

function InputField({ width, id, type, placeholder, value, onChange, name }){

    return (
      <div>
      <input className="form-control" style={{width:width}}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
    );
};


export default InputField;