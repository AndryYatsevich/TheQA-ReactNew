import React from 'react';
import {Link} from 'react-router-dom';
import {Glyphicon} from 'react-bootstrap';

class leftMenu extends React.Component {
    countDevice = (array, userInfo) => {
        let count = 0;
        if(array && userInfo) {
            array.map((el) => {
                if(el.testing) {
                    if(el.testing.user.login === userInfo.login){
                        count += 1;
                    }
                }
            });
        }
        return <div>{count}</div>
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
                                {el.badge ?
                                    <span className={'side-menu--badge'}>
                                        {this.countDevice(this.props.devices, this.props.userInfo)}
                                    </span> : ''}
                            </Link>
                        </li> :
                    <li>
                        <Link to={el.path} className={'side-menu--link'}>
                            <Glyphicon glyph={el.icon} className={'side-menu--icon'}/>
                            <span>{el.title}</span>
                        </Link>
                    </li>

             )
            })


        );
    }
}

export default leftMenu;