import * as types from '../constants/actionTypes';
import { AsyncStorage } from 'react-native';

async function checkFirstTimePlayed(dispatch){
    try{
        var firstPlay = await AsyncStorage.getItem('FIRST_TIME_PLAYED');
        if(firstPlay != null) {
            dispatch(playFirstTime());
        }
    }catch(err){
        console.log(err)
    }
}

async function storeFirstTimePlayed() {
    try {
        await AsyncStorage.setItem('FIRST_TIME_PLAYED' , 'true');
    } catch(err){
        console.log(err)
    }
}

export function changeIsAnimating(isAnimating) {
    return dispatch => {
        dispatch({
            type: types.CHANGE_IS_ANIMATING,
            isAnimating
        });
    }
}

export function instructionsOverlay(show) {
    return dispatch => {
        dispatch({
            type: types.INSTRUCTIONS_OVERLAY,
            show
        });
    }
}

export function playFirstTime() {
    storeFirstTimePlayed();
    return dispatch => {
        dispatch({
            type: types.PLAY_FIRST_TIME
        });
    }
}

export function checkFirstPlay() {
    return dispatch => {
        checkFirstTimePlayed(dispatch);
    }
}