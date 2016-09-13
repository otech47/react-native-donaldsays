import * as types from '../constants/actionTypes';

export function changeIsAnimating(isAnimating) {
    return dispatch => {
        dispatch({
            type: types.CHANGE_IS_ANIMATING,
            isAnimating
        });
    }
}

export function changeIsLoading(isLoading) {
    return dispatch => {
        dispatch({
            type: types.CHANGE_IS_LOADING,
            isLoading
        });
    }
}