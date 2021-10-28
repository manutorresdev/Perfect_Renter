import React from 'react';

export default function FirstName({
  onChange,
  name,
  ref,
  className,
  placeHolder,
  value,
}) {
  return (
    <>
      <input
        value={value}
        className={className}
        type='text'
        name={name}
        onChange={onChange}
        ref={ref}
        placeholder={placeHolder ?? 'Nombre*'}
      />
    </>
  );
}
