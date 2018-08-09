import React from 'react';
import {connect} from "react-redux";
import {actionEditDevice, actionGetAllDevice, actionGetAllUser, actionGetAllTesting} from "../../common/action";
import {changeStatusToFree, changeStatusToWork, createNewTesting} from "../journal/action";
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "2018-08-09T12:39:22.418Z"
        };
    }

    componentDidMount() {
        this.props.actionGetAllUser();
    }

    handleChange = (value, formattedValue) => {
        this.setState({
            value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    };

    modalOptionHandler = (e, el) => {
        console.log(e.target.value, this.state);
        let obj = {};
        obj[el] = e.target.value;
        this.setState(obj);
    };

    renderOptionField = (array) => (array && array.map((el, key) => {
        return <option value={el.id} key={key}>{el.name}</option>
    }));

    render() {
        return (
            <div className={'content-page-wrap'}>
                <h4 className={'content-title'}>История</h4>
                <div className={'content-box'}>
                    <Row>
                        <Col xs={3}>
                            <FormGroup
                                controlId="formBasicText">
                                <ControlLabel>Выберите пользователя:</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    placeholder="select"
                                    label="пользователь"
                                    onChange={(e) => this.modalOptionHandler(e, 'user')}>

                                    <option value="" />
                                    {this.renderOptionField(this.props.users)}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={3}>
                            <FormGroup
                                controlId="formBasicText">
                                <ControlLabel>Выберите девайс:</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    placeholder="select"
                                    label="девайс"
                                    onChange={(e) => this.modalOptionHandler(e, 'device')}>

                                    <option value="" />
                                    {this.renderOptionField(this.props.devices)}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={3}>
                            <FormGroup
                                controlId="formBasicText">
                                <ControlLabel>Выберите дату "с":</ControlLabel>
                            <DatePicker value={this.state.value} onChange={this.handleChange}/>
                            </FormGroup>
                        </Col>
                        <Col xs={3}>
                            <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Выберите дату "по":</ControlLabel>
                            <DatePicker value={this.state.value} onChange={this.handleChange}/>
                        </FormGroup>
                        </Col>
                    </Row>
                </div>
            </div>


        );
    }
}

const mapStateToProps = (state) => ({
    devices: state.common.devices,
    userInfo: state.common.userInfo,
    users: state.common.users
});

export default connect(mapStateToProps, {
    actionGetAllDevice,
    actionGetAllUser,
    actionGetAllTesting,
})(History);