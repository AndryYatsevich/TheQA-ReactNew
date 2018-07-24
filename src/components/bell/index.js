import React from 'react';
/*import {Grid, Row, Col} from 'react-flexbox-grid';*/
import {Glyphicon, Row, Col} from 'react-bootstrap';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationMenu: false
        };
    }

    notificationHandle = () => {
        this.setState({notificationMenu: !this.state.notificationMenu});
        console.log('takoe');
    };


    countNotification = (array, userInfo) => {
        let count = 0;
        let waitingDevice = [];
        if(array && userInfo) {
            array.map((el) => {
                if(el.testing) {
                    if(el.state === 'WAIT' && userInfo.roles[0] === 'Administrators'){
                        count += 1;
                        waitingDevice.push(el);
                    }
                }
            });
        }
        return count ? <span className={'bell--badge'}>{count}</span> : '';
    };

    render() {
        return (
            <div className={'user-info-bell-wrap bell-wrap'}>
                <Glyphicon glyph="bell" className={'user-info-bell'} onClick={this.notificationHandle}/>
                {this.countNotification(this.props.devices, this.props.userInfo)}

                {this.state.notificationMenu ?
                    <div className={'user-info-menu'}>
                        <div className={'user-info-menu-item'} onClick={this.props.logout}>
                            <Glyphicon glyph="off" className={'user-info--menu-icon'}/>
                            <span>Выйти</span>
                        </div>
                        <div className={'user-info-menu-item'} onClick={this.props.logout}>
                            <Glyphicon glyph="off" className={'user-info--menu-icon'}/>
                            <span>Выйти</span>
                        </div>
                        <div className={'user-info-menu-item'} onClick={this.props.logout}>
                            <Glyphicon glyph="off" className={'user-info--menu-icon'}/>
                            <span>Выйти</span>
                        </div>

                    </div>
                    : ''}
            </div>

        );
    }
}

export default History;