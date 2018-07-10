import React, {Component} from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Glyphicon} from 'react-bootstrap';
import {Grid, Row, Col} from 'react-bootstrap';
import Auth from './components/auth';
import {connect} from 'react-redux';
import {actionGetUserInfo, actionGetAllRoles, actionGetAllTesting} from "./common/action";
import {Link} from 'react-router-dom';
import Userinfo from './components/userInfo';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: true
        };
    }

    componentDidMount () {
       this.props.actionGetUserInfo();
    }

    logout = () => {
        localStorage.removeItem('token');
        this.setState({auth: !this.state.auth})
    };

    render() {
        return (
            localStorage.getItem('token') ?
                <Grid className={'wrap'} fluid>
                    <Row className={'topbar'}>
                        <Col xs={2} className={'topbar-left'}>
                            <img src={logo} className="App-logo" alt="logo"/>

                        </Col>
                        <Col xs={8}>

                        </Col>
                        <Col xs={2}>
                            <Userinfo userInfo={this.props.userInfo} logout={this.logout}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2} className={'side-menu'}>
                            <ul className={'side-menu--block'}>
                                <li className={'side-menu--title'}>Navigation</li>
                                <li><Link to={`/`} className={'side-menu--link active'}><Glyphicon glyph="time" className={'side-menu--icon'}/><span>Журнал</span></Link></li>
                                <li><a className={'side-menu--link'}><Glyphicon glyph="book" className={'side-menu--icon'}/><span>История</span></a></li>
                                <li><Link to={`/info`} className={'side-menu--link'}><Glyphicon glyph="info-sign" className={'side-menu--icon'}/><span>Информация</span></Link></li>
                                <li><a className={'side-menu--link'}><Glyphicon glyph="cog" className={'side-menu--icon'}/><span>Настройки</span></a></li>
                            </ul>
                        </Col>
                        <Col xs={10} className={'content-page'}>
                            <div >
                            {this.props.children}
                            </div>
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
