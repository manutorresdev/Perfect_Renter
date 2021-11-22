import React from 'react'

export default function Email ({
  onChange,
  name,
  ref,
  className,
  placeHolder,
  defaultValue,
  value
}) {
  return (
    <>
      <input
        value={value}
        className={className}
        name={name}
        type='email'
        placeholder={placeHolder ?? 'Email*'}
        ref={ref}
        onChange={onChange}
      />
    </>
  )
}
