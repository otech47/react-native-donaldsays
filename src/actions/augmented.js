import * as types from '../constants/actionTypes';
import {
    GYRO_MOVE_THRESHOLD_X,
    GYRO_MOVE_THRESHOLD_Y
} from '../constants';

export function addArObject(arObject) {
    return dispatch => {
        dispatch({
            type: types.ADD_AR_OBJECT,
            arObject
        });
    }
}

export function clearArObjects() {
    return dispatch => {
        dispatch({
            type: types.CLEAR_AR_OBJECTS
        });
    }
}

export function hitArObject(arObjectIndex) {
    return dispatch => {
        dispatch({
            type: types.HIT_AR_OBJECT,
            arObjectIndex
        });
    }
}

export function updateGyroData(gyroData) {
    let moveX = 0;
    let moveY = 0;
    if(gyroData.rotationRate.x > GYRO_MOVE_THRESHOLD_Y || gyroData.rotationRate.x < GYRO_MOVE_THRESHOLD_Y * -1) {
        moveY = 1;
    }
    if(gyroData.rotationRate.y > GYRO_MOVE_THRESHOLD_X || gyroData.rotationRate.y < GYRO_MOVE_THRESHOLD_X * -1) {
        moveX = 1;
    }
    return dispatch => {
        dispatch({
            type: types.UPDATE_GYRO_DATA,
            rotationRate: gyroData.rotationRate,
            moveX,
            moveY
        });
    }
}



export function removeArObject(arObjectIndex) {
    return dispatch => {
        dispatch({
            type: types.REMOVE_AR_OBJECT,
            arObjectIndex
        });
    }
}