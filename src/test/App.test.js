import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

/** 
 Testa se a aplicação renderiza sem nenhum erro.
**/
it('renders without crashing', () => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.createElement('root')
  );
});
