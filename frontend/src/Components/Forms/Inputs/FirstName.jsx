import React from 'react';

export default function FirstName({
  onChange,
  name,
  ref,
  className,
  placeHolder,
}) {
  return (
    <>
      <input
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
