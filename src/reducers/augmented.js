import * as types from '../constants/actionTypes';
import { variables } from '../styles';
import {
    MOVE_FACTOR_X,
    MOVE_FACTOR_Y
} from '../constants';

const initialState = {
    arExplode: false,
    arObjects: [
    ],
    gyroX: 0,
    gyroY: 0,
    xOffset: 0,
    yOffset: 0
};

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case types.ADD_AR_OBJECT:
            return {
                ...state,
                arObjects: [
                    ...state.arObjects,
                    action.arObject
                ]
            }
        case types.AR_EXPLODE:
            return {
                ...state,
                arExplode: action.arExplode
            }
        case types.CLEAR_AR_OBJECTS:
            return {
                arExplode: false,
                arObjects: [],
                gyroX: 0,
                gyroY: 0,
                xOffset: 0,
                yOffset: 0
            }
        case types.REMOVE_AR_OBJECT:
            // console.log('REMOVE_AR_OBJECT')

            // console.log('arObjects: ')
            // console.log(state.arObjects)

            // console.log('arObjectIndex: ' + action.arObjectIndex)
            // console.log('sliced: ')
            // console.log([
            //         ...state.arObjects.slice(0, action.arObjectIndex),
            //         ...state.arObjects.slice(action.arObjectIndex + 1)
            //     ])

            return {
                ...state,
                arObjects: [
                    ...state.arObjects.slice(0, action.arObjectIndex),
                    ...state.arObjects.slice(action.arObjectIndex + 1)
                ]
            }
        case types.UPDATE_GYRO_DATA:
            return {
                ...state,
                gyroX: action.rotationRate.x,
                gyroY: action.rotationRate.y,
                xOffset: state.xOffset + (action.moveX * (MOVE_FACTOR_X * action.rotationRate.y)),
                yOffset: state.yOffset + (action.moveY * (MOVE_FACTOR_Y * action.rotationRate.x))
            }
        default:
            return state;
    }
}