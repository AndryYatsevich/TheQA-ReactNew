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

export const resetDeviceStatus = (date, deviceTestingId, deviceId) => (dispatch) => {

    fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Testing/' + deviceTestingId, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(date)
    }).then((response) =>{
        return response.json();
    }).then(() => {
        fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Device/' + deviceId, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                state: "FREE",
                testing: null
            })
        }).then((response) => {
            return response.text();
        }).then(() => {
            services.getAllDevice()
                .then((devices) => {
                    dispatch({
                        type: commonAction.GET_ALL_DEVICE,
                        payload: devices
                    });
                })
        })
    })


};

