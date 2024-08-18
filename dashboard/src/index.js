import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/App';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import switchReducer from './features/switch';
import switchstateReducer from './features/switchstate';
import statusReducer from "./features/status";
import statuscolorReducer from './features/color';
import sensordataReducer from './features/sensordata';
import modeReducer from './features/mode';
import timeReducer from './features/time';
import timerReducer from './features/timerswitch';
import timerbuttonReducer from './features/timerbutton';

const store = configureStore({
    reducer:{
        switch:switchReducer,
        switchstate:switchstateReducer,
        status:statusReducer,
        statuscolor:statuscolorReducer,
        sensordata:sensordataReducer,
        mode:modeReducer,
        time:timeReducer,
        timer:timerReducer,
        timerbutton:timerbuttonReducer
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
<App />
</Provider>
);
