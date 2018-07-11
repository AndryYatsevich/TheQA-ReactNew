import React from 'react';
import {Button, Glyphicon, FormControl} from 'react-bootstrap';

class Comment extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            editingComment: false
        }
    }
    editingComment = (el) => {

      this.setState({editingComment: true})
    };
    cancelEditingComment = () => {

        this.setState({editingComment: false})
    };
    deleteComment = () => {
        this.setState({editingComment: false});
        this.props.deleteComment(this.props.el.id);
    };
    acceptEditingComment = () => {
        this.setState({editingComment: false});
        this.props.addComment(this.props.el.id);
    };


    renderEdit () {
        return ([
            <FormControl
                type="text"
                placeholder="Введите комментарий"
                onChange={this.props.changeComment}
                defaultValue={this.props.el.comment}
            />, <div className={'comment-buttons'}>
                <Glyphicon glyph={'plus'} className={'side-menu--icon'} onClick={this.acceptEditingComment}/>
                <Glyphicon glyph={'trash'} className={'side-menu--icon'} onClick={this.cancelEditingComment}/>
            </div>

        ]);
    }

    renderComment () {
        if(this.props.el.state === 'TAKEN' && this.props.userInfo && this.props.el.testing.user.id === this.props.userInfo.id ) {
            return ([
                this.props.el.comment,  <div className={'comment-buttons'}>
                        <Glyphicon glyph={'edit'} className={'side-menu--icon'} onClick={this.editingComment}/>
                        <Glyphicon glyph={'trash'} className={'side-menu--icon'} onClick={this.deleteComment}/>

                </div>
            ]);
        } else {
            return this.props.el.comment;
        }
    }

    renderAdd () {
        if(this.props.el.state === 'TAKEN' && this.props.userInfo && this.props.el.testing.user.id === this.props.userInfo.id )
        {
            return (
                    <Glyphicon glyph={'plus'} className={'side-menu--icon'} onClick={ () => this.editingComment(this.props.el)}/>

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

            </div>
        )
    }
}

export default Comment;