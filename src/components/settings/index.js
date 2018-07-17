import React from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getDeviceOS, getAllUsers} from "../settings/action";
import SettingDevices from '../settings-devices';
import SettingsContent from '../settings-content';
import {actionGetAllOS, actionGetAllRoles} from '../../common/action';

class Settings extends React.Component {

    componentDidMount() {
        this.props.getDeviceOS();
        /*this.props.actionGetAllDevice();
        this.props.getAllUsers(); */

    }

    render() {
        return (<div className={'content-page-wrap'}>
                <h4 className={'content-title'}>Настройки</h4>
                <div className={'content-box'}>
                    <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Пользователи">
                            <SettingsContent
                                buttonTitle={'Добавить пользователя'}
                                tableColumn={['Логин', 'ФИО', 'Роль', 'email', '']}
                                getRequiredData={this.props.getAllUsers}
                                tableContent={this.props.users}
                                model={['login', 'name', 'roles','','btn']}
                            />
                        </Tab>
                        <Tab eventKey={2} title="Девайсы">
                            <SettingDevices/>
                        </Tab>
                        <Tab eventKey={3} title="Роли">
                            <SettingsContent
                                buttonTitle={'Добавить роль'}
                                tableColumn={['Роль', '']}
                                getRequiredData={this.props.actionGetAllRoles}
                                tableContent={this.props.roles}
                                model={['name', 'btn']}
                            />
                        </Tab>
                        <Tab eventKey={4} title="Операционые системы">
                            <SettingsContent
                                buttonTitle={'Добавить ОС'}
                                tableColumn={['Операционная система', '']}
                                getRequiredData={this.props.actionGetAllOS}
                                tableContent={this.props.deviceOS}
                                model={['name', 'btn']}
                            />
                        </Tab>

                    </Tabs>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    deviceOS: state.common.os,
    userInfo: state.common.userInfo,
    devices: state.common.devices,
    roles: state.common.roles,
    users: state.settings.users
});

/*const mapDispatchToProps = (dispatch) => ({
  getUserCredential: () => getUserCredential(dispatch)

});*/
export default connect(mapStateToProps, {
    getDeviceOS,
    actionGetAllOS,
    getAllUsers,
    actionGetAllRoles
    /* actionGetAllDevice,
    actionAddNewDevice,
    actionDeleteDevice,
    actionEditDevice,
    actionAddNewUser */
})(Settings);