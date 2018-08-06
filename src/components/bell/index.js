import React from 'react';
import {Link} from 'react-router-dom';
import {Glyphicon, Row, Col} from 'react-bootstrap';

class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notificationMenu: false,
            isHover: false
        };
        this.isHover = false;
    }
    componentDidMount () {
      document.body.addEventListener('click', () => {
          if(!this.isHover) this.setState({notificationMenu: false});
      }, false)
    };

    notificationHandle = () => {
        this.setState({notificationMenu: !this.state.notificationMenu});
    };

    handlerOver = () => {
      this.isHover = true
    };

    handlerBlur = () => {
        this.isHover = false;
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

    sortArray = (obj1, obj2) => {
        if (obj1.createTs < obj2.createTs) return 1;
        if (obj1.createTs > obj2.createTs) return -1;
    };

    listNotification = (array, userInfo) => {
        let waitingDevice = [];
        if(array && userInfo) {
            array.sort(this.sortArray).map((el) => {
                if(el.testing) {
                    if(el.state === 'WAIT' && userInfo.roles[0] === 'Administrators'){
                        waitingDevice.push(el);
                    }
                }
            });
        }

     if (waitingDevice.length === 0) {
         return <div className={'bell--menu-title'}><h6>В данный момент у вас нет оповещений</h6></div>
     } else {
        return waitingDevice.map((el) => {
             console.log(el);
                return (
                    <Link to={'/'} className={'bell--menu-item'}>
                        <div className={'bell--menu--item-icon'}>
                            <Glyphicon glyph={'time'} className={'device-status-icon success icon-warning'}/>
                        </div>
                        <p className={'bell--menu--item-details'}>
                            <div><h5>{el.name}</h5></div>
                            <div><h6>{el.testing.user.name}</h6></div>
                        </p>
                    </Link>
                )
         })
     }
    };

    render() {
        return (
            <div className={'user-info-bell-wrap bell-wrap'} onMouseEnter={this.handlerOver} onMouseLeave={this.handlerBlur} onClick={this.notificationHandle}>
                <Glyphicon glyph="bell" className={'user-info-bell'} />
                {this.countNotification(this.props.devices, this.props.userInfo)}

                {this.state.notificationMenu ?
                    <div className={'bell-menu'}>
                        <div className={'bell--menu-title'}>
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