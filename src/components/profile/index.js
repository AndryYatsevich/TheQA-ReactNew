import React from 'react';
import {connect} from "react-redux";
import {Row, Col, Button, FormControl, ControlLabel, FormGroup, Modal} from 'react-bootstrap';
import avatar from '../../img/avatar.jpg';

class Profile extends React.Component {
    constructor() {
        super();
        this.handleCloseResetPasswordModal = this.handleCloseResetPasswordModal.bind(this);
        this.state = {
            showResetPasswordModal: false,
            changeUserPasswordBtnDisabled: true
        }
    }

    fileOnChange = (e) => {

        let reader = new FileReader();
        /*var aBlob = new Blob( e.target.value, {type : ""} );*/

        reader.onload = (result) => {
            console.log(result);
            let img = new Image();
            img.onload = () => {
              console.log(img.width, img.height);

            };
            img.src = result.target.result;
            this.setState({
                url: result.target.result
            })
        };
        reader.readAsDataURL(e.target.files[0]);
        console.log(e.target.files[0]);

    };

    handleShowResetPasswordModal(el) {
        this.setState({
            showResetPasswordModal: true,
            userName: el.name,
            userId: el.id
        });
    }

    handleCloseResetPasswordModal() {
        this.setState({showResetPasswordModal: false});
    }

    changeNewPassword = (e) => {
        this.setState({newPassword: e.target.value});
        this.checkNewPassword(e.target.value, this.state.acceptNewPassword);
    };

    changeAcceptNewPassword = (e) => {
        this.setState({acceptNewPassword: e.target.value});
        this.checkNewPassword(this.state.newPassword, e.target.value);
    };

    checkNewPassword = (newPassword, acceptNewPassword) => {
        console.log(newPassword, acceptNewPassword);
        if(newPassword === acceptNewPassword) {
            this.setState({
                changeUserPasswordBtnDisabled: false
            })
        } else {
            this.setState({
                changeUserPasswordBtnDisabled: true
            })
        }
    };

    changeUserPassword = () => {
        let data = {
            newPassword: this.state.newPassword,
            userId: this.props.userInfo.id
        };

        fetch('http://localhost:8080/app/rest/api/changePassword', {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.text();
        });
        this.setState({
            showResetPasswordModal: false
        })
    };

    render() {
        return (
            <div className={'content-page-wrap'}>
                <h4 className={'content-title'}>Профиль</h4>
                <Row>
                    <Col xs={6}>
                <div className={'content-box img-center'}>
                    <div className={'img-center'} >
                        <div className={'img-center-ava'}  style={{backgroundImage: `url(${this.state.url || avatar})`}} />
                        {/*<img src={this.state.url || avatar} className={'profile--avatar'} alt="avatar"/>*/}
                    </div>
                    <div>

                        <FormGroup
                            controlId="formBasicText"
                        >
                            <ControlLabel><span className={'btn btn-default'}>Изменить аватар</span><span>{this.state.fileName}</span></ControlLabel>
                            <FormControl
                                className={'change-avatar--btn '}
                                type="file"
                                placeholder={'345'}
                                onChange={(e)=> this.fileOnChange(e)}
                            />
                        </FormGroup>
                    </div>
                </div>
                    </Col>
                    <Col xs={6}>
                <div className={'content-box'}>
                    <div>Имя пользователя: {this.props.userInfo ? this.props.userInfo.name : ''}</div>
                    <div>Роль: {this.props.userInfo? this.props.userInfo.roles : ''}</div>
                    <div>
                        <Button
                            bsStyle="success"
                            onClick={(el) => this.handleShowResetPasswordModal(el)}>
                            Сменить пароль
                        </Button>
                    </div>
                </div>
                    </Col>
                </Row>
                {/*модалка смены пароля*/}
                <Modal show={this.state.showResetPasswordModal} onHide={this.handleCloseResetPasswordModal}>
                    <Modal.Header>
                        <Modal.Title>Сброс пароля пользователя</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <FormGroup
                                controlId="formBasicText">
                                <ControlLabel>Новый пароль</ControlLabel>
                                <FormControl
                                type="password"
                                placeholder="Новый пароль"
                                onChange={this.changeNewPassword}
                                />
                                </FormGroup>
                        </div>
                        <div>
                            <FormGroup
                                controlId="formBasicText">
                                <ControlLabel>Подтвердите пароль</ControlLabel>
                                <FormControl
                                type="password"
                                placeholder="Подтвердите пароль"
                                onChange={this.changeAcceptNewPassword}
                                />
                            </FormGroup>
                        </div>
                        </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle={'warning'}
                                onClick={() => this.changeUserPassword()}
                                disabled={this.state.changeUserPasswordBtnDisabled}>
                            Изменить пароль
                        </Button>
                        <Button bsStyle="default" onClick={this.handleCloseResetPasswordModal}>Отмена</Button>
                    </Modal.Footer>
                </Modal>
            </div>


        );
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.common.userInfo
});

export default connect(mapStateToProps, {})(Profile);