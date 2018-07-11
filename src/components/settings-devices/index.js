import React from 'react';
import {Button, Table, Glyphicon, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getDeviceOS} from '../settings/action';
import {actionAddNewDevice, actionDeleteDevice, actionEditDevice} from '../../common/action';

class SettingsDevices extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            value: null
        };
    }

    componentDidMount() {
        this.props.getDeviceOS();
        /*this.props.actionGetAllDevice();
        this.props.getAllUsers(); */

    }

    handleShow() {
        this.setState({show: true});
    }

    handleClose() {
        this.setState({show: false});
    }

    changeDeviceTitle = (e) => {
        this.setState({deviceTitle: e.target.value});
    };

    changeOS = (event) => {
        console.log(event.target.value);
        this.setState({value: event.target.value})
    };

    changeDescription = (e) => {
        this.setState({description: e.target.value});
    };

    changeScreenResolution = (e) => {
        this.setState({screenResolution: e.target.value});
    };

    renderDevicesTable = (array) => (array && array.sort(this.sortArray).map((el, key) => {
        return (<tr key={key}>
            <td>{el.name}</td>
            <td>{el.deviceOs.name} {el.description}</td>
            <td>{el.screenResolution}</td>
            <td> {el.comment}</td>
            <td>
                <Glyphicon glyph={'edit'}
                           className={'side-menu--icon'}
                           onClick={() => this.editDevice(el)}/>

                <Glyphicon glyph={'trash'}
                           className={'side-menu--icon'}
                           onClick={() => this.deleteDevice(el.id)}/>
            </td>
        </tr>)
    }));

    renderOsSelectedField = (array) => (array && array.map((el, key) => {
        return <option value={el.id} key={key}>{el.name}</option>
    }));

    addDevice = () => {


        let device = {
            description: this.state.description,
            deviceOs: {
                _entityName: "testersjournal$OperationSystem",

                id: this.state.value,
            },
            name: this.state.deviceTitle,
            screenResolution: this.state.screenResolution,
            state: 'FREE'
        };
        console.log('device -------------------------> ', device);
        this.props.actionAddNewDevice(device);
        this.setState({
            show: false,
            deviceTitle: '',
            description: '',
            screenResolution: '',
            value: false,
        })
    };

    render() {
        return (<div>
                <Button bsStyle="success"
                        className={'btn-new-entity'}
                        onClick={() => this.handleShow()}>Добавить новый девайс</Button>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Устройство</th>
                        <th>Версия ОС</th>
                        <th>Разрешение экрана</th>
                        <th>Комментарий</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderDevicesTable(this.props.devices)}
                    </tbody>
                </Table>
                <Modal show={this.state.show} onHide={this.handleClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>Новый девайс</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>
                            <FormGroup
                                controlId="formBasicText"
                            >
                                <ControlLabel>Название устройства:</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Введите название устройства"
                                    onChange={this.changeDeviceTitle}
                                />
                            </FormGroup>
                            <FormGroup
                                controlId="formBasicText">
                                <ControlLabel>Операционная система:</ControlLabel>
                                <FormControl
                                    componentClass="select"
                                    placeholder="select"
                                    onChange={this.changeOS}>
                                    <option disabled>Выберите героя</option>
                                    {this.renderOsSelectedField(this.props.deviceOS)}
                                </FormControl>
                            </FormGroup>
                            <FormGroup
                                controlId="formBasicText"
                            >
                                <ControlLabel>Версия ОС:</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Введите версию ОС"
                                    onChange={this.changeDescription}
                                />

                            </FormGroup>
                            <FormGroup
                                controlId="formBasicText"
                            >
                                <ControlLabel>Разрешение экрана:</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Введите разрешение экрана"
                                    onChange={this.changeScreenResolution}
                                />

                            </FormGroup>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Закрыть</Button>
                        <Button bsStyle="success" onClick={this.addDevice}>Добавить</Button>
                    </Modal.Footer>

                </Modal>

            </div>


        );
    }
}

const mapStateToProps = (state) => ({
    deviceOS: state.settings.deviceOS,
    userInfo: state.common.userInfo,
    devices: state.common.devices,

});

export default connect(mapStateToProps, {
    getDeviceOS,
    actionAddNewDevice,
    actionDeleteDevice,
    actionEditDevice
})(SettingsDevices);
