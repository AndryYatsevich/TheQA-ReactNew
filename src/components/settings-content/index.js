import React from 'react';
import {Button, Table, Glyphicon, Modal, FormGroup, ControlLabel, FormControl, Tooltip, OverlayTrigger} from 'react-bootstrap';
import services from "../../common/services";
import commonAction from "../../common/constants";

class SettingsContent extends React.Component {
    constructor(props) {
        super(props);
        this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
        this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
        this.handleCloseResetModal = this.handleCloseResetModal.bind(this);
        this.handleCloseDeleteCommentModal = this.handleCloseDeleteCommentModal.bind(this);
        this.state = {
            showAddModal: false,
            showDeleteModal: false,
            editingDevice: false,
            showResetModal: false,
            showDeleteCommentModal: false
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
        let state = {
            showAddModal: false,
            editingEntity: false,
            editingEntityId: false
        };
        for (let i = 0; i < this.props.entityField.length; i++) {
                    state[this.props.entityField[i]] = null;
        }
        this.setState(state);
    }

    handleShowEditModal(el) {
        let state = {
            showAddModal: true,
            editingEntity: true,
            editingEntityId: el.id
        };
        for (let i = 0; i < this.props.entityField.length; i++) {
            for (let key in el) {
                if (key === this.props.entityField[i] && this.props.entityField[i] !== 'deviceOs') {
                    state[key] = el[key]
                }
            }
            if(this.props.entityField[i] === 'deviceOs') {
                state['deviceOs'] = el.deviceOs.id;
            }
        }
        this.setState(state);
    }

    handleShowDeleteModal(el) {
        this.setState({
            showDeleteModal: true,
            deletedEntityName: el.name,
            deletedEntityId: el.id
        });
    }

    handleCloseDeleteModal() {
        this.setState({showDeleteModal: false});
    }

    handleShowDeleteCommentModal(el) {
        this.setState({
            showDeleteCommentModal: true,
            comment: el.comment,
            id: el.id
        });
    }

    handleCloseDeleteCommentModal() {
        this.setState({showDeleteCommentModal: false});
    }

    handleShowResetModal(el) {
        console.log(el);
        this.setState({
            showResetModal: true,
            deviceStatus: el.state,
            name: el.testing.user.name,
            deviceTestingId: el.testing.id,
            deviceId: el.id
        });
    }

    handleCloseResetModal() {
        this.setState({showResetModal: false});
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

    modalFieldDefaultValue = (el) => {
        return this.state[el];
    };

    addEntity = () => {
        let entity = {};
        let state ={
            showAddModal: false,
        };

        for (let i = 0; i < this.props.entityField.length; i++) {
            for (let key in this.state) {

                if (key === this.props.entityField[i]) {
                    entity[this.props.entityField[i]] = this.state[this.props.entityField[i]]
                }
            }
        }
        if (this.props.entityType === 'device') {
            entity['deviceOs'] = {
                _entityName: "testersjournal$OperationSystem",
                id: this.state.deviceOs,
            };
            entity['state'] = 'FREE';
        }
        if(this.props.entityType === 'user') {
entity['role'] = {
    id: this.state.role
}

        };

        this.props.addEntityAction(entity, this.props.path, this.props.entityType);
        for (let i = 0; i < this.props.entityField.length; i++) {
            state[this.props.entityField[i]] = null;
        }
        this.setState(state);
    };

    acceptEditEntity = () => {
        let entity = {};
        let state ={
            showAddModal: false,
            editingEntity: false,
            editingEntityId: false
        };
        for (let i = 0; i < this.props.entityField.length; i++) {
            for (let key in this.state) {
                if (key === this.props.entityField[i] && key !== 'deviceOs') {
                    entity[this.props.entityField[i]] = this.state[this.props.entityField[i]]
                }
            }
        }

        if (this.props.entityType === 'device') {
            entity['deviceOs'] = {
                _entityName: "testersjournal$OperationSystem",
                id: this.state.deviceOs,
            };
            entity['state'] = 'FREE';
        }
        if (this.props.entityType === 'user') {
            this.props.editEntityAction(
                entity,
                '/v2/entities/sec$User',
                this.state.editingEntityId,
                this.props.entityType)
        } else {
            this.props.editEntityAction(
                entity,
                this.props.path,
                this.state.editingEntityId,
                this.props.entityType
            );
        }



        for (let i = 0; i < this.props.entityField.length; i++) {
            state[this.props.entityField[i]] = null;
        }
        this.setState(state);
    };

    deleteEntity = () => {
        if (this.props.entityType === 'user') {
            this.props.deleteEntityAction(
                '/v2/entities/sec$User',
                this.state.deletedEntityId,
                this.props.entityType);
        } else {
            this.props.deleteEntityAction(
                this.props.path,
                this.state.deletedEntityId,
                this.props.entityType);
        }


        this.handleCloseDeleteModal();
    };

    renderTableCell = (el, model) => {
        const tooltipEdit = (
            <Tooltip id="tooltip">
                Редактировать
            </Tooltip>
        );
        const tooltipDelete = (
            <Tooltip id="tooltip">
                Удалить
            </Tooltip>
        );
        const tooltipRefreshPassword =(
            <Tooltip id="tooltip">
                Сбросить пароль
            </Tooltip>
            );
        const tooltipDeleteComment = (
            <Tooltip id="tooltip">
                Комментарий
            </Tooltip>
            );
        const tooltipRefreshStatus = (
            <Tooltip id="tooltip">
                Сбрость статус
            </Tooltip>
        );
        let tableRow = [];
        for (let i = 0; i < model.length; i++) {
        for (let key in el) {
                if (model[i] === key) {
                    tableRow.push(<td>{el[key]}</td>);
                } else if ( typeof model[i] === 'object'){
                    for (let keyObj in model[i]) {
                        if(keyObj === key) {
                            tableRow.push(<td>{el[keyObj].name} {el.description}</td>);
                        }
                    }
                }
            }
        }

        if (model[model.length - 1] === 'btn') {
            tableRow.push(<td>
                <div className={'settings-btn'}>
                    {this.props.entityType === 'device' && el.comment ?
                        <OverlayTrigger placement="top" overlay={tooltipDeleteComment}>
                            <Glyphicon glyph={'tag'}
                                       className={'settings--icon'}
                                       onClick={() => this.handleShowDeleteCommentModal(el)}/>
                        </OverlayTrigger>: ''}
                    {this.props.entityType === 'device' && el.state !== 'FREE' ?
                        <OverlayTrigger placement="top" overlay={tooltipRefreshStatus}>
                            <Glyphicon glyph={'refresh'}
                                       className={'settings--icon'}
                                       onClick={() => this.handleShowResetModal(el)}/>
                        </OverlayTrigger>: ''}
                    <OverlayTrigger placement="top" overlay={tooltipEdit}>
                        <Glyphicon glyph={'edit'}
                               className={'settings--icon '}
                               onClick={() => this.handleShowEditModal(el)}/>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={tooltipDelete}>
                        <Glyphicon glyph={'trash'}
                               className={'settings--icon'}
                               onClick={() => this.handleShowDeleteModal(el)}/>
                    </OverlayTrigger>
                    {this.props.entityType === 'user' ?
                        <OverlayTrigger placement="top" overlay={tooltipRefreshPassword}>
                            <Glyphicon glyph={'refresh'}
                                   className={'settings--icon'}
                                   onClick={() => this.refreshUserPassword(el)}/>
                    </OverlayTrigger>: ''}
                </div>
            </td>);
        }
        return tableRow;
    };

    refreshUserPassword = (el) => {
        console.log(el);
        let data = {
            newPassword: 'pass',
            userId: el.id
        };

        fetch('http://localhost:8080/app/rest/api/changePassword', {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.text();
    })
    };

    sortArray = (obj1, obj2) => {
        if (obj1.createTs < obj2.createTs) return 1;
        if (obj1.createTs > obj2.createTs) return -1;
    };

    tableContentRender = (array, model) => (array && array.sort(this.sortArray).map((el, key) => {
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
                    label="takoe"
                    onChange={(e) => this.modalOptionHandler(e, el)}>

                    <option value="" />
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
                    defaultValue={this.modalFieldDefaultValue(el.handler)}
                    onChange={(e) => this.modalFieldHandler(e, el.handler)}
                />
            </FormGroup>)
    }));

    renderOptionField = (array) => (array && array.map((el, key) => {
        return <option value={el.id} key={key}>{el.name}</option>
    }));

    renderComment = () => {

        if(this.state.comment) {
            let message = this.state.comment.split(',');
            let messageWithoutAuthor = [];
            for (let i = 0; i < message.length - 1; i++) {
                messageWithoutAuthor.push(message[i]);
            }

        return <div>
            <p> Комментарий: <b>"{messageWithoutAuthor.toString()}"</b></p><br/>
            <p>Автор: <b>{message[message.length-1]}</b></p>
            <br/>
        </div>
        }
    };

    resetStatus = () => {

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
        this.setState({
            showResetModal: false
        });
    this.props.resetDeviceStatus(testing, this.state.deviceTestingId, this.state.deviceId)
    };

    deleteComment = () => {
        this.setState({
            showDeleteCommentModal: false
        });
        this.props.editEntityAction(
            {
                comment: null
            },
            '/v2/entities/testersjournal$Device',
            this.state.id,
            this.props.entityType)
    };

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
                        {this.state.editingEntity ?
                            <Button bsStyle="success" onClick={this.acceptEditEntity}>Сохранить изменения</Button> :
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
                {/*модалка сброса статуса девайса*/}
                <Modal show={this.state.showResetModal} onHide={this.handleCloseResetModal}>
                    <Modal.Header>
                        <Modal.Title>Сброс статуса девайса</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {this.state.deviceStatus === 'TAKEN' ?
                            <div>В данный момент девайс находится в работе у <b>{this.state.name}</b>, вы действительо хотите сбросить статус?</div> :
                            <div>В данный момент девайс ожидает списания. Вы действительно хотите сбросить статус?</div>}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle={'warning'}
                                onClick={() => this.resetStatus()}>
                            Сбросить
                        </Button>
                        <Button bsStyle="default" onClick={this.handleCloseResetModal}>Отмена</Button>
                    </Modal.Footer>
                </Modal>
                {/*модалка подтверждения удаления комментария*/}
                <Modal show={this.state.showDeleteCommentModal} onHide={this.handleCloseDeleteCommentModal}>
                    <Modal.Header>
                        <Modal.Title>Комментарий к девайсу</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>{this.renderComment()}</Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle={'warning'}
                                onClick={() => this.deleteComment()}>
                            Удалить
                        </Button>
                        <Button bsStyle="default" onClick={this.handleCloseDeleteCommentModal}>Отмена</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

export default SettingsContent;