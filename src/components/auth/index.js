import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import { Button, Alert } from 'react-bootstrap';
import {connect} from 'react-redux';
import {actionUserAuth} from '../../common/action';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    loginChange = (e) => {

        this.setState({login: e.target.value});
    };

    passwordChange = (e) => {
        this.setState({password: e.target.value});
    };

    authorization = (e) => {
        e.preventDefault();
        this.props.actionUserAuth(this.state.login, this.state.password);
    };

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <div className={'auth-wrap'}>
                            <div className={'auth-box'}>
                                <form>
                                    <FormGroup
                                        controlId="formBasicText"
                                    >
                                        <ControlLabel>Логин:</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Введите логин"
                                            onChange={this.loginChange}
                                        />
                                    </FormGroup>
                                    <FormGroup
                                        controlId="formBasicText"
                                    >
                                        <ControlLabel>Пароль:</ControlLabel>
                                        <FormControl
                                            type="password"
                                            placeholder="Введите пароль"
                                            onChange={this.passwordChange}
                                            autoComplete="off"
                                        />
                                    </FormGroup>
                            {this.props.userInfo && this.props.userInfo.error && (
                            <Alert bsStyle="danger">
                            <strong>Логин или пароль введены неверно</strong>
                          </Alert>)}
                                    <Button bsStyle="primary"
                                            bsSize="large"
                                            block className={'auth-btn'}
                                            onClick={this.authorization}>
                                        Войти
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Grid>


        );
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.common.userInfo
});

/*const mapDispatchToProps = (dispatch) => ({
    getUserCredential: () => getUserCredential(dispatch)

});*/

export default connect(mapStateToProps, {
    actionUserAuth
})(Auth);