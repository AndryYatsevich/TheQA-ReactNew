import React, {Component} from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Button} from 'react-bootstrap';
import {Grid, Row, Col} from 'react-bootstrap';
import Auth from './components/auth';
import {connect} from 'react-redux';
import {actionGetUserInfo, actionGetAllRoles, actionGetAllTesting} from "./common/action";

class App extends Component {
    render() {
        return (
            localStorage.getItem('token') ?
                <Grid className={'wrap'} fluid>
                    <Row className={'topbar'}>
                        <Col xs={2} className={'topbar-left'}>
                            <img src={logo} className="App-logo" alt="logo"/>

                        </Col>
                        <Col xsOffset={8} xs={2}>
                            Тут будет колокольчик и инфа по пользователю.
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2} className={'side-menu'}>
                            <ul>
                                <li>Журнал</li>
                                <li>Журнал</li>
                                <li>Журнал</li>
                                <li>Журнал</li>
                            </ul>
                        </Col>
                        <Col xs={10}>

                        </Col>
                    </Row>

                </Grid> :
                <Auth/>)
    };
}

const mapStateToProps = (state) => ({
    userInfo: state.common.userInfo
});

export default connect(mapStateToProps, {
    actionGetUserInfo,
    actionGetAllRoles,
    actionGetAllTesting
})(App);
