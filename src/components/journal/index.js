import React from 'react';
import {changeStatusToWork, createNewTesting, changeStatusToFree} from './action';
import {actionEditDevice, actionGetAllDevice} from '../../common/action';
import {Table, Button, Glyphicon, Checkbox, Panel} from 'react-bootstrap';
import {connect} from "react-redux";
import Comment from '../comment';

class Journal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: null,
            myDevice: false,
            waitingDevice: false
        };
    }

    componentDidMount() {
        if (localStorage.getItem('token')) this.props.actionGetAllDevice();

        setInterval(() => {
            this.props.actionGetAllDevice();
            console.log('work');
        }, 10000);
    }

    takeToWork = (el) => {
        let date = new Date();
        let testing = {
            user: {
                _entityName: "sec$User",
                id: this.props.userInfo.id,
            },
            device: {
                _entityName: "testersjournal$Device",
                id: el.id
            },
            startTime: date.getFullYear() + '-'
            + (date.getMonth() + 1) + '-'
            + date.getDate() + ' '
            + date.getHours() + ':'
            + date.getMinutes() + ':'
            + date.getSeconds() + '.'
            + date.getMilliseconds()
        };
        this.props.createNewTesting(testing, el.id);
    };

    returnDevice = (el) => {
        let date = new Date();
        let testing = {
            endTime: date.getFullYear() + '-'
            + (date.getMonth() + 1) + '-'
            + date.getDate() + ' '
            + date.getHours() + ':'
            + date.getMinutes() + ':'
            + date.getSeconds() + '.'
            + date.getMilliseconds()
        };
        this.props.changeStatusToWork(el, testing);
    };

    acceptAdmin = (el) => {
        console.log(el);
        this.props.changeStatusToFree(el);
    };


    renderDeviceButton = (el) => {
        if (el.state === 'FREE') {
            return <Button bsStyle="success journal-btn--size" onClick={() => this.takeToWork(el)}>Взять</Button>
        }

        if (el.state === 'WAIT' && this.props.userInfo && this.props.userInfo.roles[0] !== 'Administrators') {
            return <div>Ожидает списания</div>

        } else if (el.state === 'WAIT' && this.props.userInfo && this.props.userInfo.roles[0] === 'Administrators') {
            return <Button bsStyle="warning journal-btn--size" onClick={() => this.acceptAdmin(el)}>Списать</Button>
        }

        if (el.state === 'TAKEN' && this.props.userInfo && el.testing.user.id === this.props.userInfo.id) {
            return <Button bsStyle="danger journal-btn--size" onClick={() => this.returnDevice(el)}>Сдать</Button>
        } else {
            return 'Девайс занят'
        }

    };



    addComment = (id, comment) => {


        this.props.actionEditDevice(id, comment);
    };

    deleteComment = (id) => {
        let comment = {
            comment: null
        };
        this.props.actionEditDevice(id, comment);
        this.setState({
            comment: null
        });
    };

    sortArray = (obj1, obj2) => {
        if (obj1.createTs < obj2.createTs) return 1;
        if (obj1.createTs > obj2.createTs) return -1;
    };

    renderDate = (date) => {
        let parseDate = new Date(date);
        let minute;
        if(parseDate.getMinutes() < 10) {
            minute = '0' + parseDate.getMinutes();
        } else {
            minute = parseDate.getMinutes();
        }
        let currentDate = parseDate.getDate() + '.' +
            (parseDate.getMonth() + 1) + '.' +
            parseDate.getFullYear() +  ' '
        + parseDate.getHours() + ':'
        + minute;
        let arr = [];
        arr.push(currentDate.toString());
        return arr;
    };
    checkCheckBox = (array, userInfo) => {
        let myDevice = [];
            if(this.state.myDevice) {
                array && userInfo && array.map((el) => {
                    if(el.testing && el.testing.user.login === userInfo.login) {
                        myDevice.push(el);
                    }
                });

                if(myDevice.length !== 0) {
                    return this.renderDevicesTable(myDevice);
                } else {
                    return <tr>
                        <td colspan="7">
                            <div className={'journal-table--no-device'}>
                                <Panel bsStyle="danger">
                                    <Panel.Body>В данный момент у вас в работе нет ниодного устройства</Panel.Body>
                                </Panel>
                            </div>
                        </td>
                    </tr>
                }

            } if(this.state.waitingDevice) {
            array && userInfo && array.map((el) => {
                if(el.state === 'WAIT' && this.props.userInfo.roles[0] === 'Administrators') {
                    myDevice.push(el);
                }
            });

            if(myDevice.length !== 0) {
                return this.renderDevicesTable(myDevice);
            } else {
                return <tr>
                    <td colspan="7">
                        <div className={'journal-table--no-device'}>
                            <Panel bsStyle="danger">
                                <Panel.Body>В данный момент нет ниодного устройства на списание</Panel.Body>
                            </Panel>
                        </div>
                    </td>
                </tr>
            }

        }else {
                return this.renderDevicesTable(array);
            }
    };

    renderDevicesTable = (array) => (Array.isArray(array) && array.sort(this.sortArray).map((el) => {
        return <tr key={el.id} className={'journal--table'}>
            <td className={'journal-device--name-cell'}>{el.name}<Comment el={el}
                                  changeComment={this.changeComment}
                                  addComment={this.addComment}
                                  deleteComment={this.deleteComment}
                                  userInfo={this.props.userInfo}/></td>
            <td>{el.deviceOs.name} {el.description}</td>
            <td>{el.screenResolution}</td>
            <td>{el.state === 'FREE' ? <div className={'device-status-icon--wrap'}><Glyphicon glyph={'ok-circle'}
                                                                                              className={'device-status-icon icon-success'}/>
                </div> :
                el.state === 'TAKEN' ? <div className={'device-status-icon--wrap'}><Glyphicon glyph={'remove-circle'}
                                                                                              className={'device-status-icon success icon-danger'}/>
                    </div> :
                    <div className={'device-status-icon--wrap'}><Glyphicon glyph={'time'}
                                                                           className={'device-status-icon success icon-warning'}/>
                    </div>}</td>
            <td>{el.state === 'TAKEN' ? <div>{el.testing.user.name}</div> : el.state === 'WAIT' ? <div>{el.testing.user.name}</div> : ''} </td>
            <td>{el.state === 'TAKEN' ?
                <div>{this.renderDate(el.testing.startTime)}</div> : ''}</td>
            <td>{this.renderDeviceButton(el)}</td>
        </tr>
    }));

    checkBoxMyDevice = () => {
      this.setState({myDevice: !this.state.myDevice});
    };

    checkWaitingDevice = () => {
        this.setState({waitingDevice: !this.state.waitingDevice});
    };

    render() {
        return (<div className={'content-page-wrap'}>
                <h4 className={'content-title'}>Журнал устройств</h4>
                <div className={'content-box'}>
                    <Checkbox onClick={this.checkBoxMyDevice}>Девайсы на мне</Checkbox>
                    <Checkbox onClick={this.checkWaitingDevice}>Девайсы на списание</Checkbox>
                    <Table>
                        <thead>
                        <tr>
                            <th>Устройство</th>
                            <th>Версия ОС</th>
                            <th>Разрешение экрана</th>
                            <th className={'journal-table--status-caption'}>Статус</th>
                            <th>Взял в работу</th>
                            <th>Дата/Время</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.checkCheckBox(this.props.devices, this.props.userInfo)}
                        </tbody>
                    </Table>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    devices: state.common.devices,
    userInfo: state.common.userInfo
});

export default connect(mapStateToProps, {
    createNewTesting,
    changeStatusToWork,
    changeStatusToFree,
    actionEditDevice,
    actionGetAllDevice
})(Journal);