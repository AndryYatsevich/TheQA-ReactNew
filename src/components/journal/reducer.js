import deviceAction from './constants';


export default (state = [], action) => {
    console.log('reducer');
    switch (action.type) {
        case deviceAction.GET_ALL_DEVICES:
            return action.payload;
        case deviceAction.CHANGE_STATUS_TO_WORK:
            return action.payload;
        default:
            console.log('reducer default');
            return state;
    }
};