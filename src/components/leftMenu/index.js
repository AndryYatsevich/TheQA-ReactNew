import React from 'react';
import {Link} from 'react-router-dom';
import {Glyphicon} from 'react-bootstrap';

class leftMenu extends React.Component {
    countDevice = (array, userInfo) => {
        let count = 0;
        if(Array.isArray(array) && userInfo) {
            array.map((el) => {
                if(el.testing) {
                    if(el.testing.user.login === userInfo.login){
                        count += 1;
                    }
                }
            });
        }

        return count ? <span className={'side-menu--badge side-menu--badge-active'}>{count}</span> : '';
    };

    render() {
        return (
            this.props.menu.map((el) => {
                return(
                    window.location.pathname === el.path ?
                        <li>
                            <Link to={el.path} className={'side-menu--link active-left-menu'}>
                                <Glyphicon glyph={el.icon} className={'side-menu--icon'}/>
                                <span>{el.title}</span>
                                {el.badge ? this.countDevice(this.props.devices, this.props.userInfo) : ''}
                            </Link>
                        </li> :
                    <li>
                        <Link to={el.path} className={'side-menu--link'}>
                            <Glyphicon glyph={el.icon} className={'side-menu--icon'}/>
                            <span>{el.title}</span>
                            {el.badge ? this.countDevice(this.props.devices, this.props.userInfo) : ''}
                        </Link>
                    </li>

             )
            })


        );
    }
}

export default leftMenu;