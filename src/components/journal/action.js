import commonAction from "../../common/constants";
import services from "../../common/services";


export const changeStatusToWork = (device, date) => (dispatch) => {
    fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Testing/' + device.testing.id, {
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(date)
    }).then((response) =>{
        return response.json();
    }).then(() => {
        fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Device/' + device.id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                state: "WAIT",
            })
        }).then((response) => {
            return response.text();
        }).then(() => {
            services.getAllDevice()
                .then((devices) => {
                    dispatch({
                        type: commonAction.CHANGE_STATUS_TO_WORK,
                        payload: devices
                    });
                })
        })
    })
};

export const changeStatusToFree = (device) => (dispatch) => {
        fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Device/' + device.id, {
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
        }).then((response) => {
            console.log(response);
            services.getAllDevice()
                .then((devices) => {
                    dispatch({
                        type: commonAction.CHANGE_STATUS_TO_WORK,
                        payload: devices
                    });
                })
        })
};

export const createNewTesting = (date, deviceId) => (dispatch) => {
    fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Testing', {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        },
        body: JSON.stringify(date)
    }).then((response) =>{
        console.log('--------------->', response);
        return response.json();
    }).then((devices) => {
        fetch('http://localhost:8080/app/rest/v2/entities/testersjournal$Device/' + deviceId, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                state: "TAKEN",
                testing: {
                    _entityName: "testersjournal$Testing",
                    id: devices.id
                },
            })
        }).then((response) => {
            return response.text();
        }).then(() => {
            services.getAllDevice()
                .then((devices) => {
                    console.log(devices);
                    dispatch({
                        type: commonAction.GET_ALL_DEVICE,
                        payload: devices
                    });
                })
        })
    })

};
