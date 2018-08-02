import React from 'react';
/*import {Grid, Row, Col} from 'react-flexbox-grid';*/
import {Glyphicon, Row, Col} from 'react-bootstrap';
import avatar from '../../img/avatar.jpg';
import Bell from '../bell';

class userInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userMenu: false,
            auth: true
        };
        this.isHover = false;
    }


    componentDidMount () {
        document.body.addEventListener('click', () => {
            if(!this.isHover) this.setState({userMenu: false});
        }, false)
    };

    handlerOver = () => {
        this.isHover = true
    };

    handlerBlur = () => {
        this.isHover = false;
    };

    userMenuHandle = () => {
        this.setState({userMenu: !this.state.userMenu});
    };


    render() {
        return (
            <Row>
                <Col xx={12}>
                    <div className={'user-info--block'}>
                        <ul className={'user-info--list'}>
                            <li className={'user-info--item'}>
                                    <Bell userInfo={this.props.userInfo} devices={this.props.devices}/>
                            </li>
                            <li className={'user-info--item'} onMouseEnter={this.handlerOver} onMouseLeave={this.handlerBlur}  onClick={this.userMenuHandle}>
                                <img src={avatar} className={'user-info--avatar'} alt="avatar"/>
                                {this.props.userInfo ? this.props.userInfo.name : 'Кто ты блеать?!'}
                                <Glyphicon glyph="menu-down" className={'user-info-menu-down'}/>
                            </li>
                        </ul>
                        {this.state.userMenu ?
                            <div className={'user-info-menu'}>
                                <div className={'user-info-menu-item'}onClick={this.props.logout}>
                                    <Glyphicon glyph="user" className={'user-info--menu-icon'}/>
                                    <span>Профиль</span>
                                </div>
                                <div className={'user-info-menu-item'} onMouseEnter={this.handlerOver} onMouseLeave={this.handlerBlur}  onClick={this.props.logout}>
                                    <Glyphicon glyph="off" className={'user-info--menu-icon'}/>
                                    <span>Выйти</span>
                                </div>

                            </div>
                            : ''}

                    </div>
                </Col>
            </Row>



        );
    }
}

export default userInfo;