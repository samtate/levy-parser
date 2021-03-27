import React from 'react'
import Input from './Input'

const Header = ({doUpdate, commonplaceURL}) => (
  <Input id="commonplace-href" placeholder="Commonplace Link..." doUpdate={doUpdate} value={commonplaceURL} />
);

export default Header;
