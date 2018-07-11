import React from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getDeviceOS} from "../settings/action";
import SettingDevices from '../settings-devices';

class Settings extends React.Component {
    componentDidMount () {
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
                        Tab 1 content
                    </Tab>
                    <Tab eventKey={2} title="Девайсы">
                        <SettingDevices/>
                    </Tab>

                </Tabs>
            </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => ({
    deviceOS: state.settings.deviceOS,
    userInfo: state.common.userInfo,
    devices: state.common.devices,
   /* roles: state.common.roles,
    users: state.settings.users */
});

/*const mapDispatchToProps = (dispatch) => ({
  getUserCredential: () => getUserCredential(dispatch)

});*/
export default connect(mapStateToProps, {
    getDeviceOS,

  /*  getAllUsers,
    actionGetAllDevice,
    actionAddNewDevice,
    actionDeleteDevice,
    actionEditDevice,
    actionAddNewUser */
})(Settings);