import React from 'react';
import Dropdown from '../Dropdown';

const DropdownItem = (props) => (
  <div className='item dropdown-item'>
    <Dropdown {... props} />
  </div>
);

export default DropdownItem;

