import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import rootReducer from './rootReducer';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import thunk from 'redux-thunk';
import Journal from './components/journal';
import Info from './components/info';
import History from './components/history';
import Settings from './components/settings';
import Profile from './components/profile'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const RouteWishApp = (props) => {
    const {Component} = props;
    return <Route {...props} component={() => {
        return <App><Component/></App>;
    }}/>
};


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <RouteWishApp exact path='/' Component={Journal}/>
                <RouteWishApp path='/info' Component={Info} />
                <RouteWishApp path='/settings' Component={Settings} />
                <RouteWishApp path='/history' Component={History} />
                <RouteWishApp path='/profile' Component={Profile} />
                <RouteWishApp  Component={Info}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
