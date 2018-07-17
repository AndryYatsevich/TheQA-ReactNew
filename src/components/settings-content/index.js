import React from 'react';
import {Button, Table, Glyphicon, Modal, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class SettingsContent extends React.Component {
    componentDidMount() {
        console.log('=============>', typeof this.props.getRequiredData);
        this.props.getRequiredData();
        /*this.props.actionGetAllDevice();
        this.props.getAllUsers();
         this.props.getRequiredData();*/

    }

    takoe = (el, model) => {
        let tableRow = [];
        for (let key in el) {
            console.log(key, el[key], '<--------------------------');
            for (let i = 0; i < model.length; i++) {
                console.log(key, el[key], model[i], '<--------------------------');
                if (model[i] === key) {

                    tableRow.push(<td>{el[key]}</td>);
                }
            }
        }

        if (model[model.length - 1] === 'btn') {
            tableRow.push(<td>
                <div  className={'settings-btn'}>
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
        return <tr key={key}>{this.takoe(el, model)}
            {console.log('--------->', typeof el, el, model)}
            {/*{el.map(el1 => {
            return <td>{el1} </td>
        })}*/}</tr>
    }));

    tableColumnRender = (array) => (array && array.map(el => {
        return <th>{el}</th>
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
                {/*<Modal show={this.state.showAddModal} onHide={this.handleCloseAddModal}>

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
                модалка подтверждения удаления девайса
                <Modal show={this.state.showDeleteModal} onHide={this.handleCloseDeleteModal}>
                    <Modal.Header>
                        <Modal.Title> Удаление девайса</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Вы действительно хотите удалить <b>{this.state.deletedDeviceName}</b>?</Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle={'warning'} onClick={this.deleteDevice}>Удалить</Button>
                        <Button bsStyle="default" onClick={this.handleCloseDeleteModal}>Отмена</Button>
                    </Modal.Footer>
                </Modal>*/}
            </div>
        );
    }
}

export default SettingsContent;