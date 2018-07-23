import React from 'react';
import {changeStatusToWork, createNewTesting, changeStatusToFree} from './action';
import {actionEditDevice, actionGetAllDevice} from '../../common/action';
import {Table, Button, Glyphicon} from 'react-bootstrap';
import {connect} from "react-redux";
import Comment from '../comment';

class Journal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: null
        };
    }
    componentDidMount() {
        if (localStorage.getItem('token')) this.props.actionGetAllDevice();

            setInterval(() => {
                this.props.actionGetAllDevice();
                console.log('work');
            },10000);
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
            startTime: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds()
        };
        console.log('testing: ', testing);

        this.props.createNewTesting(testing, el.id);
    };

    returnDevice =(el) => {
        console.log('returnDevice', el);
        let date = new Date();
        let testing = {
            endTime: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds()
        };
        this.props.changeStatusToWork(el, testing);
    };

    acceptAdmin =(el) => {
        console.log(el);
        this.props.changeStatusToFree(el);
    };


    renderDeviceButton = (el) => {
        console.log('renderDeviceButton-------',el);
        if (el.state === 'FREE') {
            return <Button bsStyle="success" onClick={() => this.takeToWork(el)}>Взять в работу</Button>
        }

        if (el.state === 'WAIT' && this.props.userInfo && this.props.userInfo.roles[0] !== 'Administrators') {
            return <div>Ожидает списания</div>

        } else if(el.state === 'WAIT' && this.props.userInfo && this.props.userInfo.roles[0] === 'Administrators') {
            return <Button bsStyle="danger" onClick={() => this.acceptAdmin(el)}>Списать</Button>
        }

        if(el.state === 'TAKEN' && this.props.userInfo && el.testing.user.id === this.props.userInfo.id) {
            return <Button bsStyle="warning" onClick={() => this.returnDevice(el)}>Сдать</Button>
        } else {
            return <p>Девайс занят</p>
        }

    };

    changeComment = (e) => {
        console.log(this.state.comment);
        this.setState({comment: e.target.value});
    };

    addComment = (id) => {
        let comment = {
            comment: this.state.comment
        };

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
    renderDevicesTable = (array) => (array && array.sort(this.sortArray).map((el) => {

        return <tr key={el.id}>
            <td>{el.name}</td>
            <td>{el.deviceOs.name} {el.description}</td>
            <td>{el.screenResolution}</td>
            <td>{el.state === 'FREE' ? <div className={'device-status-icon--wrap'}> <Glyphicon glyph={'ok-circle'} className={'device-status-icon icon-success'}/></div> :
                el.state === 'TAKEN' ? <div className={'device-status-icon--wrap'}><Glyphicon glyph={'remove-circle'} className={'device-status-icon success icon-danger'}/></div> :
                    <div className={'device-status-icon--wrap'}>  <Glyphicon glyph={'time'} className={'device-status-icon success icon-warning'}/></div>}</td>
            <td>{el.state === 'TAKEN' ? <div>{el.testing.user.name}</div> : ''} </td>
            <td>{el.state === 'TAKEN' ? <div>{el.testing.startTime} {Date.parse(el.testing.startTime)}</div> : ''}</td>
            <td><Comment el={el}
                                changeComment={this.changeComment}
                                addComment={this.addComment}
                                deleteComment={this.deleteComment}
                                userInfo={this.props.userInfo}/></td>
            <td>{this.renderDeviceButton(el)}</td>
        </tr>
    }));

    render() {
        return (<div className={'content-page-wrap'}>
                <h4 className={'content-title'}>Журнал устройств</h4>
                <div className={'content-box'}>
            <Table responsive>
                <thead>
                <tr>
                    <th>Устройство</th>
                    <th>Версия ОС</th>
                    <th>Разрешение экрана</th>
                    <th>Статус</th>
                    <th>Взял в работу</th>
                    <th>Дата/Время</th>
                    <th>Комментарий</th>
                </tr>
                </thead>
                <tbody>
                {this.renderDevicesTable(this.props.devices)}
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