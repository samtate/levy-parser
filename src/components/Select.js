import React from 'react'

const Select = ({ selectList, doUpdateDropdown }) => {

  const generateOptions = item => {
    return <option value={item}>{item}</option>
  }
  return (
    <select onChange={e => doUpdateDropdown(e)}>
      <option value='all'>All</option>
      {selectList.map(item => generateOptions(item))}
    </select>
  )
};

export default Select;
