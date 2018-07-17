import React from 'react';
import {Button, Table, Glyphicon, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getDeviceOS} from '../settings/action';
import {actionAddNewDevice, actionDeleteDevice, actionEditDevice} from '../../common/action';


class SettingsDevices extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
        this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
        this.state = {
            showAddModal: false,
            showDeleteModal: false,
            editingDevice: false,
            value: null,
            deviceTitle: null,
            description: null,
            screenResolution: null
        };
    }

    componentDidMount() {
        this.props.getDeviceOS();
        /*this.props.actionGetAllDevice();
        this.props.getAllUsers(); */

    }

    handleShowAddModal() {
        this.setState({showAddModal: true});
    }

    handleCloseAddModal() {
        this.setState({
            showAddModal: false,
            editingDevice: false,
            value: null,
            deviceTitle: null,
            description: null,
            screenResolution: null
        });
    }

    handleShowEditModal(el) {
        console.log(el);
        this.setState({
            showAddModal: true,
            editingDevice: true,
            editingDeviceId: el.id,
            deviceTitle: el.name,
            value: el.deviceOs.id,
            description: el.description,
            screenResolution: el.screenResolution
        });
    }

    handleShowDeleteModal(el) {
        this.setState({
            showDeleteModal: true,
            deletedDeviceName: el.name,
            deletedDeviceId: el.id
        });
    }

    handleCloseDeleteModal() {
        this.setState({showDeleteModal: false});
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
                           className={'settings--icon '}
                           onClick={() => this.handleShowEditModal(el)}/>

                <Glyphicon glyph={'trash'}
                           className={'settings--icon'}
                           onClick={() => this.handleShowDeleteModal(el)}/>
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
        this.props.actionAddNewDevice(device);
        this.setState({
            showAddModal: false,
            deviceTitle: '',
            description: '',
            screenResolution: '',
            value: false,
        })
    };

    acceptEditDevice = () => {
        let device = {
            description: this.state.description,
            deviceOs: {
                _entityName: "testersjournal$OperationSystem",
                id: this.state.value,
            },
            name: this.state.deviceTitle,
            screenResolution: this.state.screenResolution,
        };
        this.props.actionEditDevice(this.state.editingDeviceId, device);
        this.setState({
            showAddModal: false,
            editingDevice: false,
            value: null,
            deviceTitle: null,
            description: null,
            screenResolution: null,
            editingDeviceId: false,
        });
        console.log(this.state);
    };

    deleteDevice = () => {
        this.props.actionDeleteDevice(this.state.deletedDeviceId);
        this.handleCloseDeleteModal();
    };

    render() {
        return (<div>
                <Button bsStyle="success"
                        className={'btn-new-entity'}
                        onClick={() => this.handleShowAddModal()}>Добавить новый девайс</Button>
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
                {/*модалка добавления новго девайса */}
                <Modal show={this.state.showAddModal} onHide={this.handleCloseAddModal}>

                    <Modal.Header closeButton>
                        {this.state.editingDevice ?
                            <Modal.Title>Редактирования девайса</Modal.Title> :
                            <Modal.Title>Новый девайс</Modal.Title>}
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
                                    defaultValue={this.state.deviceTitle}
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
                                    <option disabled>Выберите ОС</option>
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
                                    defaultValue={this.state.description}
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
                                    defaultValue={this.state.screenResolution}
                                    onChange={this.changeScreenResolution}
                                />

                            </FormGroup>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Закрыть</Button>
                        {this.state.editingDevice ?
                            <Button bsStyle="success" onClick={this.acceptEditDevice}>Сохранить изменения</Button> :
                            <Button bsStyle="success" onClick={this.addDevice}>Добавить</Button>}
                    </Modal.Footer>
                </Modal>
                {/*модалка подтверждения удаления девайса */}
                <Modal show={this.state.showDeleteModal} onHide={this.handleCloseDeleteModal}>
                    <Modal.Header>
                        <Modal.Title> Удаление девайса</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Вы действительно хотите удалить <b>{this.state.deletedDeviceName}</b>?</Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle={'warning'} onClick={this.deleteDevice}>Удалить</Button>
                        <Button bsStyle="default" onClick={this.handleCloseDeleteModal}>Отмена</Button>
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
