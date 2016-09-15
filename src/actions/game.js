import * as types from '../constants/actionTypes';

export function addElectoralVote() {
    return dispatch => {
        dispatch({
            type: types.ADD_VOTE
        });
    }
}

export function gameOver(didWin) {
    return dispatch => {
        dispatch({
            type: types.GAME_OVER,
            didWin
        });
    }
}

export function resetGame() {
    return dispatch => {
        dispatch({
            type: types.RESET_GAME
        });
    }
}

export function subtractDayToElection() {
    return dispatch => {
        dispatch({
            type: types.SUBTRACT_DAY
        });
    }
}