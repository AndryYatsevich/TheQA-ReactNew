import commonAction from './constants';


export default (state = [], action) => {
    switch (action.type) {
        case commonAction.GET_USER_INFO:
            return {...state, userInfo: JSON.parse(action.payload)};
        case commonAction.GET_ALL_DEVICE:
            return {...state, devices: action.payload};
        case commonAction.GET_ALL_ROLES:
            return {...state, roles: action.payload};
        case commonAction.GET_ALL_TESTING:
            return {...state, testing: action.payload};
        case commonAction.CHANGE_STATUS_TO_WORK:
            return {...state, devices: action.payload};
        default:
            return state;
    }
};