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
        this.props.hideUserMenu();
        this.setState({notificationMenu: !this.state.notificationMenu});
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

    listNotification = (array, userInfo) => {
        let waitingDevice = [];
        if(array && userInfo) {
            array.map((el) => {
                if(el.testing) {
                    if(el.state === 'WAIT' && userInfo.roles[0] === 'Administrators'){
                        waitingDevice.push(el);
                    }
                }
            });
        }

     if (waitingDevice === 0) {
        return <div>В данный момент у вас нет оповещений</div>
     } else {
        return waitingDevice.map((el) => {
             console.log(el);
                return (<div className={'bell--menu-item'}>
                    <div className={'bell--menu--item-icon'}>
                        <Glyphicon glyph={'time'} className={'device-status-icon success icon-warning'}/>
                    </div>
                    <p className={'bell--menu--item-details'}>
                        <div><h5>{el.name}</h5></div>
                        <div><h6>{el.testing.user.name}</h6></div>

                    </p>

                    </div>)
         })
     }


    };



    render() {
        return (
            <div className={'user-info-bell-wrap bell-wrap'}>
                <Glyphicon glyph="bell" className={'user-info-bell'} onClick={this.notificationHandle}/>
                {this.countNotification(this.props.devices, this.props.userInfo)}

                {this.state.notificationMenu ?
                    <div className={'bell-menu'}>
                        <div className={'bell--menu-item'}>
                            <h5>Оповещения</h5>
                        </div>
                        {this.listNotification(this.props.devices, this.props.userInfo)}
                    </div>
                    : ''}
            </div>

        );
    }
}

export default History;