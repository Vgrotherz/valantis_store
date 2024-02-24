import React, { useState } from 'react';

const RequestComponent = ({ sendRequest }) => {
  const [requestData, setRequestData] = useState({
    action: '',
    params: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleParamsChange = (e) => {
    const { name, value } = e.target;
    setRequestData(prevData => ({
      ...prevData,
      params: {
        ...prevData.params,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest(requestData);
  };

  return (
    <div>
      <h2>Send Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Action:</label>
          <input type="text" name="action" value={requestData.action} onChange={handleChange} />
        </div>
        <div>
          <label>Params:</label>
          <input type="text" name="params" value={requestData.params} onChange={handleParamsChange} />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default RequestComponent;