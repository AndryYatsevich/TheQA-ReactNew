import React from 'react';
import {actionGetAllDevice, actionGetAllTesting, actionGetAllUser} from "../../common/action";
import {connect} from "react-redux";
import {Grid, Row, Col, Button, FormControl, ControlLabel, FormGroup} from 'react-bootstrap';
import avatar from '../../img/avatar.jpg';
/*import {Grid, Row, Col} from 'react-flexbox-grid';*/

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }


    fileOnChange = (e) => {

        let reader = new FileReader();
        /*var aBlob = new Blob( e.target.value, {type : ""} );*/

        reader.onload = (result) => {
            console.log(result);
            let img = new Image();
            img.onload = () => {
              console.log(img.width, img.height);

            };
            img.src = result.target.result;
            this.setState({
                url: result.target.result
            })
        };
        reader.readAsDataURL(e.target.files[0]);
        console.log(e.target.files[0]);

    };

    render() {
        return (
            <div className={'content-page-wrap'}>
                <h4 className={'content-title'}>Профиль</h4>
                <Row>
                    <Col xs={6}>
                <div className={'content-box img-center'}>
                    <div className={'img-center'} >
                        <div className={'img-center-ava'}  style={{backgroundImage: `url(${this.state.url || avatar})`}} />
                        {/*<img src={this.state.url || avatar} className={'profile--avatar'} alt="avatar"/>*/}
                    </div>
                    <div>

                        <FormGroup
                            controlId="formBasicText"
                        >
                            <ControlLabel><span className={'btn btn-default'}>Изменить аватар</span><span>{this.state.fileName}</span></ControlLabel>
                            <FormControl
                                className={'change-avatar--btn '}
                                type="file"
                                placeholder={'345'}
                                onChange={(e)=> this.fileOnChange(e)}
                            />
                        </FormGroup>
                    </div>
                </div>
                    </Col>
                    <Col xs={6}>
                <div className={'content-box'}>
                    <div>{this.props.userInfo ? this.props.userInfo.name : ''}</div>
                    <div>{this.props.userInfo? this.props.userInfo.roles : ''}</div>
                </div>
                    </Col>
                </Row>
            </div>


        );
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.common.userInfo
});

export default connect(mapStateToProps, {})(Profile);