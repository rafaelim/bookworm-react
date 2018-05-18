import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoggedIn } from './actions/auth';
import decode from 'jwt-decode';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

if (localStorage.bookwormJWT) {
    const payload = decode(localStorage.bookwormJWT);
    console.log(payload)
    const user = { 
        token: localStorage.bookwormJWT, 
        email: payload.email, 
        confirmed: payload.confirmed 
    };
    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
