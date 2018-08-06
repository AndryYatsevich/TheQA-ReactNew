import React from 'react';
import {Button, Glyphicon, FormControl, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';

class Comment extends React.Component {
    constructor (props) {
        super(props);
        this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
        this.handleCloseCommentModal = this.handleCloseCommentModal.bind(this);
        this.state = {
            editingComment: false,
            showEditModal: false,
            showCommentModal: false
        }
    }


    handleShowEditModal() {
        this.setState({
            showEditModal: true,
        });
    }
    handleShowCommentModal() {
        this.setState({
            showCommentModal: true,
        });
    }

    handleCloseEditModal() {
        this.setState({
            showEditModal: false,
            editingComment: false,
        });
    }
    handleCloseCommentModal() {
        this.setState({
            showCommentModal: false
        });
    }

    editingComment = () => {
        this.handleShowEditModal();
        this.setState({
            editingComment: true
        })
    };
    cancelEditingComment = () => {
        this.handleCloseEditModal();
        this.setState({editingComment: false})
    };
    deleteComment = () => {
        this.setState({
            editingComment: false,
            showDeleteModal: false,
        });
        this.props.deleteComment(this.props.el.id);
    };
    acceptEditingComment = () => {
        let comment = {
            comment: this.state.comment
        };

        this.setState({editingComment: false});
        this.props.addComment(this.props.el.id, comment);
    };

    changeComment = (e) => {
        this.setState({comment: e.target.value});
    };


    renderEdit () {
        return (
            <Modal show={this.state.showEditModal} onHide={this.handleCloseEditModal}>
                <Modal.Header>
                    <Modal.Title>Редактирование комментария</Modal.Title>
                </Modal.Header>

                <Modal.Body><FormControl
                    type="text"
                    placeholder="Введите комментарий"
                    onChange={this.changeComment}
                    defaultValue={this.props.el.comment}
                /></Modal.Body>

                <Modal.Footer>
                    {this.props.el.comment ?
                    <Button bsStyle={'warning'} onClick={this.acceptEditingComment}>Сохранить</Button> :
                        <Button bsStyle={'warning'} onClick={this.acceptEditingComment}>Добавить</Button>}
                    {this.props.el.comment ?
                        <span>
                            <Button bsStyle="danger" className={'btn-delete-comment'} onClick={this.deleteComment}>Удалить</Button>
                            <Button bsStyle="default" onClick={this.cancelEditingComment}>Отмена</Button>
                        </span>:
                        <Button bsStyle="default" onClick={this.cancelEditingComment}>Отмена</Button>}
                </Modal.Footer>
            </Modal>
        );
    }

    renderComment () {
        const editComment = (
            <Tooltip id="tooltip">
               Редактировать комментарий
            </Tooltip>
        );
        const lookComment = (
            <Tooltip id="tooltip">
                Посмотреть комментарий
            </Tooltip>
        );
        if(this.props.el.state === 'TAKEN' && this.props.userInfo && this.props.el.testing.user.id === this.props.userInfo.id ) {
            return (
                <div className={'comment-buttons--plus'}>
                    <OverlayTrigger placement="top" overlay={editComment}>
                        <Glyphicon glyph={'pencil'}  onClick={ () => this.editingComment(this.props.el)}/>
                    </OverlayTrigger>
                </div>);
        } else {
            return (<OverlayTrigger placement="top" overlay={lookComment}>
                        <span className={'journal-comment--badge'} onClick={() => this.handleShowCommentModal(this.props.el)}>
                            <Glyphicon glyph={'pushpin'}  />
                        </span>
            </OverlayTrigger>);
        }
    }

    renderAdd () {
        const addComment = (
        <Tooltip id="tooltip">
            Добавить комментарий
        </Tooltip>
        );

        if(this.props.el.state === 'TAKEN' && this.props.userInfo && this.props.el.testing.user.id === this.props.userInfo.id )
        {
            return (
                <div className={'comment-buttons--plus'}>
                    <OverlayTrigger placement="top" overlay={addComment}>
                         <Glyphicon glyph={'plus'}  onClick={ () => this.editingComment(this.props.el)}/>
                    </OverlayTrigger>
                </div>

            )
        }
    }
    render () {
        return ( <div>
                {this.props.el.comment && !this.state.editingComment ?
                    this.renderComment() :
                    this.state.editingComment ?
                        this.renderEdit():
                        this.renderAdd()
                   }
                {this.state.showCommentModal ?
                    <Modal show={this.state.showCommentModal} onHide={this.handleCloseCommentModal}>
                        <Modal.Header>
                            <Modal.Title>Комментарий</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            {this.props.el.comment}
                        </Modal.Body>

                        <Modal.Footer>
                            <Button bsStyle="default" onClick={this.handleCloseCommentModal}>Закрыть</Button>
                        </Modal.Footer>
                    </Modal> : ''
                }

            </div>
        )
    }
}

export default Comment;