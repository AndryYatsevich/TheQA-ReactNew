import React from 'react';
import {Link} from 'react-router-dom';
import {Glyphicon} from 'react-bootstrap';

class leftMenu extends React.Component {


    render() {
        return (
            this.props.menu.map((el) => {
                return(
                    window.location.pathname === el.path ?
                        <li>
                            <Link to={el.path} className={'side-menu--link active-left-menu'}>
                                <Glyphicon glyph={el.icon} className={'side-menu--icon'}/>
                                <span>{el.title}</span>
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