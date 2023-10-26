'use client';
import React from 'react'

const Output = () => {
const output = sessionStorage.getItem("Input")
  return (
    <div>
      <p>{output}</p>
    </div>
  );
};
export default Output;
