import commonAction from './constants';
import services from "./services";


export const actionUserAuth = (login, pass) => (dispatch) => {

    services.userAuth(login, pass)
        .then((token) => {
            services.getUserInfo(token)
                .then((userInfo) => {
                    console.log(userInfo);
                    dispatch({
                        type: commonAction.GET_USER_INFO,
                        payload: userInfo
                    });
                })
        })
};

export const actionGetUserInfo = () => (dispatch) => {

    services.getUserInfo()
            .then((userInfo) => {
            console.log(userInfo);
            dispatch({
                type: commonAction.GET_USER_INFO,
                payload: userInfo
            });
        })
};

export const actionGetAllDevice = () => (dispatch) => {
    services.getAllDevice()
        .then((devices) => {
        console.log(devices);
        dispatch({
            type: commonAction.GET_ALL_DEVICE,
            payload: devices
        });
    })
};

export const actionGetAllRoles = () => (dispatch) => {
    services.getAllRoles()
        .then((roles) => {
            console.log(roles);
            dispatch({
                type: commonAction.GET_ALL_ROLES,
                payload: roles
            });
        })
};

export const actionGetAllTesting = () => (dispatch) => {
    services.getAllTesting()
        .then((testing) => {
            console.log(testing);
            dispatch({
                type: commonAction.GET_ALL_TESTING,
                payload: testing
            });
        })
};

export const actionAddNewDevice = (data) => (dispatch) => {
    console.log(JSON.stringify(data));
    fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Device', {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => {
        return response.text();
    }).then((response) =>{
        console.log(response);
        services.getAllDevice()
            .then((devices) => {
                console.log(devices);
                dispatch({
                    type: commonAction.GET_ALL_DEVICE,
                    payload: devices
                });
            })
    })
};

export const actionDeleteDevice = (data) => (dispatch) => {
    fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Device/' + data, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
            "Content-Type": "application/json"
        }
    }).then((response) => {
        return response.text();
    }).then((response) =>{
        console.log(response);
        services.getAllDevice()
            .then((devices) => {
                console.log(devices);
                dispatch({
                    type: commonAction.GET_ALL_DEVICE,
                    payload: devices
                });
            })
    })
};


export const actionEditDevice = (id, data) => (dispatch) => {
    console.log('=========actionEditDevice==============', id, data);
    fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Device/' + id, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token'),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => {
        return response.text();
    }).then((response) => {
        console.log(response);
        services.getAllDevice()
            .then((devices) => {
                console.log(devices);
                dispatch({
                    type: commonAction.GET_ALL_DEVICE,
                    payload: devices
                });
            })
    })
};


