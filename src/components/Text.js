import React from 'react';

const Text = ({text}) => (
  <>
  {text.map((item) =>
  <p>{item}</p>
  )}
  </>
);

export default Text;
