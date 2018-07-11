import React, {Component} from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Glyphicon} from 'react-bootstrap';
import {Grid, Row, Col} from 'react-bootstrap';
import Auth from './components/auth';
import {connect} from 'react-redux';
import {actionGetUserInfo, actionGetAllRoles, actionGetAllTesting, actionGetAllDevice} from "./common/action";
import {Link} from 'react-router-dom';
import Userinfo from './components/userInfo';
import Menu from './components/leftMenu';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: true,
            active: 'active',
            activeComponent: null
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

    testHandle = (e) => {
        console.log(e.target, '<----------------', window.location.pathname, this.context);
    };

    render() {
        let menu = [
            {
                title: 'Журнал',
                path: '/',
                icon: 'time'
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
                path: '/setting',
                icon: 'cog'
            },
        ];
        return (
            localStorage.getItem('token') ?
                <Grid className={'wrap'} fluid>
                    <Row className={'topbar'}>
                        <Col xs={2} > {/*className={'topbar-left'}*/}
                            <img src={logo} className="App-logo" alt="logo"/>



                        </Col>

                        <Col xsOffset={7} xs={3}>
                            <Userinfo userInfo={this.props.userInfo} logout={this.logout}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2} className={'side-menu'}>
                            <ul className={'side-menu--block'} onClick={this.testHandle}>
                                <li className={'side-menu--title'} >Navigation</li>
                                <Menu menu={menu}/>
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
    userInfo: state.common.userInfo
});

export default connect(mapStateToProps, {
    actionGetUserInfo,
    actionGetAllRoles,
    actionGetAllTesting,
    actionGetAllDevice
})(App);
