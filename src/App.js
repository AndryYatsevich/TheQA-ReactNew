import React, { Component } from 'react';
import logo from './logo.svg';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import {Button} from 'react-bootstrap';
import {Grid, Row, Col} from 'react-bootstrap';

class App extends Component {
  render() {
    return (

<Grid className={'wrap'} fluid>
    <Row className={'topbar'}>
        <Col xs={2} className={'topbar-left'}>
            <img src={logo} className="App-logo" alt="logo" />

        </Col>
        <Col xsOffset={8} xs={2}>
            Тут будет колокольчик и инфа по пользователю.
        </Col>
    </Row>
    <Row>
        <Col xs={2} className={'side-menu'}>
<ul>
    <li>Журнал</li>
    <li>Журнал</li>
    <li>Журнал</li>
    <li>Журнал</li>
</ul>
        </Col>
        <Col xs={10}>

        </Col>
    </Row>
    {/*<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>



      </div>*/}
</Grid>



    );
  }
}

export default App;
