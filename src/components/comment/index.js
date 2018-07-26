import React from 'react';
import {Button, Glyphicon, FormControl, Modal} from 'react-bootstrap';

class Comment extends React.Component {
    constructor (props) {
        super(props);
        this.handleCloseDeleteModal = this.handleCloseDeleteModal.bind(this);
        this.state = {
            editingComment: false,
            showDeleteModal: false,
        }
    }


    handleShowDeleteModal() {
        this.setState({
            showDeleteModal: true,
        });
    }

    handleCloseDeleteModal() {
        this.setState({showDeleteModal: false});
    }

    editingComment = () => {

      this.setState({editingComment: true})
    };
    cancelEditingComment = () => {

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
        return ([
            <div className={'comment--input'}><FormControl
                type="text"
                placeholder="Введите комментарий"
                onChange={this.changeComment}
                defaultValue={this.props.el.comment}
            /></div>, <div className={'comment-buttons'}>
                <Glyphicon glyph={'ok'} className={'side-menu--icon comment--icon'} onClick={this.acceptEditingComment}/>
                <Glyphicon glyph={'remove'} className={'side-menu--icon comment--icon'} onClick={this.cancelEditingComment}/>
            </div>

        ]);
    }

    renderComment () {
        if(this.props.el.state === 'TAKEN' && this.props.userInfo && this.props.el.testing.user.id === this.props.userInfo.id ) {
            return ([
                <div className={'comment--text-wrap'}><p className={'comment--text'}>{this.props.el.comment}</p></div>,  <div className={'comment-buttons'}>
                        <Glyphicon glyph={'edit'} className={'side-menu--icon'} onClick={this.editingComment}/>
                        <Glyphicon glyph={'trash'} className={'side-menu--icon'} onClick={() => this.handleShowDeleteModal()}/>

                </div>
            ]);
        } else {
            return (<div className={'comment--text-wrap'}><p className={'comment--text'}>{this.props.el.comment}</p></div>);
        }
    }

    renderAdd () {
        if(this.props.el.state === 'TAKEN' && this.props.userInfo && this.props.el.testing.user.id === this.props.userInfo.id )
        {
            return (
                <div className={'comment-buttons--plus'}>
                    <Glyphicon glyph={'plus'} className={'side-menu--icon'} onClick={ () => this.editingComment(this.props.el)}/>
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
                <Modal show={this.state.showDeleteModal} onHide={this.handleCloseDeleteModal}>
                    <Modal.Header>
                        <Modal.Title>Удаления комментария</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Вы действительно хотите удалить комментарий?</Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle={'warning'}
                                onClick={this.deleteComment}>
                            Удалить
                        </Button>
                        <Button bsStyle="default" onClick={this.handleCloseDeleteModal}>Отмена</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Comment;