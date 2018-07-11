import settingsAction from './constants';
import services from "../../common/services";
import commonAction from "../../common/constants";

export const getDeviceOS = () => (dispatch) => {
    console.log('action setting');


fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$OperationSystem', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((response) => {
            return response.text();
        }).then((deviceOs) => {
            console.log(deviceOs);
            dispatch({
                type: settingsAction.GET_DEVICES_OS,
                payload: deviceOs
            });
        })

};

export const getAllUsers = () => (dispatch) => {
    fetch('http://localhost:8080/app/rest/api/getUsersWithRoles', {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((response) => {
        return response.text();
    }).then((users) => {
        console.log(users);
        dispatch({
            type: settingsAction.GET_ALL_USERS,
            payload: users
        });
    })

};


export const actionAddNewUser = (data) => (dispatch) => {
    console.log('actionAddNewUsre', JSON.stringify(data));
    fetch('http://localhost:8080/app/rest/v2/entities/sec$User', {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => {
        console.log(response);
        return response.text();
    }).then(() =>{
        fetch('http://localhost:8080/app/rest/api/getUsersWithRoles', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((response) => {
            return response.text();
        }).then((users) => {
            console.log(users);
            dispatch({
                type: settingsAction.GET_ALL_USERS,
                payload: users
            });
        })
    })
};
