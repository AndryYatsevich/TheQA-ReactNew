import settingsAction from './constants';


export default (state = [], action) => {
    console.log('reducer settings');
    switch (action.type) {
        case settingsAction.GET_DEVICES_OS:
            console.log('reducer settings GET_DEVICES_OS');
            return {...state, deviceOS: JSON.parse(action.payload)};
        default:
            console.log('reducer settings default');
            return state;
    }
};