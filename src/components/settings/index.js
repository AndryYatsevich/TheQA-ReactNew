import React from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getDeviceOS, getAllUsers} from "../settings/action";
import SettingDevices from '../settings-devices';
import SettingsContent from '../settings-content';
import {actionGetAllOS, actionGetAllRoles, actionAddNewEntity, actionDeleteEntity, actionEditEntity, actionGetAllDevice} from '../../common/action';

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
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Пользователи">
                            <SettingsContent
                                buttonTitle={'Добавить пользователя'}
                                tableColumn={['Логин', 'ФИО', 'Роль', 'email', '']}
                                getRequiredData={this.props.getAllUsers}
                                tableContent={this.props.users}
                                model={['login', 'name', 'roles','','btn']}
                                addEntity={'Добавить нового пользователя'}
                                editEntity={'Редактирование пользователя'}
                                deleteEntity={'Удаление пользователя'}

                                modalField={[
                                    {
                                        title: 'Логин',
                                        placeholder: 'Введите логин',
                                        handler: 'login'
                                    },
                                    {
                                        title: 'Пароль',
                                        placeholder: 'Введите пароль',
                                        handler: 'password'
                                    },
                                    {
                                        title: 'ФИО',
                                        placeholder: 'Введите ФИО',
                                        handler: 'fio'
                                    },
                                    {
                                        title: 'Email',
                                        placeholder: 'Введите email',
                                        handler: 'email'
                                    },
                                    {
                                        type: 'options',
                                        title: 'Выберите роль',
                                        options: this.props.roles,
                                        handler: 'roleValue'
                                    }
                                ]}
                            />
                        </Tab>
                        <Tab eventKey={2} title="Девайсы">
                            <SettingsContent
                                buttonTitle={'Добавить девайс'}
                                tableColumn={['Устройство', 'Версия ОС', 'Разрешение экрана', 'Комментарий','']}
                                getRequiredData={this.props.actionGetAllDevice}
                                tableContent={this.props.devices}
                                model={['name',{deviceOs: 'name'}, 'screenResolution', 'comment',  'btn']}
                                addEntity={'Добавить девайс'}
                                editEntity={'Редактирование девайса'}
                                deleteEntity={'Удаление девайса'}
                                addEntityAction={this.props.actionAddNewEntity}
                                deleteEntityAction={this.props.actionDeleteEntity}
                                editEntityAction={this.props.actionEditEntity}
                                entityField = {['name', 'description', 'screenResolution', 'deviceOs']}
                                path={'testersjournal$Device'}
                                entityType={'device'}
                                modalField={[
                                    {
                                        title: 'Название устройства',
                                        placeholder: 'Введите название устройства',
                                        handler: 'name'
                                    },
                                    {
                                        title: 'Операционная система',
                                        type: 'options',
                                        options: this.props.deviceOS,
                                        handler: 'deviceOs'
                                    },
                                    {
                                        title: 'Версия операционной системы',
                                        placeholder: 'Введите версию ОС',
                                        handler: 'description'
                                    },
                                    {
                                        title: 'Разрешение экрана',
                                        placeholder: 'Введите разрешение экрана',
                                        handler: 'screenResolution'
                                    },

                                ]}
                            />
                        </Tab>
                        <Tab eventKey={3} title="Роли">
                            <SettingsContent
                                buttonTitle={'Добавить роль'}
                                tableColumn={['Роль', '']}
                                getRequiredData={this.props.actionGetAllRoles}
                                tableContent={this.props.roles}
                                model={['name', 'btn']}
                                addEntity={'Добавить роль'}
                                editEntity={'Редактирование роли'}
                                deleteEntity={'Удаление роли'}
                                addEntityAction={this.props.actionAddNewEntity}
                                deleteEntityAction={this.props.actionDeleteEntity}
                                editEntityAction={this.props.actionEditEntity}
                                entityField = {['name']}
                                path={'sec$Role'}
                                entityType={'role'}
                                modalField={[
                                    {
                                        title: 'Роль',
                                        placeholder: 'Введите роль',
                                        handler: 'name'
                                    }
                                ]}
                            />
                        </Tab>
                        <Tab eventKey={4} title="Операционые системы">
                            <SettingsContent
                                buttonTitle={'Добавить ОС'}
                                tableColumn={['Операционная система', '']}
                                getRequiredData={this.props.actionGetAllOS}
                                tableContent={this.props.deviceOS}
                                model={['name', 'btn']}
                                addEntity={'Добавить операционную систему'}
                                editEntity={'Редактировать операционную систему'}
                                deleteEntity={'Удаление операционной системы'}
                                addEntityAction={this.props.actionAddNewEntity}
                                deleteEntityAction={this.props.actionDeleteEntity}
                                editEntityAction={this.props.actionEditEntity}
                                entityField = {['name']}
                                path={'testersjournal$OperationSystem'}
                                entityType={'os'}
                                modalField={[
                                    {
                                        title: 'Операционная система',
                                        placeholder: 'Введите название ОС',
                                        handler: 'name'
                                    }
                                    ]}
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
    actionGetAllDevice,
    getDeviceOS,
    actionGetAllOS,
    getAllUsers,
    actionGetAllRoles,
    actionAddNewEntity,
    actionDeleteEntity,
    actionEditEntity
    /* actionGetAllDevice,
    actionAddNewDevice,
    actionDeleteDevice,
    actionEditDevice,
    actionAddNewUser */
})(Settings);