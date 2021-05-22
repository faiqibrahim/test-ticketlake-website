// library
import React from 'react';
import ReactDOM from 'react-dom';
// CSS
import './index.css';
import 'react-flags-select/css/react-flags-select.css';
import "react-datepicker/dist/react-datepicker.css";

// Main
import App from './App';
import * as serviceWorker from './serviceWorker';
// Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {ThroughProvider} from 'react-through'

ReactDOM.render(
        <ThroughProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThroughProvider>, document.getElementById('root')
);

serviceWorker.unregister();