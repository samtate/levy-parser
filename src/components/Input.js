import React from 'react'

const Input = ({doUpdate, placeholder, id, value}) => (
  <input onChange={e => doUpdate(e.target.value)} id={id} placeholder={placeholder} value={value} />
);

export default Input;
