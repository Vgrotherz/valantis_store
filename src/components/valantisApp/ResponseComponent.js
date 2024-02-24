import React from 'react';

const ResponseComponent = ({ responseData }) => {
  return (
    <div>
      <h2>Response</h2>
      <pre>{JSON.stringify(responseData, null, 2)}</pre>
    </div>
  );
};

export default ResponseComponent;