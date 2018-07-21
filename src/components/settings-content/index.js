import React from 'react';
import {Button, Table, Glyphicon, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class SettingsContent extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
        this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
        this.state = {
            showAddModal: false,
            showDeleteModal: false,
            editingDevice: false
        };
    }

    componentDidMount() {
        this.props.getRequiredData();
        /*this.props.actionGetAllDevice();
        this.props.getAllUsers();
         this.props.getRequiredData();*/

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
        let state = {
            showAddModal: true,
            editingDevice: true,
        };


        /*this.setState({
            showAddModal: true,
            editingDevice: true,
        });*/
        for (let i = 0; i < this.props.entityField.length; i++) {
            console.log(i);
            for (let key in el) {
                console.log(key, this.props.entityField[i], 'TAKOE????');
                if (key === this.props.entityField[i]) {
                    console.log('TAKOE!!!!');
                    state[key] = el[key]
                }
            }
        }
        console.log(el, state);
        this.setState(state);
    }

    handleShowDeleteModal(el) {
        this.setState({
            showDeleteModal: true,
            deletedEntityName: el.name,
            deletedEntityId: el.id
        });
        console.log(this.state, 'handleShowDeleteModal <<<');
    }

    handleCloseDeleteModal() {
        this.setState({showDeleteModal: false});
    }


    modalFieldHandler = (el, title) => {
        let obj = {};
        obj[title] = el.target.value;
        this.setState(obj);
        console.log(this.state);
    };

    modalOptionHandler = (e, el) => {
        let obj = {};
        obj[el.handler] = e.target.value;
        this.setState(obj);
    };

    addEntity = () => {
        let entity = {};
        for (let i = 0; i < this.props.entityField.length; i++) {
            for (let key in this.state) {
                if (key === this.props.entityField[i]) {
                    entity[this.props.entityField[i]] = this.state[this.props.entityField[i]]
                }
            }
        }

        console.log(this.props, typeof this.props.addEntityAction, '---------------------<<<<', entity);
        this.props.addEntityAction(entity, this.props.path, this.props.entityType);
        this.setState({
            showAddModal: false,
            deviceTitle: '',
            description: '',
            screenResolution: '',
            value: false,
        })
    };

    deleteEntity = () => {
        this.props.deleteEntityAction(
            this.props.path,
            this.state.deletedEntityId,
            this.props.entityType);
        this.handleCloseDeleteModal();
    };

    renderTableCell = (el, model) => {
        let tableRow = [];
        for (let key in el) {
            for (let i = 0; i < model.length; i++) {
                if (model[i] === key) {
                    tableRow.push(<td>{el[key]}</td>);
                }
            }
        }

        if (model[model.length - 1] === 'btn') {
            tableRow.push(<td>
                <div className={'settings-btn'}>
                    <Glyphicon glyph={'edit'}
                               className={'settings--icon '}
                               onClick={() => this.handleShowEditModal(el)}/>

                    <Glyphicon glyph={'trash'}
                               className={'settings--icon'}
                               onClick={() => this.handleShowDeleteModal(el)}/>
                </div>
            </td>);
        }
        return tableRow;
    };

    tableContentRender = (array, model) => (array && array.map((el, key) => {
        return <tr key={key}>{this.renderTableCell(el, model)}</tr>
    }));

    tableColumnRender = (array) => (array && array.map(el => {
        return <th>{el}</th>
    }));

    renderAddModal = (array) => (array && array.map(el => {
        return (el.type === 'options' ?
            <FormGroup
                controlId="formBasicText">
                <ControlLabel>{el.title}</ControlLabel>
                <FormControl
                    componentClass="select"
                    placeholder="select"
                    onChange={(e) => this.modalOptionHandler(e, el)}>
                    <option disabled>Выберите ОС</option>
                    {this.renderOptionField(el.options)}
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
                    onChange={(e) => this.modalFieldHandler(e, el.handler)}
                />
            </FormGroup>)
    }));

    renderOptionField = (array) => (array && array.map((el, key) => {
        return <option value={el.id} key={key}>{el.name}</option>
    }));

    render() {
        return (<div>
                <Button bsStyle="success"
                        className={'btn-new-entity'}
                        onClick={() => this.handleShowAddModal()}>{this.props.buttonTitle}</Button>
                <Table responsive>
                    <thead>
                    <tr>
                        {this.tableColumnRender(this.props.tableColumn)}
                    </tr>
                    </thead>
                    <tbody>
                    {this.tableContentRender(this.props.tableContent, this.props.model)}
                    </tbody>
                </Table>
                {/*модалка добавления новго девайса */}
                <Modal show={this.state.showAddModal} onHide={this.handleCloseAddModal}>

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
                            <Button bsStyle="success" onClick={this.addEntity}>Добавить</Button>}
                    </Modal.Footer>
                </Modal>
                {/*модалка подтверждения удаления девайса*/}
                <Modal show={this.state.showDeleteModal} onHide={this.handleCloseDeleteModal}>
                    <Modal.Header>
                        <Modal.Title>{this.props.deleteEntity}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Вы действительно хотите удалить <b>{this.state.deletedEntityName}</b>?</Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle={'warning'}
                                onClick={this.deleteEntity}>
                            Удалить
                        </Button>
                        <Button bsStyle="default" onClick={this.handleCloseDeleteModal}>Отмена</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default SettingsContent;