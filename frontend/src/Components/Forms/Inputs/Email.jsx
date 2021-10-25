import React from 'react';

export default function Email({
  onChange,
  name,
  ref,
  className,
  placeHolder,
  errors,
}) {
  return (
    <>
      <input
        className={className}
        name={name}
        type='email'
        placeholder={placeHolder ?? 'Email*'}
        ref={ref}
        onChange={onChange}
      />
    </>
  );
}
