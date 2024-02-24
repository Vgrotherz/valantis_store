import React, { useState } from 'react';
import RequestComponent from './components/valantisApp/RequestComponent';
import ResponseComponent from './components/valantisApp/ResponseComponent';

import md5 from 'md5'

const App = () => {
  const [responseData, setResponseData] = useState(null);
  const password = "Valantis"; // Замените на ваш реальный пароль

  const generateAuthString = () => {
    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, ''); // Получаем текущий день в формате YYYYMMDD
    return md5(`${password}_${timestamp}`);
  };

  const sendRequest = async (data) => {
    const authString = generateAuthString();
    try {
      const res = await fetch('http://api.valantis.store:40000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth': authString // Добавляем авторизационную строку в заголовок
        },
        body: JSON.stringify(data)
      });
      if (res.status === 401) {
        console.error('Authentication failed');
        return;
      }
      const responseJson = await res.json();
      setResponseData(responseJson);

      console.log(setResponseData)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <RequestComponent sendRequest={sendRequest} />
      {responseData && <ResponseComponent responseData={responseData} />}
    </div>
  );
};

export default App;
