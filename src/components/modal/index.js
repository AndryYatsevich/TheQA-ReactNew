import React from 'react';
import {Button, Table, Glyphicon, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

/*import {Grid, Row, Col} from 'react-flexbox-grid';*/

class MyModal extends React.Component {
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

    renderAddModal = (array) => (array && array.map(el => {
        console.log(el, el.type === 'options');
        return (el.type === 'options' ?
            <FormGroup
                controlId="formBasicText">
                <ControlLabel>Операционная система:</ControlLabel>
                <FormControl
                    componentClass="select"
                    placeholder="select"
                    onChange={this.changeOS}>
                    <option disabled>Выберите ОС</option>
                    {this.renderOptionField(this.props.options) }
                </FormControl>
            </FormGroup>
            :
            <FormGroup
                controlId="formBasicText"
            >
                <ControlLabel>{el.title}</ControlLabel>
                <FormControl
                    type="text"
                    placeholder={el.placeholder}
                    onChange={this.changeDeviceTitle}
                />
            </FormGroup>)
    }));

    renderOptionField = (array) => (array && array.map((el, key) => {
        return <option value={el.id} key={key}>{el.name}</option>
    }));

    render() {
        let modal = null;

        if (this.state.modalType === 'add' || this.state.modalType === 'edit') {
            modal = <Modal show={this.props.show} onHide={this.handleCloseAddModal}>
                {/*модалка добавления новго девайса */}
                <Modal.Header closeButton>
                    {this.state.editingDevice ?
                        <Modal.Title>{this.props.editEntity}</Modal.Title> :
                        <Modal.Title>{this.props.addEntity}</Modal.Title>}
                </Modal.Header>

                <Modal.Body>
                    <form>
                        {this.renderAddModal(this.props.modalField)}
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.handleClose}>Закрыть</Button>
                    {this.state.editingDevice ?
                        <Button bsStyle="success" onClick={this.acceptEditDevice}>Сохранить изменения</Button> :
                        <Button bsStyle="success" onClick={this.addDevice}>Добавить</Button>}
                </Modal.Footer>
            </Modal>
        } else {
            modal = <Modal show={this.state.showDeleteModal} onHide={this.handleCloseDeleteModal}>
                <Modal.Header>
                    <Modal.Title>{this.props.deleteEntity}</Modal.Title>
                </Modal.Header>

                <Modal.Body>Вы действительно хотите удалить <b>{this.state.deletedDeviceName}</b>?</Modal.Body>

                <Modal.Footer>
                    <Button bsStyle={'warning'} onClick={this.deleteDevice}>Удалить</Button>
                    <Button bsStyle="default" onClick={this.handleCloseDeleteModal}>Отмена</Button>
                </Modal.Footer>
            </Modal>
        }

        return (
            <modal/>
        );
    }
}

export default MyModal;