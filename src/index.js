import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import BookStore from './BookStore';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BookStore />, document.getElementById('root'));
registerServiceWorker();
