import React, {Component} from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Grid, Row, Col} from 'react-bootstrap';
import Auth from './components/auth';
import {connect} from 'react-redux';
import {actionGetUserInfo, actionGetAllRoles, actionGetAllTesting, actionGetAllDevice} from "./common/action";
import Userinfo from './components/userInfo';
import Menu from './components/leftMenu';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: true,
            active: 'active',
            activeComponent: null,
            deviceCount: 0
        };
    }

    componentDidMount () {
       this.props.actionGetUserInfo();
       this.props.actionGetAllDevice();
    }

    logout = () => {
        localStorage.removeItem('token');
        this.setState({auth: !this.state.auth})
    };







    render() {
        let menu = [
            {
                title: 'Журнал',
                path: '/',
                icon: 'time',
                badge: true,
                badgeCount: this.state.deviceCount
            },
            {
                title: 'История',
                path: '/history',
                icon: 'book'
            },
            {
                title: 'Информация',
                path: '/info',
                icon: 'info-sign'
            },
            {
                title: 'Настройки',
                path: '/settings',
                icon: 'cog'
            },
        ];
        return (
            localStorage.getItem('token') ?
                <Grid className={'wrap'} fluid>
                    <Row className={'topbar'}>
                        <Col xs={2} >
                            <img src={logo} className="App-logo" alt="logo"/>

                        </Col>

                        <Col xsOffset={7} xs={3}>
                            <Userinfo userInfo={this.props.userInfo} logout={this.logout} devices={this.props.devices}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2} className={'side-menu'}>
                            <ul className={'side-menu--block'} onClick={this.testHandle}>
                                <li className={'side-menu--title'} >Navigation</li>
                                <Menu menu={menu}
                                      userInfo={this.props.userInfo}
                                      devices={this.props.devices}
                                />
                            </ul>
                        </Col>
                        <Col xs={10} className={'content-page'}>
                            {this.props.children}
                        </Col>
                    </Row>

                </Grid> :
                <Auth/>)
    };
}

const mapStateToProps = (state) => ({
    userInfo: state.common.userInfo,
    devices: state.common.devices
});

export default connect(mapStateToProps, {
    actionGetUserInfo,
    actionGetAllRoles,
    actionGetAllTesting,
    actionGetAllDevice
})(App);
