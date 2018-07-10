import React from 'react';
import {changeStatusToWork, createNewTesting, changeStatusToFree} from './action';
import {Table, Button} from 'react-bootstrap';
import {connect} from "react-redux";

class Journal extends React.Component {
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
        if(el.state === 'TAKEN' && this.props.userInfo && el.testing.user.id === this.props.userInfo.id) {
            return <Button bsStyle="warning" onClick={() => this.returnDevice(el)}>Сдать</Button>
        }
        if (el.state === 'WAIT' && this.props.userInfo && this.props.userInfo.roles[0] !== 'Administrators') {
            return <div>Ожидает подтверждения администратора</div>

        } else if(el.state === 'WAIT' && this.props.userInfo && this.props.userInfo.roles[0] === 'Administrators') {
            return <Button bsStyle="danger" onClick={() => this.acceptAdmin(el)}>Подтвердить списание</Button>
        }

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
            <td>{this.renderDeviceButton(el)}</td>
            <td>{el.state === 'TAKEN' ? <div>{el.testing.user.name}</div> : ''} </td>
            <td>{el.state === 'TAKEN' ? <div>{el.testing.startTime}</div> : ''}</td>
            <td>{/*<Comment el={el}
                                changeComment={this.changeComment}
                                addComment={this.addComment}
                                deleteComment={this.deleteComment}
                                userInfo={this.props.userInfo}/>*/}</td>
        </tr>
    }));

    render() {
        return (<div className={'content-page-wrap'}>
                <h4 className={'content-title'}>Журнал устройств</h4>
                <div className={'content-box'}>
            <Table responsive>
                {console.log(this.props, '------------------')}
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
    changeStatusToFree
})(Journal);