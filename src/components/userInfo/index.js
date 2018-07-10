import React from 'react';
/*import {Grid, Row, Col} from 'react-flexbox-grid';*/
import {Glyphicon} from 'react-bootstrap';
import avatar from '../../img/avatar.jpg';

class userInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userMenu: false,
            auth: true
        };
    }

    userMenuHandle = () => {
        this.setState({userMenu: !this.state.userMenu});
        console.log('работает');
    };



    render() {
        return (
            <div className={'user-info--block'}>
                <ul className={'user-info--list'}>
                    <li className={'user-info--item'}>
                        <div className={'user-info-bell-wrap'}>
                            <Glyphicon glyph="bell" className={'user-info-bell'}/>
                        </div>
                    </li>
                    <li className={'user-info--item'}  onClick={this.userMenuHandle}>
                        <img src={avatar} className={'user-info--avatar'} alt="avatar"/>
                        {this.props.userInfo ? this.props.userInfo.name : 'Кто ты блеать?!'}
                        <Glyphicon glyph="menu-down" className={'user-info-menu-down'}/>
                    </li>
                </ul>
                {this.state.userMenu ? <div className={'user-info-menu'}>
                    <div className={'user-info-menu-item'} onClick={this.props.logout}>
                        <Glyphicon glyph="off" className={'user-info--menu-icon'}/>
                        <span>Выйти</span></div>

                </div> : ''}

            </div>



        );
    }
}

export default userInfo;