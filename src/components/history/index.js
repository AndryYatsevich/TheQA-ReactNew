import React from 'react';
import {connect} from "react-redux";
import {actionEditDevice, actionGetAllDevice, actionGetAllUser, actionGetAllTesting} from "../../common/action";
import {changeStatusToFree, changeStatusToWork, createNewTesting} from "../journal/action";
import {Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Table} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    getTesting = () => {
        console.log(this.state);
        this.props.actionGetAllTesting();
    };

    componentDidMount() {
        this.props.actionGetAllUser();
    }

    handleChangeDateTo = (value, formattedValue) => {
        this.setState({
            dateTo: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    };

    handleChangeDateAfter = (value, formattedValue) => {
        this.setState({
            dateAfter: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
            formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    };

    modalOptionHandler = (e, el) => {
        console.log(e.target.value, this.state);
        let obj = {};
        obj[el] = e.target.value;
        this.setState(obj);
    };

    renderDate = (date) => {
        let parseDate = new Date(date);
        let minute;
        if(parseDate.getMinutes() < 10) {
            minute = '0' + parseDate.getMinutes();
        } else {
            minute = parseDate.getMinutes();
        }
        let currentDate = (parseDate.getDate() < 9 ? '0' + parseDate.getDate() : parseDate.getDate()) + '.' +
            (parseDate.getMonth() < 9 ? '0' + (parseDate.getMonth() + 1) : (parseDate.getMonth() + 1)) + '.' +
            parseDate.getFullYear() +  ' '
            + parseDate.getHours() + ':'
            + minute;
        let arr = [];
        arr.push(currentDate.toString());
        return arr;
    };

    sortArray = (obj1, obj2) => {
        if (obj1.createTs < obj2.createTs) return 1;
        if (obj1.createTs > obj2.createTs) return -1;
    };

    renderTable = (array) => {
        if(array){

            let array1 = array.filter((el) => {
                console.log(Date.now(el.startTime), Date.now(el.startTime) >Date.now(this.state.dateTo));
                let result = true;
                this.state.user && result && (result = el.user.id === this.state.user);
                this.state.device && result &&(result = el.device.id === this.state.device);
                this.state.dateTo && result &&(result = Date.now(el.startTime) >= Date.now(this.state.dateTo));
                this.state.dateAfter && result &&(result = Date.now(el.endTime) <= Date.now(this.state.dateAfter));

                return result;
            });



            return  array1.sort(this.sortArray).map((el, key) => {
                return (<tr key={key}>
                    <td>{el.device.name}</td>
                    <td>{el.user.name}</td>
                    <td>{this.renderDate(el.startTime)}</td>
                    <td>{this.renderDate(el.endTime)}</td>
                </tr>)
            });
        }
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
                            <DatePicker value={this.state.dateTo} onChange={this.handleChangeDateTo} autoComplete={'off'}/>
                            </FormGroup>
                        </Col>
                        <Col xs={3}>
                            <FormGroup
                            controlId="formBasicText">
                            <ControlLabel>Выберите дату "по":</ControlLabel>
                            <DatePicker value={this.state.dateAfter} onChange={this.handleChangeDateAfter} autoComplete={'off'}/>
                        </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Button bsStyle="success"
                                    className={'btn-new-entity'}
                                    onClick={() => this.getTesting()}>Запросить</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Table>
                                <thead>
                                <tr>
                                    <th>Устройство</th>
                                    <th>Сотрудник</th>
                                    <th>Когда взял в работу</th>
                                    <th>Когда сдал</th>
                                    <th>Кто списывал</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderTable(this.props.testing)}
                                </tbody>
                            </Table>


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
    users: state.common.users,
    testing: state.common.testing
});

export default connect(mapStateToProps, {
    actionGetAllDevice,
    actionGetAllUser,
    actionGetAllTesting,
})(History);