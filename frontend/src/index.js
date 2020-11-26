import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy , faExclamationTriangle, faFrown} from '@fortawesome/free-solid-svg-icons'

library.add(faCopy, faExclamationTriangle, faFrown);

ReactDom.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);